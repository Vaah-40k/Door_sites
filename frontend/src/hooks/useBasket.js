import { useState, useEffect } from "react";

// данные для корзины
const mockBasketItems = [
  {
    id_basket: 1,
    id_tovar: 1,
    title: "Дверь дубовая классическая",
    price: 15000,
    quantity: 2,
    full_price: 30000,
    src_img: "/src/assets/door1.jpg",
    alt: "Дверь дубовая",
    size: "90x200",
    material: "Массив дуба",
  },
  {
    id_basket: 2,
    id_tovar: 2,
    title: "Дверь дубовая с остеклением",
    price: 18500,
    quantity: 1,
    full_price: 18500,
    src_img: "/src/assets/door2.jpg",
    alt: "Дверь с стеклом",
    size: "80x200",
    material: "Массив дуба",
  },
  {
    id_basket: 3,
    id_tovar: 3,
    title: "Дверь дубовая резная",
    price: 22000,
    quantity: 1,
    full_price: 22000,
    src_img: "/src/assets/door3.jpg",
    alt: "Дверь резная",
    size: "100x200",
    material: "Массив дуба",
  },
];

export const useBasket = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMap, setSelectedMap] = useState({});

  // Загрузка корзины (имитация)
  const fetchBasket = async () => {
    setLoading(true);
    // Имитируем задержку загрузки
    await new Promise((resolve) => setTimeout(resolve, 500));

    setBasketItems(mockBasketItems);

    // По умолчанию выделяем все товары
    const initialSelected = {};
    mockBasketItems.forEach((item) => {
      initialSelected[item.id_basket] = true;
    });
    setSelectedMap(initialSelected);
    setLoading(false);
  };

  // Удаление товара из корзины
  const removeFromBasket = async (id_basket) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    const updatedItems = basketItems.filter(
      (item) => item.id_basket !== id_basket,
    );
    setBasketItems(updatedItems);

    const newSelectedMap = { ...selectedMap };
    delete newSelectedMap[id_basket];
    setSelectedMap(newSelectedMap);
    setLoading(false);

    window.dispatchEvent(new Event("basketUpdated"));
  };

  // Обновление количества товара
  const updateQuantity = async (id_basket, newQuantity) => {
    if (newQuantity < 1) return;

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

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
    setLoading(false);

    window.dispatchEvent(new Event("basketUpdated"));
  };

  // Обновление выбора товара
  const updateSelected = (id_basket, isSelected) => {
    const newSelectedMap = {
      ...selectedMap,
      [id_basket]: isSelected,
    };
    setSelectedMap(newSelectedMap);
  };

  // Оформление заказа
  const handleOrder = async () => {
    const selectedIds = Object.keys(selectedMap).filter(
      (id) => selectedMap[id],
    );

    if (selectedIds.length === 0) {
      alert("Выберите хотя бы один товар для оформления заказа");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    alert(`Заказ успешно оформлен! Выбрано товаров: ${selectedIds.length}`);

    // Удаляем выбранные товары из корзины
    const updatedItems = basketItems.filter(
      (item) => !selectedIds.includes(String(item.id_basket)),
    );
    setBasketItems(updatedItems);
    setSelectedMap({});
    window.dispatchEvent(new Event("basketUpdated"));
  };

  // Получение общей суммы
  const getTotalSum = () => {
    return basketItems.reduce((acc, item) => {
      if (selectedMap[item.id_basket]) {
        return acc + (item.full_price || item.price * item.quantity);
      }
      return acc;
    }, 0);
  };

  // Загружаем корзину при монтировании
  useEffect(() => {
    fetchBasket();

    // Слушаем события обновления корзины
    const handleBasketUpdate = () => {
      fetchBasket();
    };

    window.addEventListener("basketUpdated", handleBasketUpdate);

    return () => {
      window.removeEventListener("basketUpdated", handleBasketUpdate);
    };
  }, []);

  return {
    basketItems,
    loading,
    selectedMap,
    removeFromBasket,
    updateQuantity,
    updateSelected,
    handleOrder,
    getTotalSum,
    refreshBasket: fetchBasket,
  };
};
