import { useState, useEffect } from "react";

export default function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState([]);

  // gets all employees
  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:8080/Employees");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const getAppointments = async (phoneNumber) => {
    try {
      const response = await fetch(
        `http://localhost:8080/Appointments/Search/${phoneNumber}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  function changePhoneNumber(inputPhoneNumber) {
    const regex = /^\d{0,3}[\s-]?\d{0,3}[\s-]?\d{0,4}$/;
    if (regex.test(inputPhoneNumber)) {
      var newPN = inputPhoneNumber;
      // conditionally adds hyphen only when adding to phone number, not deleting
      if (
        (newPN.length === 3 && phoneNumber.length === 2) ||
        (newPN.length === 7 && phoneNumber.length === 6)
      ) {
        newPN += "-";
      }
      // setFormData({ ...formData, phoneNumber: newPN });
      setPhoneNumber(newPN);
    } else {
      console.error("Phone number does not match regex");
    }
  }

  return (
    <>
      {/* header */}
      <div className="ring-1 ring-black inline-block relative h-12 justify-center m-4 rounded-3xl">
        <input
          type="text"
          value={phoneNumber}
          placeholder="Enter phone number..."
          onChange={(e) => {
            changePhoneNumber(e.target.value);
          }}
          className="w-full h-full ps-2 rounded-3xl"
        />
        <button
          onClick={() => {
            getAppointments(phoneNumber);
          }}
          className="h-full w-12 absolute right transition rounded-full bg-red-500 content-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="100%"
            height="100%"
            viewBox="0 0 24 24"
            className="curser-pointer"
          >
            <path d="M22 20L20 22 14 16 14 14 16 14z"></path>
            <path d="M9,16c-3.9,0-7-3.1-7-7c0-3.9,3.1-7,7-7c3.9,0,7,3.1,7,7C16,12.9,12.9,16,9,16z M9,4C6.2,4,4,6.2,4,9c0,2.8,2.2,5,5,5 c2.8,0,5-2.2,5-5C14,6.2,11.8,4,9,4z"></path>
            <path
              d="M13.7 12.5H14.7V16H13.7z"
              transform="rotate(-44.992 14.25 14.25)"
            ></path>
          </svg>
        </button>
      </div>
      {/* content */}
      <div className="p-4">
        <table className="w-full table-fixed border-2">
          <thead>
            <tr className="border-y-2 justify-between">
              <th>Name</th>
              <th>Phone Number</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Date</th>
              <th>Employee</th>
              <th>Services</th>
            </tr>
          </thead>
          <tbody>
            {data.map((appointment, index) => {
              return (
                <tr key={index} className="odd:bg-gray-200">
                  <td className="text-center">{appointment.name}</td>
                  <td className="text-center">{appointment.phoneNumber}</td>
                  <td className="text-center">
                    {new Date(
                      appointment.date + appointment.startTime
                    ).toLocaleTimeString("en-US")}
                  </td>
                  <td className="text-center">
                    {new Date(
                      appointment.date + appointment.endTime
                    ).toLocaleTimeString("en-US")}
                  </td>
                  <td className="text-center">{appointment.date}</td>
                  <td className="text-center">
                    {
                      employees.find(
                        (employee) => employee.id == appointment.employeeId
                      ).name
                    }
                  </td>
                  <td className="text-center">
                    {appointment.services.map((s, index) => {
                      return (
                        <span key={index}>
                          <p>{s}</p>
                        </span>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
