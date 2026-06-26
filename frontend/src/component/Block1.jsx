import { useNavigate } from "react-router-dom";
import imgb1 from "../assets/hBDAKS.jpg";
const Block1 = () => {
  const navigate = useNavigate();
  const handleCatalogClick = (e) => {
    e.preventDefault();
    navigate("/catalog");
  };
  return (
    <div className="block1">
      <div className="content-block1">
        <div className="text-b1">
          <h1>
            Входные и межкомнатные <br></br>двери, которые открывают<br></br>{" "}
            больше возможностей
          </h1>
          <p>
            Надёжная защита, стильный дизайн и комфорт <br></br>для вашего дома.
            Подберите идеальную дверь с нами.
          </p>
          <div className="btn-b1">
            <button onClick={handleCatalogClick}>В каталог</button>
          </div>
        </div>
        <div className="b1-img">
          <img src={imgb1}></img>
        </div>
      </div>
    </div>
  );
};
export default Block1;
