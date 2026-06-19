import { useNavigate } from "react-router-dom";
const Block3 = () => {
  const navigate = useNavigate();
  const handleCatalogClick = (e) => {
    e.preventDefault();
    navigate("/catalog");
  };
  const products = [
    {
      id: 1,
      title: "Дубовая дверь",
      price: "15 000 ₽",
      image: "/src/assets/cart2.jpg",
      discription: "Размер",
      alt: "Дубовая дверь",
    },
    {
      id: 2,
      title: "Белая дверь",
      price: "12 500 ₽",
      discription: "Размер",
      image: "/src/assets/cart2.jpg",
      alt: "Белая дверь",
    },
    {
      id: 3,
      title: "Дверь венге",
      price: "18 000 ₽",
      image: "/src/assets/cart2.jpg",
      alt: "Дверь венге",
      discription: "Размер",
    },
    {
      id: 4,
      title: "Стеклянная дверь",
      price: "22 000 ₽",
      image: "/src/assets/cart2.jpg",
      alt: "Стеклянная дверь",
      discription: "Размер",
    },
  ];

  return (
    <div className="block3">
      <div className="offer-content">
        <div className="b3-text">
          <p>Современные двери для любого интерьера</p>
          <h1>Добро пожаловать в наш магазин</h1>
        </div>
        <div className="carts">
          {products.map((product) => (
            <div key={product.id} className={`cart${product.id}`}>
              <div className="cart-image">
                <img src={product.image} alt={product.alt} />
              </div>
              <div className="cart-info">
                <p className="cart-title">{product.title}</p>
                <p className="cart-price">{product.price}</p>
                <p className="cart-discription">{product.discription}</p>
              </div>
              {/* Если хотите черную плашку при наведении, раскомментируйте этот блок и закомментируйте cart-info */}
              {/* <div className="cart-overlay">
                <p className="overlay-title">{product.title}</p>
                <p className="overlay-price">{product.price}</p>
              </div> */}
            </div>
          ))}
        </div>
        <div className="b3-btn">
          <button onClick={handleCatalogClick}>В каталог</button>
        </div>
      </div>
    </div>
  );
};

export default Block3;
