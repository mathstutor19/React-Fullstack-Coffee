import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { showCoffees, deleteCoffee } from "../features/coffeeSlice";
import { Link } from "react-router-dom";
const Coffees = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showCoffees());
  }, [dispatch, count]);
  const coffeeData = useSelector((state) => {
    return state.coffees.coffees;
  });
  const handleDeleteCoffee = (coffeeId) => {
    setCount((count) => count + 1);
    dispatch(deleteCoffee(coffeeId));
  };
  console.log(coffeeData);
  return (
    <div>
      <Header />
      <div className="display">
        {coffeeData.map((coffee) => {
          return (
            <div className="card" key={coffee._id}>
              <h4>{coffee.name}</h4>
              <img src={coffee.image} alt={coffee.name} width={"80%"} />
              <div className="container">
                <h4>
                  <br />
                  <b>${coffee.price}</b>
                </h4>
                <div className="btn_display">
                  <button
                    className="btn_delete"
                    onClick={() => handleDeleteCoffee(coffee._id)}
                  >
                    Delete
                  </button>
                  <Link to={`/editcoffee/${coffee._id}`}>
                    <button className="btn_edit">Edit</button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Coffees;
