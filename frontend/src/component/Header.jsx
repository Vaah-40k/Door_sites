import Logoimg from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { parseJwt } from "../hooks/parseJwt";

const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем наличие токена при загрузке и при изменении localStorage
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const haveToken = parseJwt(token);
      setIsAuthenticated(Boolean(haveToken));
    };

    checkAuth();

    // Слушаем событие авторизации (используется в Registration и Autorization)
    window.addEventListener("authSuccess", checkAuth);
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("authSuccess", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLoginClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/account");
    } else {
      navigate("/autorization");
    }
  };

  const handleCatalogClick = (e) => {
    e.preventDefault();
    navigate("/catalog");
  };

  const handleBasketClick = (e) => {
    e.preventDefault();
    navigate("/basket");
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    navigate("/");
    // Прокрутка к блоку About
    setTimeout(() => {
      const aboutBlock = document.querySelector(".about-block");
      if (aboutBlock) {
        aboutBlock.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={Logoimg} alt="Логотип" />
      </div>
      <div className="nav-head">
        <a href="/" onClick={handleHomeClick}>
          Главная
        </a>
        <a href="/about" onClick={handleAboutClick}>
          О нас
        </a>
        <a href="/catalog" onClick={handleCatalogClick}>
          Каталог
        </a>
        <a href="/basket" onClick={handleBasketClick}>
          Корзина
        </a>
        {/* Ссылка "Личный кабинет" в навигации УДАЛЕНА */}
      </div>
      <div className="header-btn">
        <button onClick={handleLoginClick}>
          {isAuthenticated ? "Личный кабинет" : "Войти"}
        </button>
      </div>
    </div>
  );
};

export default Header;
