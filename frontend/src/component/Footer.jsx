import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/registration");
  };
  const handleCatalogClick = (e) => {
    e.preventDefault();
    navigate("/catalog");
  };
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="row1">
          <h1>Информация</h1>
          <p>Информация</p>
        </div>
        <div className="row2">
          <h1>Навигация</h1>
          <div className="nav-footer">
            <a href="/">Главная</a>
            <a href="/">О нас</a>
            <a href="/catalog" onClick={handleCatalogClick}>
              Каталог
            </a>
            <a href="/" onClick={handleLoginClick}>
              Войти
            </a>
          </div>
        </div>
        <div className="row3">
          <h1>Контакты</h1>
          <p>Информация</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
