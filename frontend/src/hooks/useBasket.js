// useBasket.js
import { useState, useEffect } from "react";

const VITE_BASE_URL_BACKEND = import.meta.env.VITE_BASE_URL_BACKEND;

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const response = await fetch(`${VITE_BASE_URL_BACKEND}/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Refresh token failed");
  }

  const data = await response.json();
  if (!data.accessToken || !data.refreshToken) {
    throw new Error("Invalid refresh response");
  }

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data.accessToken;
};

const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("Не авторизован");
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const makeRequest = () =>
    fetch(`${VITE_BASE_URL_BACKEND}${url}`, { ...options, headers });

  let response = await makeRequest();

  if (response.status === 403 || response.status === 401) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          headers.Authorization = `Bearer ${newToken}`;
          return fetch(`${VITE_BASE_URL_BACKEND}${url}`, {
            ...options,
            headers,
          });
        })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((err) => Promise.reject(err));
          }
          return res.json();
        });
    }

    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      headers.Authorization = `Bearer ${newToken}`;
      response = await fetch(`${VITE_BASE_URL_BACKEND}${url}`, {
        ...options,
        headers,
      });
      processQueue(null, newToken);
      isRefreshing = false;

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Ошибка ${response.status}`);
      }
      return response.json();
    } catch (refreshError) {
      processQueue(refreshError, null);
      isRefreshing = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw refreshError;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Ошибка ${response.status}`);
  }
  return response.json();
};

export const useBasket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMap, setSelectedMap] = useState({});
  const [error, setError] = useState(null);

  const fetchBasket = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setBasketItems([]);
        setSelectedMap({});
        setLoading(false);
        return;
      }

      const data = await authFetch("/basket");
      const items = data.basket || [];

      const formattedItems = items.map((item) => ({
        ...item,
        selected: Boolean(item.selected),
      }));

      setBasketItems(formattedItems);

      const initialSelected = {};
      formattedItems.forEach((item) => {
        if (item.selected) {
          initialSelected[item.id_basket] = true;
        }
      });
      setSelectedMap(initialSelected);
    } catch (err) {
      console.error("Ошибка загрузки корзины:", err);
      setError(err.message);
      setBasketItems([]);
      setSelectedMap({});
    } finally {
      setLoading(false);
    }
  };

  const addToBasket = async (id_tovar, quantity = 1) => {
    try {
      setError(null);
      await authFetch("/basket/add", {
        method: "POST",
        body: JSON.stringify({ id_tovar, quantity }),
      });
      await fetchBasket(); // полная перезагрузка после добавления
      window.dispatchEvent(new Event("basketUpdated"));
    } catch (err) {
      console.error("Ошибка добавления товара:", err);
      setError(err.message);
      alert(
        "Не удалось добавить товар в корзину. Возможно, вы не авторизованы.",
      );
    }
  };

  const removeFromBasket = async (id_basket) => {
    try {
      setError(null);
      const choice = confirm("Вы точно хотите удалить этот товар?");
      if (choice) {
        await authFetch(`/basket/${id_basket}`, {
          method: "DELETE",
        });
        alert("Товар удалён из корзины");
        // обновляем локально и перезагружаем для синхронизации
        await fetchBasket();
        window.dispatchEvent(new Event("basketUpdated"));
      }
    } catch (err) {
      console.error("Ошибка удаления товара:", err);
      setError(err.message);
      alert("Не удалось удалить товар из корзины.");
    }
  };

  const updateQuantity = async (id_basket, newQuantity) => {
    if (newQuantity < 1) return;

    // Оптимистичное обновление
    const prevItems = basketItems;
    const prevSelected = { ...selectedMap };

    try {
      setError(null);
      // Обновляем локальное состояние сразу
      const updatedItems = basketItems.map((item) => {
        if (item.id_basket === id_basket) {
          return {
            ...item,
            quantity: newQuantity,
            full_price: item.price * newQuantity,
          };
        }
        return item;
      });
      setBasketItems(updatedItems);

      // Отправляем на сервер
      const selected = selectedMap[id_basket] ? 1 : 0;
      await authFetch(`/basket/${id_basket}`, {
        method: "PATCH",
        body: JSON.stringify({ quantity: newQuantity, selected }),
      });

      // Уведомляем другие компоненты (например, счетчик)
      window.dispatchEvent(new Event("basketUpdated"));
    } catch (err) {
      console.error("Ошибка обновления количества:", err);
      setError(err.message);
      // Откат изменений при ошибке
      setBasketItems(prevItems);
      setSelectedMap(prevSelected);
      alert("Не удалось обновить количество.");
    }
  };

  const updateSelected = async (id_basket, isSelected) => {
    // Оптимистичное обновление
    const prevSelected = { ...selectedMap };
    const prevItems = basketItems;

    try {
      setError(null);
      // Обновляем локально
      const newSelectedMap = {
        ...selectedMap,
        [id_basket]: isSelected,
      };
      setSelectedMap(newSelectedMap);

      const updatedItems = basketItems.map((it) =>
        it.id_basket === id_basket ? { ...it, selected: isSelected } : it,
      );
      setBasketItems(updatedItems);

      const item = basketItems.find((it) => it.id_basket === id_basket);
      if (!item) return;

      await authFetch(`/basket/${id_basket}`, {
        method: "PATCH",
        body: JSON.stringify({
          quantity: item.quantity,
          selected: isSelected ? 1 : 0,
        }),
      });

      window.dispatchEvent(new Event("basketUpdated"));
    } catch (err) {
      console.error("Ошибка обновления выбора:", err);
      setError(err.message);
      // Откат
      setSelectedMap(prevSelected);
      setBasketItems(prevItems);
      alert("Не удалось обновить выбор товара.");
    }
  };

  const handleOrder = async () => {
    const selectedIds = Object.keys(selectedMap).filter(
      (id) => selectedMap[id],
    );
    if (selectedIds.length === 0) {
      alert("Выберите хотя бы один товар для оформления заказа");
      return;
    }

    try {
      setError(null);
      const selectedItems = basketItems
        .filter((item) => selectedMap[item.id_basket])
        .map((item) => ({
          id_basket: item.id_basket,
          quantity: item.quantity,
          price: item.price,
          full_price: item.full_price,
          title: item.title,
          size: item.size,
          src_img: item.src_img,
        }));

      await authFetch("/application-create", {
        method: "POST",
        body: JSON.stringify({ items: selectedItems }),
      });

      const idsToRemove = selectedItems.map((item) => item.id_basket);
      await authFetch("/remove-basket-many", {
        method: "POST",
        body: JSON.stringify({ idBaskets: idsToRemove }),
      });

      // Перезагружаем корзину после оформления заказа
      await fetchBasket();
      window.dispatchEvent(new Event("basketUpdated"));
      alert(`Заказ успешно оформлен! Выбрано товаров: ${selectedIds.length}`);
    } catch (err) {
      console.error("Ошибка оформления заказа:", err);
      setError(err.message);
      alert("Не удалось оформить заказ. Попробуйте позже.");
    }
  };

  const getTotalSum = () => {
    return basketItems.reduce((acc, item) => {
      if (selectedMap[item.id_basket]) {
        return acc + (item.full_price || item.price * item.quantity);
      }
      return acc;
    }, 0);
  };

  useEffect(() => {
    fetchBasket();
    // Больше не подписываемся на basketUpdated для перезагрузки
    // Другие компоненты могут использовать событие для обновления счетчика, но не корзина
  }, []);

  return {
    basketItems,
    loading,
    selectedMap,
    error,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    updateSelected,
    handleOrder,
    getTotalSum,
    refreshBasket: fetchBasket,
  };
};
