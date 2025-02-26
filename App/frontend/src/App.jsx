import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import DealershipPage from "./pages/DealershipPage";
import CarsPurchasePage from "./pages/CarsPurchasePage";
import Navbar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people/*" element={<PeoplePage />} />
        <Route path="/dealerships" element={<DealershipPage />} />
        <Route path="/carspurchases" element={<CarsPurchasePage />} />
      </Routes>
    </>
  );
}

export default App;
