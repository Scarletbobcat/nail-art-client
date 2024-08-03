import { useEffect, useState, useRef } from "react";
import "./Calendar.css";
import {
  DayPilotCalendar,
  DayPilot,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";

function Calendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [startDate, setStartDate] = useState(DayPilot.Date.today());

  // gets all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/Employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

  // gets all appointments for current date shown
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const date = startDate.toString().substring(0, 10);
        const response = await fetch(
          `http://localhost:8080/Appointments/date/${date}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
  }, [startDate]);

  return (
    <>
      <div id="header">
        <b>Day: </b>
        <button
          onClick={() => {
            setStartDate(startDate.addDays(-1));
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setStartDate(startDate.addDays(1));
          }}
        >
          Next
        </button>
      </div>
      <div id="calendar-container">
        <div id="navigator">
          <DayPilotNavigator
            selectMode={"Day"}
            showMonths={1}
            skipMonths={3}
            selectionDay={startDate}
            startDate={startDate}
            onTimeRangeSelected={(args) => setStartDate(args.day)}
          />
        </div>
        <div id="calendar">
          <DayPilotCalendar
            viewType="Resources"
            columns={employees}
            startDate={startDate}
            events={events.map((e, index) => {
              let services = "";
              console.log(e.services);
              e.services.forEach(s => {
                services = services + s + "\n";
              })
              return {
                id: index,
                resource: e.employeeId,
                start: e.date + e.startTime,
                end: e.date + e.endTime,
                text: e.name + "\n" + services + e.phoneNumber,
                barColor: employees.find((employee) => employee.id == e.employeeId)
                  .color,
              };
            })}
            ref={calendarRef}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
