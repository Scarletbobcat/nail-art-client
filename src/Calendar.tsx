import { useEffect, useState } from 'react';
import { DayPilotCalendar, DayPilot } from '@daypilot/daypilot-lite-react';

interface Employee {
    "employeeID": number,
    "employeeName": string,
}

function Calendar() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [newEmployees, setNewEmployees] = useState<DayPilot.CalendarColumnData[]>([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8080/Employees");
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
        setNewEmployees(employees.map((e) => {
            return {
                "id": e.employeeID,
                "name": e.employeeName,
            }
        }));
        console.log(employees);
        console.log(newEmployees);
        
    },[])




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