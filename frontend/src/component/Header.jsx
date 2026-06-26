import Logoimg from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/registration");
  };

  const handleCatalogClick = (e) => {
    e.preventDefault();
    navigate("/catalog");
  };

  const handleAccountClick = (e) => {
    e.preventDefault();
    navigate("/account");
  };
  const handlBasketClick = (e) => {
    e.preventDefault();
    navigate("/basket");
  };

  return (
    <div className="header">
      <div className="logo">
        <img src={Logoimg}></img>
      </div>
      <div className="nav-head">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          Главная
        </a>
        <a href="/">О нас</a>
        <a href="/catalog" onClick={handleCatalogClick}>
          Каталог
        </a>
        <a href="/basket" onClick={handlBasketClick}>
          Корзина
        </a>
        <a href="/account" onClick={handleAccountClick}>
          Личный кабинет
        </a>
      </div>
      <div className="header-btn">
        <button onClick={handleLoginClick}>Войти</button>
      </div>
    </div>
  );
};

export default Header;
