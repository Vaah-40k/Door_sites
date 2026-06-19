import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/registration.css";

const Autorization = () => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "", // Изменено с password_one на password (как в index.html)
  });
  const [authMessage, setAuthMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" или "error"

  const handleAuthChange = (e) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAuthSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/authorization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const data = await response.json();

      if (response.ok) {
        // Сохраняем токены (как в index.html)
        const accessToken = data.accessToken;
        const refreshToken = data.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        window.dispatchEvent(new Event("authSuccess"));

        setAuthMessage(
          `Добро пожаловать, ${data.user?.first_name || data.user?.email || "пользователь"}!`,
        );
        setMessageType("success");
        setAuthData({ email: "", password: "" });
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
              <input
                minLength="8"
                type="password"
                name="password"
                placeholder="Введите пароль..."
                value={authData.password}
                onChange={handleAuthChange}
                required
              />
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
