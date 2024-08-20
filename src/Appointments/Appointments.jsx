import { useEffect, useState, useRef } from "react";
import "./Appointments.css";
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
  const [appStart, setAppStart] = useState('');
  const [appEnd, setAppEnd] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState('');

  var today = new Date(startDate.toString());
  useEffect(() => {
    console.log('events:', events);
  }, [events])
  useEffect(() => {
    console.log('employees:', employees);
  }, [employees])
  useEffect(() => {
    console.log('selectedAppointment:', selectedAppointment);
  }, [selectedAppointment])
  useEffect(() => {
    console.log('selectedEmployee:', selectedEmployee);
  }, [selectedEmployee])
  

  // gets all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("http://localhost:8080/Services");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchServices();
  }, []);

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
      <div id="header" className="flex justify-center m-2 border-2 rounded-lg">
        <div id="current-day" className="mx-2 p-2 content-center">
          <p>
            {"Date: " + today.toDateString()}
          </p>
        </div>
        <div id="daySelector">
          <button className="size-11 mx-2 p-2 rounded-full active:bg-slate-100"
            onClick={() => {
              setStartDate(startDate.addDays(-1));
            }}
          >
            &#10229;
          </button>
          <b className="p-2 content-center">Day</b>
          <button className="size-11 mx-2 p-2 rounded-full active:bg-slate-100"
            onClick={() => {
              setStartDate(startDate.addDays(1));
            }}
          >
            &#10230;
          </button>
        </div>
      </div>
      { isCreateModalOpen ?
          <AppointmentCreateModal services={services.map((s) => {
            return {
              label: s.name,
              value: s.id,
            }
          })}
          isModalOpen={isCreateModalOpen}
          start={appStart}
          end={appEnd}
          onClose={() => {
            setIsCreateModalOpen(false);
          }}
          employeeId={selectedEmployee}
          employeeName={employees.find((employee) => employee.id == selectedEmployee).name}
          />
      : null }
      {isEditModalOpen && (
        <AppointmentEditModal 
          services={services.map(s => ({ label: s.name, value: s.id }))}
          isModalOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          appointmentId={selectedAppointment}
          employeeId={selectedEmployee}
          employeeName={employees.find(employee => employee.id === selectedEmployee)?.name || 'Unknown'}
          start={appStart}
          end={appEnd}
          inputName={events.find(event => event.id === selectedAppointment)?.name || 'Unknown'}
        />
      )}
      <div id="calendar-container">
        <div id="navigator">
          <DayPilotNavigator
            selectMode={"Day"}
            showMonths={1}
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
            eventMoveHandling="Disabled"
            events={events.map((e) => {
              let services = "";
              e.services.forEach(s => {
                services = services + s + "\n";
              })
              return {
                id: e.id,
                resource: e.employeeId,
                start: e.date + e.startTime,
                end: e.date + e.endTime,
                text: e.name + "\n" + services + e.phoneNumber,
                barColor: employees.find((employee) => employee.id == e.employeeId)
                  .color,
              };
            })}
            ref={calendarRef}
            onTimeRangeSelected={(args) => {
              setIsCreateModalOpen(true)
              setAppStart(args.start.value)
              setAppEnd(args.end.value)
              setSelectedEmployee(args.resource)
            }}
            onEventClick={(args) => {
              if (args.e){
                setIsEditModalOpen(true)
                setSelectedEmployee(args.e.resource)
                setSelectedAppointment(args.e.id())
              } else {
                console.log("EVENT DATA IS NOT AVAILABLE")
              }
            }}
            businessBeginsHour={10}
            businessEndsHour={19}
          />
        </div>
      </div>
    </>
  );
}

export default Calendar;
