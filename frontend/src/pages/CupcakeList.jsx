import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cupcake from "../components/Cupcake";

export default function CupcakeList() {
  // Step 1: get all cupcakes

  const [cupcakes, setCupcakes] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/cupcakes`)
      .then((response) => response.data)
      .then((data) => setCupcakes(data));
  }, []);

  // Step 3: get all accessories

  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/accessories`)
      .then((response) => response.data)
      .then((data) => setAccessories(data));
  }, []);

  const [accessoryFilter, setAccessoryFilter] = useState("");

  const handleAccessoryFilter = (event) => {
    event.preventDefault();

    setAccessoryFilter(event.target.value);
  };

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select id="cupcake-select" onChange={handleAccessoryFilter}>
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}

            {accessories &&
              accessories.map((accessory) => (
                <option key={accessory.id} value={accessory.id}>
                  {accessory.name}
                </option>
              ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}

        {cupcakes &&
          cupcakes
            .filter(
              (cupcake) =>
                !accessoryFilter || cupcake.accessory_id === accessoryFilter
            )
            .map((cupcake) => (
              <Link to={`/cupcakes/${cupcake.id}`} key={cupcake.id}>
                <li className="cupcake-item">
                  <Cupcake key={cupcake.id} cupcake={cupcake} />
                </li>
              </Link>
            ))}

        {/* end of block */}
      </ul>
    </>
  );
}
