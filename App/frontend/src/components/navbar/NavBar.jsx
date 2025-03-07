import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cars">Cars</Link>
      <Link to="/dealerships">Dealerships</Link>
      <Link to="/carspurchases">Cars Purchases</Link>
      <Link to="/customers">Customers</Link>
      <Link to="/">Employees</Link>
      <Link to="/">Purchases</Link>
    </nav>
  );
};

export default Navbar;
