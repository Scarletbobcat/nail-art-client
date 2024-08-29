import { useEffect, useState, useRef } from "react";
import {
  DayPilotCalendar,
  DayPilot,
  DayPilotNavigator,
} from "@daypilot/daypilot-lite-react";
import AppointmentCreateModal from "./AppointmentCreateModal";
import AppointmentEditModal from "./AppointmentEditModal";

function Calendar() {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [services, setServices] = useState([]);
  const [startDate, setStartDate] = useState(DayPilot.Date.today());
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [appStart, setAppStart] = useState("");
  const [appEnd, setAppEnd] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);

  var today = new Date(startDate.toString());

  // gets all services
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8080/Services");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchServices();
  }, []);

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

  // gets all appointments for current date shown
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
      console.error(error);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, [startDate]);

  return (
    <>
      <div
        id="header"
        className="flex p-2.5 justify-center m-2 border-2 rounded-lg bg-white"
      >
        <div id="current-day" className="mx-2 p-2 content-center">
          <p>{"Date: " + today.toDateString()}</p>
        </div>
        <div id="daySelector">
          <button
            className="size-11 mx-2 p-2 rounded-full active:bg-slate-100"
            onClick={() => {
              setStartDate(startDate.addDays(-1));
            }}
          >
            &#10229;
          </button>
          <b className="p-2 content-center">Day</b>
          <button
            className="size-11 mx-2 p-2 rounded-full active:bg-slate-100"
            onClick={() => {
              setStartDate(startDate.addDays(1));
            }}
          >
            &#10230;
          </button>
        </div>
      </div>
      {isCreateModalOpen ? (
        <AppointmentCreateModal
          services={services.map((s) => {
            return {
              label: s.name,
              value: s.id,
            };
          })}
          isModalOpen={isCreateModalOpen}
          start={appStart}
          end={appEnd}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          renderEvents={() => {
            fetchAppointments();
          }}
          employeeId={selectedEmployee}
          employeeName={
            employees.find((employee) => employee.id == selectedEmployee).name
          }
        />
      ) : null}
      {isEditModalOpen ? (
        <AppointmentEditModal
          allServices={services.map((s) => ({ label: s.name, value: s.id }))}
          isModalOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          appointmentId={selectedAppointment}
          employeeId={selectedEmployee}
          employeeName={
            employees.find((employee) => employee.id === selectedEmployee)
              ?.name || "Unknown"
          }
          start={appStart}
          end={appEnd}
          inputName={
            events.find((event) => event.id === selectedAppointment)?.name ||
            "Unknown"
          }
          renderEvents={() => {
            fetchAppointments();
          }}
          allEmployees={employees.map((e) => {
            return {
              value: e.id,
              label: e.name,
            };
          })}
          inputPhoneNumber={selectedPhoneNumber}
          selectedServices={selectedServices}
        />
      ) : null}
      <div id="calendar-container" className="flex">
        <div id="navigator" className="p-2.5">
          <DayPilotNavigator
            selectMode={"Day"}
            showMonths={1}
            selectionDay={startDate}
            startDate={startDate}
            onTimeRangeSelected={(args) => setStartDate(args.day)}
          />
        </div>
        <div id="calendar" className="p-2.5">
          <DayPilotCalendar
            viewType="Resources"
            columns={employees}
            startDate={startDate}
            eventMoveHandling="Disabled"
            events={events.map((e) => {
              let services = "";
              e.services.forEach((s) => {
                services = services + s + "\n";
              });
              return {
                id: e.id,
                resource: e.employeeId,
                start: e.date + e.startTime,
                end: e.date + e.endTime,
                text: e.name + "\n" + services + e.phoneNumber,
                barColor:
                  employees.find((employee) => employee.id == e.employeeId)
                    ?.color || "#000000",
              };
            })}
            ref={calendarRef}
            onTimeRangeSelected={(args) => {
              setIsCreateModalOpen(true);
              setAppStart(args.start.value);
              setAppEnd(args.end.value);
              setSelectedEmployee(args.resource);
            }}
            onEventClick={(args) => {
              const eventId = args.e.id();
              const employeeId = args.e.resource();
              const text = args.e.data.text.split("\n");
              const phoneNumber = text.at(-1);
              const tempServices = text.slice(1, text.length - 1).map((s) => ({
                label: s,
                value: services.find((service) => service.name == s).id,
              }));
              setIsEditModalOpen(true);
              setAppStart(args.e.start().toString());
              setAppEnd(args.e.end().toString());
              setSelectedServices(tempServices);
              setSelectedEmployee(employeeId);
              setSelectedAppointment(eventId);
              setSelectedPhoneNumber(phoneNumber);
            }}
            businessBeginsHour={10}
            businessEndsHour={19}
            eventResizeHandling="Disabled"
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
