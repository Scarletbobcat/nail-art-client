import { useState, useEffect, useMemo } from "react";
import { Box, TextField, InputAdornment, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [tempData, setTempData] = useState([]);
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
      setTempData(data);
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
      setPhoneNumber(newPN);
    } else {
      console.error("Phone number does not match regex");
    }
  }

  // header of table
  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "phoneNumber", headerName: "Phone Number", width: 150 },
    { field: "startTime", headerName: "Start", width: 150 },
    { field: "endTime", headerName: "End", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "employee", headerName: "Employee", width: 150 },
    {
      field: "services",
      headerName: "Services",
      flex: 1,
      // this is what is rendered in the cell if wanted to change in the future
      // (maybe change so multiple services is easier to read)
      // renderCell: (s) => {
      //   return s.value;
      // },
    },
  ];

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      getAppointments(phoneNumber);
    }
  };

  // this makes the appointment data being fetched match the table
  const data = useMemo(() => {
    return tempData.map((row) => {
      return {
        id: row.id,
        name: row.name,
        phoneNumber: row.phoneNumber,
        startTime: new Date(row.date + row.startTime).toLocaleTimeString(
          "en-US"
        ),
        endTime: new Date(row.date + row.endTime).toLocaleTimeString("en-US"),
        date: row.date,
        employee: employees.find((employee) => employee.id == row.employeeId)
          .name,
        services: row.services.map((s) => {
          return s;
        }),
      };
    });
  }, [tempData, employees]);

  return (
    <>
      {/* header */}
      <TextField
        label="Phone Number"
        sx={{ m: 1, width: "25ch" }}
        onChange={(e) => changePhoneNumber(e.target.value)}
        onKeyDown={handleKeyDown}
        value={phoneNumber}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => getAppointments(phoneNumber)}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {/* content */}
      <div className="p-4">
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </>
  );
}
