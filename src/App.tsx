import Calendar from "./Calendar/Calendar.tsx";
import Home from "./Home/Home.tsx";
import Employees from "./Employees/Employees.tsx";
import Services from "./Services/Services.tsx";
import Navbar from "./Navbar/Navbar.tsx";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Calendar" element={<Calendar />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Services" element={<Services />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
