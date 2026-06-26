// Account.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";

const Account = () => {
  console.log(import.meta.env.VITE_BASE_URL_BACKEND);

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState(" ");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Состояния для профиля
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    midlle_name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [profileForm, setProfileForm] = useState({ ...user });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    phone: "",
  });

  // Заказы и избранное
  const [orders, setOrders] = useState([]);
  const [favorites] = useState([
    {
      productId: 1,
      name: "Дверь премиум 'Элит'",
      price: 35700,
      image: "/api/placeholder/200/150",
    },
    {
      productId: 2,
      name: "Дверь со стеклом 'Гранд'",
      price: 28400,
      image: "/api/placeholder/200/150",
    },
    {
      productId: 3,
      name: "Дверь-купе 'Лофт'",
      price: 22300,
      image: "/api/placeholder/200/150",
    },
  ]);

  // Валидация
  const validateEmail = (email) => {
    const re = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!email) return "Email обязателен";
    if (!re.test(email))
      return "Введите корректный email (например, user@example.ru)";
    return "";
  };

  const validatePhone = (phone) => {
    const allowedCharsRegex = /^[0-9+\-()\s]*$/;
    if (!allowedCharsRegex.test(phone)) {
      return "Номер телефона может содержать только цифры, +, пробелы, дефисы и скобки";
    }
    const digits = phone.replace(/\D/g, "");
    if (!digits) return "Телефон обязателен";
    if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
      return "";
    }
    if (digits.length === 10 && digits[0] === "9") {
      return "";
    }
    return "Введите российский номер телефона (11 цифр, начинается с 7 или 8)";
  };

  // Функция загрузки заказов
  const loadOrders = async () => {
    try {
      if (!token) {
        console.warn("Нет токена для загрузки заказов");
        return;
      }
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/application-show`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const result = await response.json();
      if (!result.success)
        throw new Error(result.message || "Ошибка загрузки заказов");

      const rawOrders = result.data;

      const ordersMap = new Map();

      rawOrders.forEach((item) => {
        const groupId = item.id_group_application;

        if (groupId === 0 || groupId === null || groupId === undefined) {
          // Одиночный заказ
          const orderId = `single_${item.id_application}`;
          ordersMap.set(orderId, {
            id: orderId,
            items: [
              {
                id: item.Id_tovar,
                name: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.src_img,
                size: item.size,
              },
            ],
            total: item.price * item.quantity,
            date: item.createdAt,
            status: item.status || "В обработке",
            address: item.adress,
          });
        } else {
          // Групповой заказ
          if (!ordersMap.has(groupId)) {
            ordersMap.set(groupId, {
              id: groupId,
              items: [],
              total: 0,
              date: item.createdAt,
              status: item.status || "В обработке",
              address: item.adress,
            });
          }
          const order = ordersMap.get(groupId);
          order.items.push({
            id: item.Id_tovar,
            name: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.src_img,
            size: item.size,
          });
          order.total += item.price * item.quantity;
        }
      });

      const formattedOrders = Array.from(ordersMap.values());
      setOrders(formattedOrders);
    } catch (err) {
      console.error("Ошибка загрузки заказов:", err);
      setOrders([]);
    }
  };

  // Загрузка профиля
  const fetchProfile = async () => {
    if (!token) {
      setError("Нет токена авторизации");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/profile`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.json();

      if (response.ok && data) {
        setUser({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          midlle_name: data.midlle_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
        setProfileForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          midlle_name: data.midlle_name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } else {
        setError(data.message || "Ошибка загрузки профиля");
      }
    } catch (err) {
      console.error("Ошибка отправки запроса: ", err);
      setError("Не удалось загрузить данные профиля");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    loadOrders();
  }, [token]);

  // Обработчики формы
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      const err = validateEmail(value);
      setValidationErrors((prev) => ({ ...prev, email: err }));
    } else if (name === "phone") {
      const err = validatePhone(value);
      setValidationErrors((prev) => ({ ...prev, phone: err }));
    }
  };

  const isFormValid = () => {
    const emailErr = validateEmail(profileForm.email);
    const phoneErr = validatePhone(profileForm.phone);
    setValidationErrors({ email: emailErr, phone: phoneErr });
    return emailErr === "" && phoneErr === "";
  };

  const handleSaveProfile = async () => {
    if (!isFormValid()) {
      alert("Пожалуйста, исправьте ошибки в форме");
      return;
    }

    const payload = {
      first_name: profileForm.first_name,
      last_name: profileForm.last_name,
      midlle_name: profileForm.midlle_name,
      email: profileForm.email,
      phone: profileForm.phone,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();

      if (response.ok && result.success) {
        setUser({ ...profileForm });
        setIsEditing(false);
        alert("Профиль успешно обновлён");
      } else {
        alert(result.message || "Не удалось обновить профиль");
        setError(result.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Произошла ошибка при обновлении профиля. Проверьте соединение.");
    }
  };

  const handleLogout = () => {
    const choise = confirm("Вы действительно хотите выйти из аккаунта?");
    if (choise) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("Вы вышли из аккаунта");
      navigate("/");
    }
  };

  // Отмена заказа
  const handleCancelApplication = async (order) => {
    const confirmCancel = window.confirm("Вы точно хотите отменить заказ?");
    if (!confirmCancel) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/application-destroy/${order.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Ошибка отмены заказа");
      }
      alert("Заказ успешно отменён");
      await loadOrders(); // обновляем список заказов
    } catch (err) {
      console.error("Ошибка отмены заказа:", err);
      alert("Не удалось отменить заказ");
    }
  };

  const handleRepeatOrder = (orderId) => {
    alert(`Повтор заказа №${orderId} (демо-режим)`);
  };

  const handleAddToCart = (productName) => {
    alert(`Товар "${productName}" добавлен в корзину (демо-режим)`);
  };

  const handleRemoveFavorite = (productName) => {
    alert(`Товар "${productName}" удален из избранного (демо-режим)`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "новый":
        return "#ff5f2f";
      case "в обработке":
        return "#33cccc";
      case "отправлен":
        return "#4caf50";
      case "доставлен":
        return "#4caf50";
      case "отменен":
        return "#999";
      default:
        return "#000";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "новый":
        return "🟡 Новый";
      case "в обработке":
        return "🔄 В обработке";
      case "отправлен":
        return "📦 Отправлен";
      case "доставлен":
        return "✅ Доставлен";
      case "отменен":
        return "❌ Отменен";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="account">
        <div className="account-container">
          <div style={{ textAlign: "center", padding: "50px" }}>
            Загрузка профиля...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="account">
        <div className="account-container">
          <div style={{ textAlign: "center", padding: "50px", color: "red" }}>
            Ошибка: {error}
          </div>
        </div>
      </div>
    );
  }

  const qwe = false;

  return (
    <div className="account">
      <div className="account-container">
        {/* Боковое меню */}
        <div className="account-sidebar">
          <div className="user-avatar">
            <div className="avatar-placeholder">
              {user.first_name ? user.first_name.charAt(0).toUpperCase() : "П"}
            </div>
            <h3>{user.first_name || "Пользователь"}</h3>
            <p>{user.email}</p>
          </div>

          <nav className="account-nav">
            {/* Кнопки отображаются только если qwe === false */}
            {qwe === false ? (
              <>
                <button
                  className={activeTab === "profile" ? "active" : ""}
                  onClick={() => setActiveTab("profile")}
                >
                  👤 Профиль
                </button>
                <button
                  className={activeTab === "orders" ? "active" : ""}
                  onClick={() => setActiveTab("orders")}
                >
                  📦 Мои заказы
                  <span className="badge">{orders.length}</span>
                </button>
                <button
                  className={activeTab === "favorites" ? "active" : ""}
                  onClick={() => setActiveTab("favorites")}
                >
                  ❤️ Избранное
                  <span className="badge">{favorites.length}</span>
                </button>
              </>
            ) : (
              <>
                <button
                  className={activeTab === "favorites" ? "active" : ""}
                  onClick={() => setActiveTab("favorites")}
                >
                  ❤️ Сообщения
                  <span className="badge">{favorites.length}</span>
                </button>{" "}
              </>
            )}
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Выйти
            </button>
          </nav>
        </div>

        {/* Основной контент */}
        <div className="account-content">
          {/* Профиль */}
          {activeTab === "profile" && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Личная информация</h2>
                {!isEditing && (
                  <button
                    className="edit-btn"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Редактировать
                  </button>
                )}
              </div>

              {isEditing ? (
                <form
                  className="profile-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveProfile();
                  }}
                >
                  <div className="form-group">
                    <label>Имя</label>
                    <input
                      type="text"
                      name="first_name"
                      value={profileForm.first_name}
                      onChange={handleProfileChange}
                      placeholder="Введите имя"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Фамилия</label>
                    <input
                      type="text"
                      name="last_name"
                      value={profileForm.last_name}
                      onChange={handleProfileChange}
                      placeholder="Введите фамилию"
                    />
                  </div>

                  <div className="form-group">
                    <label>Отчество</label>
                    <input
                      type="text"
                      name="midlle_name"
                      value={profileForm.midlle_name}
                      onChange={handleProfileChange}
                      placeholder="Введите отчество"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      className={validationErrors.email ? "error-input" : ""}
                    />
                    {validationErrors.email && (
                      <div className="error-message">
                        {validationErrors.email}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Телефон</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profileForm.phone}
                      onChange={handleProfileChange}
                      placeholder="+7 (___) ___-__-__"
                      className={validationErrors.phone ? "error-input" : ""}
                    />
                    {validationErrors.phone && (
                      <div className="error-message">
                        {validationErrors.phone}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label>Адрес доставки</label>
                    <textarea
                      name="address"
                      value={profileForm.address}
                      onChange={handleProfileChange}
                      placeholder="Город, улица, дом, квартира"
                      rows="3"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="save-btn">
                      Сохранить
                    </button>
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => {
                        setProfileForm({ ...user });
                        setIsEditing(false);
                      }}
                    >
                      Отмена
                    </button>
                  </div>
                </form>
              ) : (
                <div className="profile-info">
                  <div className="info-row">
                    <span className="info-label">Имя и фамилия:</span>
                    <span className="info-value">
                      {user.first_name +
                        " " +
                        user.last_name +
                        " " +
                        user.midlle_name}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Телефон:</span>
                    <span className="info-value">{user.phone}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Адрес доставки:</span>
                    <span className="info-value">{user.address}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Заказы */}
          {activeTab === "orders" && (
            <div className="orders-section">
              <div className="section-header">
                <h2>Мои заказы</h2>
              </div>

              <div className="orders-list">
                {orders.length === 0 ? (
                  <p
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#999",
                    }}
                  >
                    У вас пока нет заказов
                  </p>
                ) : (
                  orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div>
                          <span className="order-number">
                            Заказ №{order.id}
                          </span>
                          <span className="order-date">
                            {new Date(order.date).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                        <span
                          className="order-status"
                          style={{ color: getStatusColor(order.status) }}
                        >
                          {getStatusText(order.status)}
                        </span>
                      </div>

                      <div className="order-items">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="order-item">
                            <img
                              src={item.image || "/api/placeholder/60/60"}
                              alt={item.name}
                            />
                            <div className="order-item-info">
                              <h4>{item.name}</h4>
                              <p>Количество: {item.quantity}</p>
                              <p>Размер: {item.size}</p>
                            </div>
                            <div className="order-item-price">
                              {item.price * item.quantity} ₽
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="order-footer">
                        <div className="order-total">
                          Итого: <span>{order.total} ₽</span>
                        </div>
                        {order.status !== "отменен" &&
                          order.status !== "доставлен" && (
                            <button
                              className="cancel-order-btn"
                              onClick={() => handleCancelApplication(order)}
                            >
                              Отменить заказ
                            </button>
                          )}
                        {order.status === "доставлен" && (
                          <button
                            className="repeat-order-btn"
                            onClick={() => handleRepeatOrder(order.id)}
                          >
                            Повторить заказ
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Избранное */}
          {activeTab === "favorites" && (
            <div className="favorites-section">
              <div className="section-header">
                <h2>Избранные товары</h2>
              </div>

              <div className="favorites-grid">
                {favorites.map((item) => (
                  <div key={item.productId} className="favorite-card">
                    <img
                      src={item.image || "/api/placeholder/200/150"}
                      alt={item.name}
                    />
                    <div className="favorite-info">
                      <h4>{item.name}</h4>
                      <p className="favorite-price">{item.price} ₽</p>
                      <div className="favorite-actions">
                        <button
                          className="add-to-cart-btn"
                          onClick={() => handleAddToCart(item.name)}
                        >
                          В корзину
                        </button>
                        <button
                          className="remove-fav-btn"
                          onClick={() => handleRemoveFavorite(item.name)}
                        >
                          ❌
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
