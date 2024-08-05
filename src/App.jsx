import Calendar from "./Calendar/Calendar.jsx";
import Home from "./Home/Home.jsx";
import Employees from "./Employees/Employees.jsx";
import Services from "./Services/Services.jsx";
import Navbar from "./Navbar/Navbar.jsx";
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
