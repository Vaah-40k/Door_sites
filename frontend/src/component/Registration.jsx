import React from "react";
import { Link } from "react-router-dom";
import "../styles/registration.css";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationData: {
        first_name: "",
        last_name: "",
        midlle_name: "",
        email: "",
        phone: "",
        password_one: "",
        password_two: "",
      },
      registrationMessage: "",
      messageType: "", // "success" или "error"
      showPasswordOne: false,
      showPasswordTwo: false,
    };
  }

  handleRegistrationChange = (e) => {
    const { name, value } = e.target;
    this.setState((prev) => ({
      registrationData: {
        ...prev.registrationData,
        [name]: value,
      },
    }));
  };

  togglePasswordVisibility = (field) => {
    this.setState((prev) => ({
      [field]: !prev[field],
    }));
  };

  handleRegistrationSubmit = async (event) => {
    event.preventDefault();

    if (
      this.state.registrationData.password_one !==
      this.state.registrationData.password_two
    ) {
      this.setState({
        registrationMessage: "Пароли не совпадают",
        messageType: "error",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/registration`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state.registrationData),
        },
      );

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        if (data.accessToken && data.refreshToken) {
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("refreshToken", data.refreshToken);
          window.dispatchEvent(new Event("authSuccess"));
        }

        this.setState({
          registrationMessage: `Регистрация успешна!`,
          messageType: "success",
          registrationData: {
            first_name: "",
            last_name: "",
            midlle_name: "",
            email: "",
            phone: "",
            password_one: "",
            password_two: "",
          },
        });
      } else {
        this.setState({
          registrationMessage: data.message || "Ошибка регистрации",
          messageType: "error",
        });
      }
    } catch (error) {
      console.log("Ошибка сети - ", error);
      this.setState({
        registrationMessage: "Ошибка сети. Пожалуйста, попробуйте позже.",
        messageType: "error",
      });
    }
  };

  render() {
    const { showPasswordOne, showPasswordTwo } = this.state;

    return (
      <div className="registration">
        <div className="reg-content">
          <form onSubmit={this.handleRegistrationSubmit}>
            <h1>Регистрация</h1>
            <div className="form-group">
              <div className="row">
                <label>Имя: </label>
                <input
                  name="first_name"
                  type="text"
                  placeholder="Введите ваше имя..."
                  value={this.state.registrationData.first_name}
                  onChange={this.handleRegistrationChange}
                  required
                />
              </div>
              <div className="row">
                <label>Фамилия: </label>
                <input
                  name="last_name"
                  type="text"
                  placeholder="Введите вашу фамилию..."
                  value={this.state.registrationData.last_name}
                  onChange={this.handleRegistrationChange}
                  required
                />
              </div>
              <div className="row">
                <label>Отчество: </label>
                <input
                  name="midlle_name"
                  type="text"
                  placeholder="Введите ваше отчество..."
                  value={this.state.registrationData.midlle_name}
                  onChange={this.handleRegistrationChange}
                />
              </div>
              <div className="row">
                <label>E-mail: </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Введите почту..."
                  value={this.state.registrationData.email}
                  onChange={this.handleRegistrationChange}
                  required
                />
              </div>
              <div className="row5">
                <label>Телефон: </label>
                <input
                  maxLength="12"
                  name="phone"
                  type="tel"
                  placeholder="Введите телефон..."
                  value={this.state.registrationData.phone}
                  onChange={this.handleRegistrationChange}
                  required
                />
              </div>
              <div className="row6">
                <label>Пароль: </label>
                <div className="password-wrapper">
                  <input
                    minLength="8"
                    type={showPasswordOne ? "text" : "password"}
                    name="password_one"
                    placeholder="Введите пароль..."
                    value={this.state.registrationData.password_one}
                    onChange={this.handleRegistrationChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() =>
                      this.togglePasswordVisibility("showPasswordOne")
                    }
                  >
                    {showPasswordOne ? (
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
              <div className="row7">
                <label>Повторите пароль: </label>
                <div className="password-wrapper">
                  <input
                    minLength="8"
                    type={showPasswordTwo ? "text" : "password"}
                    name="password_two"
                    placeholder="Повторите пароль..."
                    value={this.state.registrationData.password_two}
                    onChange={this.handleRegistrationChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() =>
                      this.togglePasswordVisibility("showPasswordTwo")
                    }
                  >
                    {showPasswordTwo ? (
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
              <button type="submit">Зарегистрироваться</button>
              {this.state.registrationMessage && (
                <p className={this.state.messageType}>
                  {this.state.registrationMessage}
                </p>
              )}
              <p>
                Уже есть аккаунт? <Link to="/autorization">Войти</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Registration;
