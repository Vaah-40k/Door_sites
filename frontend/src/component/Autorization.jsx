import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/registration.css";
import { useNavigate } from "react-router-dom";
const Autorization = () => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  const [authMessage, setAuthMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/authorization`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(authData),
        },
      );

      const data = await response.json();

      if (response.ok) {
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.dispatchEvent(new Event("authSuccess"));

        setAuthMessage(`Добро пожаловать дорогой клиент`);
        setMessageType("success");
        setAuthData({ email: "", password: "" });
        setInterval(() => {
          navigate("/account");
        }, 1000);
      } else {
        setAuthMessage(data.message || "Пользователь не найден");
        setMessageType("error");
      }
    } catch (error) {
      console.log("Ошибка сети - ", error);
      setAuthMessage("Ошибка сети. Пожалуйста, попробуйте позже.");
      setMessageType("error");
    }
  };

  return (
    <div className="registration">
      <div className="reg-content">
        <form onSubmit={handleAuthSubmit}>
          <h1>Авторизация</h1>
          <div className="form-group">
            <div className="row">
              <label>E-mail: </label>
              <input
                name="email"
                type="email"
                placeholder="Введите почту..."
                value={authData.email}
                onChange={handleAuthChange}
                required
              />
            </div>
            <div className="row6">
              <label>Пароль: </label>
              <div className="password-wrapper">
                <input
                  minLength="8"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Введите пароль..."
                  value={authData.password}
                  onChange={handleAuthChange}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={togglePasswordVisibility}
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="form-btn">
            <button type="submit">Войти</button>
            {authMessage && <p className={messageType}>{authMessage}</p>}
            <p>
              Еще нет аккаунта?{" "}
              <Link to="/registration">Зарегистрироваться</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Autorization;
