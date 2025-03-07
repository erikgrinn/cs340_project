import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import DealershipPage from "./pages/DealershipPage";
import CarsPurchasePage from "./pages/CarsPurchasePage";
import Navbar from "./components/navbar/NavBar";
import Header from "./components/header";
import CustomersPage from "./pages/CustomersPage";
import CarsPage from "./pages/CarsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
          <Header title="Index" />
          <HomePage />
          </>
          } />
        {/* <Route path="/people/*" element={<PeoplePage />} /> */}
        <Route path="/dealerships" element={
          <>
          <Header title="Dealerships" />
          <DealershipPage />
          </>
          } />
        <Route path="/carspurchases" element={
          <>
            <Header title="Cars Purchases" />
            <CarsPurchasePage />
          </>
          } />
          <Route path="/customers" element={
          <>
            <Header title="Customers" />
            <CustomersPage />
          </>
          } />
          <Route path="/cars" element={
          <>
          <Header title="Cars" />
          <CarsPage />
          </>
          } />
      </Routes>
    </>
    
  );
}

export default App;
