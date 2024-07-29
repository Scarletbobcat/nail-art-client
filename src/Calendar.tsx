import { useEffect, useState } from 'react';
import { DayPilotCalendar, DayPilot } from '@daypilot/daypilot-lite-react';

interface Employee {
    "employeeID": number,
    "employeeName": string,
}

function Calendar() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployees, setNewEmployees] = useState<DayPilot.CalendarColumnData[]>([]);

    // fetching the employees data
    useEffect(() => {
        // function that gets all employees
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/Employees");
                console.log("Data recieved");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Employee[] = await response.json();
                setEmployees(data);
            } catch(error) {
                console.log(error);
            }
        };
        
        fetchEmployees();

        // printing to console for debugging
        console.log(employees);
    })

    // this will update newEmployees when employees is populated with data
    useEffect(() => {
        // maps employee fields to fields for columns of calendar
        setNewEmployees(employees.map((e) => {
            return {
                "id": e.employeeID,
                "name": e.employeeName,
            }
        }));
    }, [employees])

    return (
        <div>
            <DayPilotCalendar 
                viewType="Resources"
                columns={newEmployees}
                startDate={DayPilot.Date.today()}
            />
        </div>
    )
}

export default Calendar;