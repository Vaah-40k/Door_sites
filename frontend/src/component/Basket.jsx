import { useBasket } from "../hooks/useBasket";
import "../styles/basket.css";

const Basket = () => {
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

  // Компонент заглушки для товара
  const SkeletonItem = () => (
    <div className="basket-item skeleton">
      <div className="skeleton-image"></div>
      <div className="basket-item-info">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-quantity"></div>
      </div>
      <div className="basket-item-actions">
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  // Компонент пустой корзины
  const EmptyBasket = () => (
    <div className="empty-basket">
      <div className="empty-basket-icon">🛒</div>
      <h3>Ваша корзина пуста</h3>
      <p>Добавьте товары из каталога, чтобы оформить заказ</p>
      <button
        className="empty-basket-btn"
        onClick={() => (window.location.href = "/catalog")}
      >
        Перейти в каталог
      </button>
    </div>
  );

  const renderBasketContent = () => {
    if (loading) {
      return (
        <div className="basket-loading">
          <div className="loading-spinner"></div>
          <p>Загрузка корзины...</p>
          {[1, 2, 3].map((i) => (
            <SkeletonItem key={i} />
          ))}
        </div>
      );
    }
    if (!basketItems || basketItems.length === 0) {
      return <EmptyBasket />;
    }

    return (
      <>
        <div className="basket-header">
          <h3>Корзина</h3>
          <span className="basket-count">{basketItems.length} товара</span>
        </div>

        <div className="basket-grid">
          {basketItems.map((item) => (
            <div
              key={item.id_basket}
              className={`basket-card ${selectedMap[item.id_basket] ? "selected" : ""}`}
              data-basket-id={item.id_basket}
            >
              <div className="basket-card-image">
                <img src={item.src_img} alt={item.alt || item.title} />
                <button
                  className="basket-remove-btn"
                  onClick={() => removeFromBasket(item.id_basket)}
                  aria-label="Удалить товар"
                >
                  ✕
                </button>
              </div>

              <div className="basket-card-info">
                <div className="basket-card-title">
                  <strong>{item.title || "Товар"}</strong>
                  {item.size && (
                    <span className="item-size">{item.size} мм</span>
                  )}
                </div>

                <div className="basket-card-price">
                  <span className="item-price">{item.price} ₽</span>
                </div>

                {item.material && (
                  <div className="basket-card-material">
                    <span>Материал: {item.material}</span>
                  </div>
                )}

                <div className="basket-card-actions">
                  <div className="basket-item-quantity">
                    <button
                      className="qty-btn qty-minus"
                      onClick={() => {
                        if (item.quantity > 1) {
                          updateQuantity(item.id_basket, item.quantity - 1);
                        }
                      }}
                    >
                      −
                    </button>
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
                      className="basket-quantity-input"
                    />
                    <button
                      className="qty-btn qty-plus"
                      onClick={() =>
                        updateQuantity(item.id_basket, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <div className="basket-item-checkbox">
                    <input
                      type="checkbox"
                      id={`check-${item.id_basket}`}
                      checked={!!selectedMap[item.id_basket]}
                      onChange={(e) =>
                        updateSelected(item.id_basket, e.target.checked)
                      }
                    />
                    <label htmlFor={`check-${item.id_basket}`}>
                      <span className="checkbox-label">Выбрать</span>
                    </label>
                  </div>
                </div>

                <div className="basket-item-total">
                  <span>Итого: </span>
                  <span className="item-total-price">{item.full_price} ₽</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="basket-footer">
          <div className="basket-summary">
            <div className="summary-row">
              <span>Выбрано товаров:</span>
              <span className="summary-value">
                {
                  Object.keys(selectedMap).filter((id) => selectedMap[id])
                    .length
                }{" "}
                шт.
              </span>
            </div>
            <div className="summary-row total">
              <span>Общая сумма:</span>
              <span className="summary-value total-price">
                {getTotalSum()} ₽
              </span>
            </div>
          </div>
          <button
            className="basket-order-btn"
            onClick={handleOrder}
            disabled={
              Object.keys(selectedMap).filter((id) => selectedMap[id])
                .length === 0
            }
          >
            Оформить заказ
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="basket-page">
      <div className="basket-container">{renderBasketContent()}</div>
    </div>
  );
};

export default Basket;
