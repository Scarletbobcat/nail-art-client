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

interface Appointment {
  appointmentId: number;
  employeeId: number;
  serviceId: number;
  date: string;
  startTime: string;
  endTime: string;
  name: string;
  phoneNumber: string;
}

interface Events {
  id: number;
  start: string;
  end: string;
  resource: number;
  text: string;
}

const colors: { [key: number]: string } = {
  0: "#ff8585",
  1: "#ffb485",
  2: "#fbff85",
  3: "#9dff85",
  4: "#85ccff",
  5: "#d885ff",
};

function Calendar() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployees, setNewEmployees] = useState<
    DayPilot.CalendarColumnData[]
  >([]);
  const [events, setEvents] = useState<Appointment[]>([]);
  const [newEvents, setNewEvents] = useState<Events[]>([]);
  const [startDate, setStartDate] = useState(DayPilot.Date.today());

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
        const data: Appointment[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppointments();
  }, [startDate]);

  useEffect(() => {
    setNewEvents(
      events.map((event) => {
        const startTime = event.startTime.substring(0, 8);
        const endTime = event.endTime.substring(0, 8);
        return {
          id: event.appointmentId,
          start: event.date + "T" + startTime,
          end: event.date + "T" + endTime,
          resource: event.employeeId,
          text: event.name + ", \n" + event.phoneNumber,
          barColor: colors[(event.employeeId % 6) + 1],
        };
      })
    );
  }, [events]);

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
            columns={newEmployees}
            startDate={startDate}
            events={newEvents}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
