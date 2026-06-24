import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Cart from "./Cart";
const Cart_b3 = ({ filters, addToBasket }) => {
  // Принимаем addToBasket как проп
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCartClick = (product) => {
    navigate("/cart", { state: { product } });
  };

  const handleAddToBasket = (productId) => {
    if (addToBasket) {
      addToBasket(productId);
    } else {
      console.warn("addToBasket функция не передана");
    }
  };

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL_BACKEND}/show_cards`,
          {
            method: "GET",
          },
        );
        const alldata = await response.json();
        const productsData = alldata.data;

        // Трансформируем данные из БД в нужный формат
        const formattedProducts = productsData.map((item, index) => ({
          id_tovar: item.ID_cards || index,
          title: item.title,
          price: item.price,
          priceFormatted: `${item.price.toLocaleString()} ₽`,
          image: item.src_img || "/src/assets/cart2.jpg",
          size: `Размер: ${item.size}`,
          alt: item.alt || item.title,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Фильтрация товаров
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    const minPrice =
      filters.minPrice === "" ? -Infinity : Number(filters.minPrice);
    const matchesMinPrice = product.price >= minPrice;

    const maxPrice =
      filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);
    const matchesMaxPrice = product.price <= maxPrice;

    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  const sortedProducts = [...filteredProducts].sort(
    (a, b) => a.price - b.price,
  );
  if (loading) {
    return <div className="block3">Загрузка товаров...</div>;
  }
  return (
    <div className="block3">
      <div className="offer-content">
        <div className="carts-header">
          <p className="products-count">
            Найдено товаров: {sortedProducts.length}
          </p>
        </div>
        <div className="carts">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div
                key={product.id_tovar}
                className={`cart-item cart${product.id_tovar}`}
              >
                <div className="cart-image">
                  <img src={product.image} alt={product.alt} />
                </div>
                <div className="cart-info">
                  <p className="cart-title">{product.title}</p>
                  <p className="cart-price">{product.priceFormatted}</p>
                  <p className="cart-description">{product.size}</p>
                  <button
                    className="cart-btn"
                    onClick={() => handleCartClick(product)}
                  >
                    Оформить заказ
                  </button>
                  <button
                    data-id-tovar={product.id}
                    onClick={() => handleAddToBasket(product.id_tovar)}
                  >
                    В корзину
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>Товары не найдены</p>
              <p className="no-products-hint">
                Попробуйте изменить параметры фильтра
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart_b3;
