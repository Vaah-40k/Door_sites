import { useEffect, useState } from "react";
import Cart_b3 from "./Cart-b3";
import "../styles/catalog.css";
import { useBasket } from "../hooks/useBasket";
import { parseJwt } from "../hooks/parseJwt";
const Catalog = () => {
  const token = localStorage.getItem("accessToken");

  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });
  const [roleUser, setRoleUser] = useState();

  const { addToBasket } = useBasket();

  const definitionRole = () => {
    try {
      const role = parseJwt(token).role;
      setRoleUser(role);
    } catch (err) {
      console.log("Неавторизованные пользователь");
    }
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      minPrice: "",
      maxPrice: "",
    });
  };
  useEffect(() => {
    definitionRole();
  }, [token]);

  return (
    <div className="catalog">
      <div className="catalog-content">
        <div className="filter">
          {/* Фильтры без изменений */}
          <div className="filter-content">
            <h1>Фильтр</h1>
            <div className="filter-group">
              <label>Поиск по названию:</label>
              <input
                type="text"
                name="search"
                placeholder="Введите название двери..."
                value={filters.search}
                onChange={handleFilterChange}
                className="filter-input"
              />
            </div>
            <div className="filter-group">
              <label>Цена от:</label>
              <input
                type="number"
                name="minPrice"
                placeholder="от 0 ₽"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="filter-input"
                min="0"
              />
            </div>
            <div className="filter-group">
              <label>Цена до:</label>
              <input
                type="number"
                name="maxPrice"
                placeholder="до 100 000 ₽"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="filter-input"
                min="0"
              />
            </div>
            <button onClick={resetFilters} className="reset-btn">
              Сбросить фильтры
            </button>
          </div>
        </div>

        <div className="cart">
          {/* Передаём isAdmin в компонент каталога */}
          <Cart_b3
            filters={filters}
            addToBasket={addToBasket}
            isAdmin={roleUser === "administrator"}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
