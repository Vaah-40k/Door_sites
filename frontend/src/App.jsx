import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import "./styles/registration.css";
import Header from "./component/Header";
import Block1 from "./component/Block1";
import Block2 from "./component/Block2";
import Offers from "./component/Offers";
import Block3 from "./component/Block3";
import About from "./component/About";
import Footer from "./component/Footer";
import Registration from "./component/Registration";
import Autorization from "./component/Autorization";
import Catalog from "./component/Catalog";
import Cart from "./component/Cart";
import Account from "./component/Account";
import Basket from "./component/Basket";
import ModalMessageUser from "./component/modalMessageUser";
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Block1 />
                <Block2 />
                <Offers />
                <Block3 />
                <About />
                <ModalMessageUser />
              </>
            }
          />
          <Route path="/registration" element={<Registration />} />
          <Route path="/autorization" element={<Autorization />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
