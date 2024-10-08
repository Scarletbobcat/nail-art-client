import Calendar from "./Appointments/Calendar/Appointments.jsx";
import Home from "./Home/Home.jsx";
import Employees from "./Employees/Employees.jsx";
import Services from "./Services/Services.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import Search from "./Appointments/Search/Search.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Appointments" element={<Calendar />} />
          <Route path="/Employees" element={<Employees />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/Appointments/Search" element={<Search />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
