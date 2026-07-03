import { useState } from "react";
import Cart_b3 from "./Cart-b3";
import "../styles/catalog.css";
import { useBasket } from "../hooks/useBasket";

const Catalog = () => {
  const [filters, setFilters] = useState({
    search: "",
    minPrice: "",
    maxPrice: "",
  });

  const { addToBasket } = useBasket();


 const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join(""),
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const token = localStorage.getItem("accessToken");
  
  const role = parseJwt(token).role
  console.log(role)
  const isAdmin = role === "administrator";

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
            isAdmin={isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
