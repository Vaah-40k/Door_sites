import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Cart_b3 = ({ filters, addToBasket, isAdmin }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Состояния для модального окна добавления товара
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    src_img: "/img/doors/default.jpg", // заглушка
    title: "",
    price: "",
    price_opt: "",
    price_small_opt: "",
    price_mrc: "",
    price_rrc: "",
    size: "",
    alt: "",
  });

  // Функция загрузки товаров (вынесена для повторного вызова)
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/show_cards`,
        {
          method: "GET",
        },
      );
      const alldata = await response.json();
      const productsData = alldata.data;

      const formattedProducts = productsData.map((item, index) => ({
        id_tovar: item.ID_cards || index,
        title: item.title,
        price: item.price,
        priceFormatted: `${item.price.toLocaleString()} ₽`,
        image: item.src_img || "/src/assets/cart2.jpg",
        size: `Размер: ${item.size} мм`,
        alt: item.alt || item.title,
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ===== Обработчики формы =====
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    // Валидация обязательных полей
    const required = ["src_img", "title", "price", "size", "alt"];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Поле "${field}" обязательно для заполнения`);
        return;
      }
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Вы не авторизованы");
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/add_card`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            price_opt: formData.price_opt ? Number(formData.price_opt) : null,
            price_small_opt: formData.price_small_opt
              ? Number(formData.price_small_opt)
              : null,
            price_mrc: formData.price_mrc ? Number(formData.price_mrc) : null,
            price_rrc: formData.price_rrc ? Number(formData.price_rrc) : null,
          }),
        },
      );

      const result = await response.json();
      if (result.success) {
        alert("Товар успешно добавлен!");
        setShowModal(false);
        // Сбрасываем форму (опционально)
        setFormData({
          src_img: "/img/doors/default.jpg",
          title: "",
          price: "",
          price_opt: "",
          price_small_opt: "",
          price_mrc: "",
          price_rrc: "",
          size: "",
          alt: "",
        });
        // Обновляем список товаров
        await fetchProducts();
      } else {
        alert(`Ошибка: ${result.message}`);
      }
    } catch (error) {
      console.error("Ошибка добавления товара:", error);
      alert("Произошла ошибка при добавлении товара");
    }
  };

  // ===== Навигация в корзину (без изменений) =====
  const handleCartClick = (product) => {
    navigate("/cart", { state: { product } });
  };

  const handleAddToBasket = (productId) => {
    if (addToBasket) {
      alert("Товар добавлен в корзину");
      addToBasket(productId);
    } else {
      console.warn("addToBasket функция не передана");
    }
  };

  // Фильтрация и сортировка (без изменений)
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
            {/* Если администратор, показываем кнопку "+" */}
            {isAdmin && (
              <button
                className="add-product-btn"
                onClick={() => setShowModal(true)}
                title="Добавить товар"
              >
                +
              </button>
            )}
            Найдено товаров: {sortedProducts.length}
          </p>
        </div>

        <div className="carts">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((product) => (
              <div
                key={product.id_tovar}
                className={`cart-item cart-${product.id_tovar}`}
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

      {/* ===== МОДАЛЬНОЕ ОКНО ДОБАВЛЕНИЯ ТОВАРА ===== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Добавление товара в каталог</h2>
            <form onSubmit={handleAddProduct}>
              <div className="form-group">
                <label>Изображение (URL) *</label>
                <input
                  type="text"
                  name="src_img"
                  value={formData.src_img}
                  onChange={handleInputChange}
                  placeholder="/img/doors/default.jpg"
                  required
                />
              </div>

              <div className="form-group">
                <label>Название *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Цена (розничная) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Цена оптовая</label>
                <input
                  type="number"
                  name="price_opt"
                  value={formData.price_opt}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Цена мелкий опт</label>
                <input
                  type="number"
                  name="price_small_opt"
                  value={formData.price_small_opt}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>МРЦ</label>
                <input
                  type="number"
                  name="price_mrc"
                  value={formData.price_mrc}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>РРЦ</label>
                <input
                  type="number"
                  name="price_rrc"
                  value={formData.price_rrc}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Размер *</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  placeholder="2000x600(700;800;900)x38"
                  required
                />
              </div>

              <div className="form-group">
                <label>Alt-текст (описание) *</label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Добавить товар
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart_b3;
