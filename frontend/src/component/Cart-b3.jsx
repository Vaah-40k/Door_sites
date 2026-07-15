import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Cart_b3 = ({ filters, addToBasket, isAdmin }) => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  // Состояния для модального окна добавления товара
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    src_img: "/src/assets/cart2.jpg", // заглушка
    title: "",
    price: "",
    price_opt: "",
    price_small_opt: "",
    price_mrc: "",
    price_rrc: "",
    size: "",
    alt: "",
  });
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setSelectedFiles(files);
      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviews(urls);
    } else {
      setSelectedFiles([]);
      setPreviews([]);
    }
  };

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

      const formattedProducts = productsData.map((item) => {
        let images = [];
        try {
          images = JSON.parse(item.src_img);
        } catch {
          images = [item.src_img];
        }
        const firstImage = images.length ? images[0] : "/src/assets/cart2.jpg";
        return {
          id_tovar: item.ID_cards || item.id_cards,
          title: item.title,
          price: item.price,
          priceFormatted: `${item.price.toLocaleString()} ₽`,
          image: firstImage, // показываем первое изображение
          images: images, // сохраняем все для возможной галереи
          size: `Размер: ${item.size} мм`,
          alt: item.alt || item.title,
        };
      });
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
    } finally {
      setLoading(false);
    }
  };
  const removeCards = async (id_tovar) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL_BACKEND}/remove_card`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          id_tovar: id_tovar,
        },
      },
    );
    alert("Карточка успешно удалена");
    location.reload();
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

    // Валидация обязательных полей (без src_img, т.к. теперь файлы)
    const required = ["title", "price", "size", "alt"];
    for (let field of required) {
      if (!formData[field]) {
        alert(`Поле "${field}" обязательно для заполнения`);
        return;
      }
    }
    if (selectedFiles.length === 0) {
      alert("Выберите хотя бы одно изображение");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Вы не авторизованы");
        return;
      }

      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", Number(formData.price));
      data.append(
        "price_opt",
        formData.price_opt ? Number(formData.price_opt) : "",
      );
      data.append(
        "price_small_opt",
        formData.price_small_opt ? Number(formData.price_small_opt) : "",
      );
      data.append(
        "price_mrc",
        formData.price_mrc ? Number(formData.price_mrc) : "",
      );
      data.append(
        "price_rrc",
        formData.price_rrc ? Number(formData.price_rrc) : "",
      );
      data.append("size", formData.size);
      data.append("alt", formData.alt);

      // Добавляем все файлы с ключом 'images'
      selectedFiles.forEach((file) => {
        data.append("images", file);
      });

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/add_card`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: data,
        },
      );

      const result = await response.json();
      if (result.success) {
        alert("Товар успешно добавлен!");
        setShowModal(false);
        setFormData({
          /* сброс */
        });
        setSelectedFiles([]);
        setPreviews([]);
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
                Добавить товар +
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
                  {isAdmin && (
                    <button onClick={() => removeCards(product.id_tovar)}>
                      Удалить товар -
                    </button>
                  )}
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
                <label>Изображения (загрузите несколько файлов) *</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  required
                />
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  {previews.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`preview-${idx}`}
                      style={{ maxWidth: "100px" }}
                    />
                  ))}
                </div>
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
