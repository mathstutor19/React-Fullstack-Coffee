import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCoffee } from "../features/coffeeSlice";
import Header from "./Header";
const EditCoffeeDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    size: "",
    price: 0,
    image: "",
    quantity: 0,
  });
  const coffeeData = useSelector((state) => state.coffees.coffees);
  useEffect(() => {
    if (id) {
      const data = coffeeData.filter((c) => c._id === id);
      setForm({ ...data[0] });
    }
  }, [id, coffeeData]);
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateCoffee({ ...form, id }));
    navigate("/");
  };
  const handleChange = (event) => {
    event.preventDefault();
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <Header />
      <div>
        <h2 className="text-center">Edit Coffee</h2>
        <form action="" onSubmit={handleUpdate}>
          <div className="container">
            <div className="display">
              <img src={form.image || ""} alt="edit coffee" width={"30%"} />
            </div>
            <br />
            <h4>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name || ""}
                onChange={handleChange}
              />
              <br />
              <br />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                name="price"
                value={form.price || ""}
                onChange={handleChange}
              />
              <br />
              <br />
              <label htmlFor="size">Size:</label>
              <input
                type="text"
                name="size"
                value={form.size || ""}
                onChange={handleChange}
              />
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="text"
                name="quantity"
                value={form.quantity || ""}
                onChange={handleChange}
              />
            </h4>
            <div className="btn_display">
              <button type="submit" className="btn">
                Save Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCoffeeDetail;
