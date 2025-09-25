
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCategories } from "../data/api.js";
import CartWidget from "./CartWidget.jsx";

export default function NavBar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    getCategories().then((cats) => active && setCategories(cats));
    return () => { active = false; };
  }, []);

  return (
    <header className="sticky">
      <nav className="nav">
        <Link to="/" className="brand">reactcoder</Link>
        <div className="cats">
          {categories.map((c) => (
            <NavLink
              key={c.id}
              to={`/category/${c.id}`}
              className={({ isActive }) => isActive ? "badge active" : "badge"}
            >
              {c.name}
            </NavLink>
          ))}
        </div>
              <CartWidget />
      </nav>
    </header>
  );
}
