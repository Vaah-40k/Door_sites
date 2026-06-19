import { useLocation } from "react-router-dom";
import "../styles/cart.css";
import fetchWithAuth from "../utils/fetchWithAuth";
const Cart = () => {
  const location = useLocation();
  const product = location.state?.product;
  const token = localStorage.getItem("accessToken");
  const handleAddToBasket = async () => {
    // Проверяем авторизацию
    if (!token) {
      alert("Для добавления в корзину необходимо авторизоваться");
      return;
    }

    try {
      // Отправляем только необходимые поля
      const response = await fetchWithAuth("/basket/add", {
        method: "POST",
        body: JSON.stringify({
          id_tovar: product.id_tovar || product.id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Товар добавлен в корзину");
        // Можно дополнительно обновить корзину через событие
        window.dispatchEvent(new Event("basketUpdated"));
      } else {
        alert(data.message || "Ошибка добавления в корзину");
      }
    } catch (err) {
      console.error("Ошибка добавления в корзину:", err);
      alert("Произошла ошибка при добавлении товара. Попробуйте позже.");
    }
  };

  return (
    <div className="cart">
      <div className="cart-content">
        <div className="sec-cart-img">
          <img src={product.src_img} alt={product.alt || product.title} />
          <img src="/src/assets/cart2.jpg" alt="Деталь двери 1" />
        </div>
        <div className="main-cart-img">
          <img src="/src/assets/cart2.jpg" alt="Деталь двери 1" />
        </div>
        <div className="cart-text">
          <h1>{product.title}</h1>
          <p>{product.price} ₽</p>
          <p>{product.size} см</p>
          <p>Материал: Массив дуба</p>
          <p>Описание</p>
          <div className="cart-btn1">
            <button onClick={handleAddToBasket}>Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
