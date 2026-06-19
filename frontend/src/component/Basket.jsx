import { useBasket } from "../hooks/useBasket";

const Basket = () => {
  // Получаем все необходимые данные и методы из хука
  const {
    basketItems,
    loading,
    selectedMap,
    removeFromBasket,
    updateQuantity,
    updateSelected,
    handleOrder,
    getTotalSum,
  } = useBasket();

  const token = localStorage.getItem("accessToken");

  // Рендерим содержимое корзины
  const renderBasketContent = () => {
    if (!token) {
      return <p>Авторизуйтесь, чтобы видеть корзину</p>;
    }
    if (loading) {
      return <p>Загрузка корзины...</p>;
    }
    if (!basketItems || basketItems.length === 0) {
      return <p>Корзина пуста</p>;
    }

    return (
      <>
        <h3>Ваша корзина</h3>
        {basketItems.map((item) => (
          <div
            key={item.id_basket}
            className="basket-item"
            data-basket-id={item.id_basket}
          >
            <img src={item.src_img} alt={item.alt} />
            <input
              type="checkbox"
              checked={!!selectedMap[item.id_basket]}
              onChange={(e) => updateSelected(item.id_basket, e.target.checked)}
            />
            <div className="basket-item-info">
              <strong>{item.title || "Товар"}</strong>
              <br />
              <small>{item.size || ""}</small>
              <br />
              Цена: {item.price} ₽
              <br />
              Количество:
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = parseInt(e.target.value);
                  if (!isNaN(newQuantity) && newQuantity >= 1) {
                    updateQuantity(item.id_basket, newQuantity);
                  }
                }}
                className="basket-quantity"
                style={{ width: "60px" }}
              />
              | Сумма: {item.full_price} ₽
            </div>
            <div className="basket-item-actions">
              <button
                className="basket-remove"
                onClick={() => removeFromBasket(item.id_basket)}
              >
                ✖ Удалить
              </button>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "20px", fontWeight: "bold" }}>
          Общая сумма выбранных товаров: {getTotalSum()} ₽
        </div>
        <button onClick={handleOrder} style={{ marginTop: "10px" }}>
          Оформить заказ
        </button>
      </>
    );
  };

  return (
    <div className="basket" style={{ height: 800 }}>
      <div className="basket-content">
        <div
          data-basket
          style={{
            backgroundColor: "antiquewhite",
          }}
        >
          {renderBasketContent()}
        </div>
      </div>
    </div>
  );
};

export default Basket;
