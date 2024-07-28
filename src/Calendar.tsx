import { useEffect, useState } from 'react';
import { DayPilotCalendar, DayPilot } from '@daypilot/daypilot-lite-react';

function Calendar() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/Employees").then(response => response.json()).then(data => setEmployees(data)).catch(error => console.log(error));
    }, []) 

    const [config, setConfig] = useState({
        viewType: "Resources",
        columns: employees,
    })

    return (
        <div>
        </div>
    )
}

export default Calendar;