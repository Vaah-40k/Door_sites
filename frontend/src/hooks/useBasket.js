
import { useState, useEffect, useCallback, useRef } from 'react';
import fetchWithAuth from '../utils/fetchWithAuth';

export const useBasket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken') || null
  );
  const [selectedMap, setSelectedMap] = useState({});
  const isMounted = useRef(true);
  const initialLoadDone = useRef(false);

  // Загрузка корзины
  const loadBasket = useCallback(async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      if (isMounted.current) setBasketItems([]);
      return;
    }
    if (isMounted.current) setLoading(true);
    try {
      const response = await fetchWithAuth('/basket');
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('accessToken');
        if (isMounted.current) {
          setAccessToken(null);
          setBasketItems([]);
        }
        return;
      }
      if (!response.ok) throw new Error('Ошибка загрузки корзины');
      const data = await response.json();
      const items = data.basket || [];
      if (isMounted.current) {
        setBasketItems(items);
        const initialSelected = {};
        items.forEach((item) => {
          initialSelected[item.id_basket] =
            item.selected === undefined ? false : item.selected;
        });
        setSelectedMap(initialSelected);
      }
    } catch (error) {
      console.error(error);
      if (isMounted.current) setBasketItems([]);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }, []);

  // Добавление товара
  const addToBasket = useCallback(
    async (id_tovar) => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        alert('Для добавления в корзину необходимо авторизоваться');
        return;
      }
      try {
        const response = await fetchWithAuth('/basket/add', {
          method: 'POST',
          body: JSON.stringify({ id_tovar, quantity: 1 }),
        });
        const data = await response.json();
        if (data.success) {
          alert('Товар добавлен в корзину');
          await loadBasket();
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    },
    [loadBasket]
  );

  // Удаление из корзины
  const removeFromBasket = useCallback(
    async (basketId) => {
      try {
        const response = await fetchWithAuth(`/basket/${basketId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          alert('Товар удалён из корзины');
          await loadBasket();
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert(error.message);
      }
    },
    [loadBasket]
  );

  // Изменение количества
  const updateQuantity = useCallback(
    async (basketId, quantity) => {
      const oldItems = [...basketItems];
      const updatedItems = basketItems.map((item) =>
        item.id_basket === basketId
          ? { ...item, quantity, full_price: item.price * quantity }
          : item
      );
      setBasketItems(updatedItems);

      try {
        await fetchWithAuth(`/basket/${basketId}`, {
          method: 'PATCH',
          body: JSON.stringify({ quantity }),
        });
      } catch {
        setBasketItems(oldItems);
        alert('Не удалось обновить количество');
      }
    },
    [basketItems]
  );

  // Изменение выбранности
  const updateSelected = useCallback(async (basketId, selected) => {
    setSelectedMap((prev) => ({ ...prev, [basketId]: selected }));

    try {
      await fetchWithAuth(`/basket/${basketId}`, {
        method: 'PATCH',
        body: JSON.stringify({ selected }),
      });
    } catch (error) {
      setSelectedMap((prev) => ({ ...prev, [basketId]: !selected }));
      alert('Не удалось обновить состояние выбранности');
    }
  }, []);

  // Оформление заказа
  const handleOrder = useCallback(async () => {
    const selectedItems = basketItems.filter(
      (item) => selectedMap[item.id_basket]
    );
    if (selectedItems.length === 0) {
      alert('Выберите хотя бы один товар для оформления заказа');
      return;
    }

    const orderData = selectedItems.map((item) => ({
      id_basket: item.id_basket,
      quantity: item.quantity,
      price: item.price,
      full_price: item.full_price,
      title: item.title,
      size: item.size,
      src_img: item.src_img,
      selected: item.selected,
    }));
    const idBaskets = orderData.map((item) => item.id_basket);

    try {
      const response = await fetchWithAuth('/application-create', {
        method: 'POST',
        body: JSON.stringify({ items: orderData }),
      });
      const data = await response.json();
      if (data.success) {
        alert('Заказ оформлен успешно!');
        await fetchWithAuth('/remove-basket-many', {
          method: 'POST',
          body: JSON.stringify({ idBaskets }),
        });
        window.location.reload();
      } else {
        alert(data.message || 'Ошибка оформления заказа');
      }
    } catch (error) {
      alert(error.message);
    }
  }, [basketItems, selectedMap]);

  // Общая сумма выбранных товаров
  const getTotalSum = useCallback(() => {
    if (!basketItems || !Array.isArray(basketItems)) return 0;
    return basketItems.reduce((sum, item) => {
      if (selectedMap[item.id_basket]) {
        return sum + (item.full_price || 0);
      }
      return sum;
    }, 0);
  }, [basketItems, selectedMap]);

  // Слушаем события авторизации
  useEffect(() => {
    isMounted.current = true;

    const handleStorageChange = () => {
      const newToken = localStorage.getItem('accessToken');
      if (isMounted.current) setAccessToken(newToken);
    };

    const handleAuthSuccess = () => {
      const newToken = localStorage.getItem('accessToken');
      if (isMounted.current) setAccessToken(newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authSuccess', handleAuthSuccess);

    return () => {
      isMounted.current = false;
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authSuccess', handleAuthSuccess);
    };
  }, []);

  // Загружаем корзину при изменении токена
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      if (!initialLoadDone.current || accessToken) {
        loadBasket();
        initialLoadDone.current = true;
      }
    } else {
      if (isMounted.current) setBasketItems([]);
      initialLoadDone.current = false;
    }
  }, [accessToken, loadBasket]);

  return {
    basketItems,
    loading,
    selectedMap,
    addToBasket,
    removeFromBasket,
    updateQuantity,
    updateSelected,
    handleOrder,
    getTotalSum,
    loadBasket,
  };
};