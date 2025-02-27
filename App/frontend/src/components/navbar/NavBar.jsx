import { Link } from "react-router-dom";
import { MdLocalConvenienceStore } from "react-icons/md";

const Navbar = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <MdLocalConvenienceStore size={80} />
        </Link>
      </div>
      <h1>Benton County Dealership Service</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dealerships">Dealerships</Link>
          </li>
          <li>
            <Link to="/carspurchases">Cars Purchases</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
