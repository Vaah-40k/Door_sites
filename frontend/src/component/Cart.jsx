// Cart.jsx
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useBasket } from "../hooks/useBasket";
import "../styles/cart.css";

// Пример дополнительных товаров для демонстрации (без изменений)
const sampleProducts = [
  {
    id: 1,
    title: "Дверь дубовая классическая",
    price: 15000,
    size: "90x200",
    material: "Массив дуба",
    src_img: "/src/assets/door1.jpg",
    alt: "Дверь дубовая",
  },
  {
    id: 2,
    title: "Дверь дубовая с остеклением",
    price: 18500,
    size: "80x200",
    material: "Массив дуба",
    src_img: "/src/assets/door2.jpg",
    alt: "Дверь с стеклом",
  },
  {
    id: 3,
    title: "Дверь дубовая резная",
    price: 22000,
    size: "100x200",
    material: "Массив дуба",
    src_img: "/src/assets/door3.jpg",
    alt: "Дверь резная",
  },
];

const Cart = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToBasket } = useBasket();

  const handleAddToBasket = async () => {
    if (!product || !product.id_tovar) {
      alert("Ошибка: идентификатор товара не найден");
      return;
    }

    setIsAdding(true);
    try {
      await addToBasket(product.id_tovar);
      setAddedToCart(true);
      alert("Товар добавлен в корзину");

      // Обновляем корзину через событие (уже вызывается внутри addToBasket)
      // Перенаправляем в корзину через 1.5 секунды
      setTimeout(() => {
        window.location.href = "/basket";
      }, 1500);
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
      alert(
        "Не удалось добавить товар в корзину. Возможно, вы не авторизованы.",
      );
    } finally {
      setIsAdding(false);
    }
  };

  // Если товар не передан, показываем примеры товаров (без изменений)
  if (!product) {
    return (
      <div className="cart">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Выберите товар из каталога
        </h2>
        <div className="sample-products">
          {sampleProducts.map((sample) => (
            <div key={sample.id} className="sample-product-card">
              <img src={sample.src_img} alt={sample.alt} />
              <h3>{sample.title}</h3>
              <p className="sample-price">{sample.price} ₽</p>
              <p className="sample-size">{sample.size} см</p>
              <button
                className="sample-btn"
                onClick={() => (window.location.href = "/catalog")}
              >
                Перейти в каталог
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-content">
        <div className="sec-cart-img">
          <img src={product.src_img} alt={product.alt || product.title} />
          <img src="/src/assets/cart2.jpg" alt="Деталь двери 1" />
          <img src="/src/assets/cart3.jpg" alt="Деталь двери 2" />
        </div>
        <div className="main-cart-img">
          <img src={product.src_img} alt={product.alt || product.title} />
        </div>
        <div className="cart-text">
          <h1>{product.title}</h1>
          <p>{product.price} ₽</p>
          <p>Размер: {product.size} см</p>
          <p>Материал: {product.material || "Массив дуба"}</p>
          <p>
            Описание:{" "}
            {product.description ||
              "Качественная дверь из массива дуба. Отличный вариант для вашего интерьера."}
          </p>
          <div className="cart-btn1">
            <button
              onClick={handleAddToBasket}
              disabled={addedToCart || isAdding}
              style={
                addedToCart
                  ? { background: "#33cccc", cursor: "default" }
                  : isAdding
                    ? { background: "#ffaa33", cursor: "wait" }
                    : {}
              }
            >
              {addedToCart
                ? "✓ Добавлено"
                : isAdding
                  ? "Добавление..."
                  : "Добавить в корзину"}
            </button>
          </div>
        </div>
      </div>

      {/* Стили (без изменений) */}
      <style jsx>{`
        .sample-products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          padding: 20px;
        }
        .sample-product-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
          padding: 20px;
          text-align: center;
        }
        .sample-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }
        .sample-product-card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }
        .sample-product-card h3 {
          font-family: "AdventPro-Bold", sans-serif;
          font-size: 1.1em;
          margin: 15px 0 10px;
          color: #000;
        }
        .sample-price {
          font-family: "AdventPro-Bold", sans-serif;
          font-size: 1.3em;
          color: #ff5f2f;
          margin: 5px 0;
        }
        .sample-size {
          font-family: "AdventPro-Regular", sans-serif;
          color: #666;
          margin: 5px 0 15px;
        }
        .sample-btn {
          background: #ff5f2f;
          color: white;
          border: none;
          padding: 10px 30px;
          border-radius: 8px;
          font-family: "AdventPro-Bold", sans-serif;
          font-size: 1em;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .sample-btn:hover {
          background: #e04e22;
        }
        .cart-btn1 button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default Cart;
