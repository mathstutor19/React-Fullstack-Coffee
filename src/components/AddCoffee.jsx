import React, { useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addCoffees } from "../features/coffeeSlice";
import { useNavigate } from "react-router-dom";
const AddCoffee = () => {
  const [form, setForm] = useState({
    name: "",
    quantity: 0,
    price: 0,
    size: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCoffees(form));
    setForm({
      name: "",
      quantity: 0,
      price: 0,
      size: "",
      image: "",
    });
    navigate("/");
  };
  return (
    <div>
      <Header />
      <div className="container">
        <h3 className="text-center">Add new coffee</h3>
        <form onSubmit={handleSubmit} action="">
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              className="form-control"
              id="quantity"
              value={form.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={form.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="size">Size</label>
            <input
              type="text"
              className="form-control"
              id="size"
              value={form.size}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              className="form-control"
              id="image"
              value={form.image}
              onChange={handleChange}
            />
          </div>
          <button className="btn" type="submit" style={{ background: "green" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoffee;
