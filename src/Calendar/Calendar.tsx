import { useEffect, useState } from "react";
import "./Calendar.css";
import {
  DayPilotCalendar,
  DayPilot,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";

interface Employee {
  employeeID: number;
  employeeName: string;
}

function Calendar() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployees, setNewEmployees] = useState<
    DayPilot.CalendarColumnData[]
  >([]);
  const [startDate, setStartDate] = useState(DayPilot.Date.today());

  // fetching the employees data
  useEffect(() => {
    // function that gets all employees
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/Employees");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Employee[] = await response.json();
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

  // this will update newEmployees when employees is populated with data
  useEffect(() => {
    // maps employee fields to fields for columns of calendar
    setNewEmployees(
      employees.map((e) => {
        return {
          id: e.employeeID,
          name: e.employeeName,
        };
      })
    );
  }, [employees]);

  return (
    <>
      <div id="header">
        <b>Day:</b>
        <button
          onClick={() => {
            setStartDate(startDate.addDays(1));
          }}
        >
          Next
        </button>
        <button
          onClick={() => {
            setStartDate(startDate.addDays(-1));
          }}
        >
          Previous
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
            columns={newEmployees}
            startDate={startDate}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
