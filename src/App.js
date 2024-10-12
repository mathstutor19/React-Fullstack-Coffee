import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddCoffee from "./components/AddCoffee";
import Coffees from "./components/Coffees";
import EditCoffeeDetail from "./components/EditCoffeeDetail";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Coffees />}></Route>
          <Route path="/addcoffee" element={<AddCoffee />}></Route>
          <Route path="/editcoffee/:id" element={<EditCoffeeDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
