import Select from "react-select";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Banner from "./Banner.jsx";

AppointmentCreateModal.propTypes = {
  services: PropTypes.array,
  isModalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  start: PropTypes.string,
  end: PropTypes.string,
  employeeId: PropTypes.number,
  employeeName: PropTypes.string,
};

function AppointmentCreateModal({
  services,
  isModalOpen,
  onClose,
  start,
  end,
  employeeId,
  employeeName,
}) {
  const [showBanner, setShowBanner] = useState(false);
  const [bannerColor, setBannerColor] = useState("");
  const [errors, setErrors] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    startTime: start.substring(10),
    endTime: end.substring(10),
    date: start.substring(0, 10),
    employeeId: employeeId,
    services: [],
  });

  const startTime = new Date(start.toString());
  const endTime = new Date(end.toString());

  useEffect(() => {
    setErrors([]);
    setShowBanner(false);
  }, [formData]);

  function validateData(formData) {
    const newErrors = [];
    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    if (formData.name === "") {
      newErrors.push("Please enter a name.");
    }
    if (formData.phoneNumber === "") {
      newErrors.push("Please enter a phone number.");
    } else if (!regex.test(formData.phoneNumber)) {
      newErrors.push("Please enter a valid phone number.");
    }
    if (formData.services.length === 0) {
      newErrors.push("Please select at least one service.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }

  function changeServices(selectedServices) {
    const newServices = selectedServices.map((s) => {
      return s.label;
    });

    setFormData({ ...formData, services: newServices });
  }

  function changeName(inputName) {
    const newName = inputName;
    setFormData({ ...formData, name: newName });
  }

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
      setFormData({ ...formData, phoneNumber: newPN });
      setPhoneNumber(newPN);
    } else {
      console.error("Phone number does not match regex");
    }
  }

  const createAppointment = async (appointment) => {
    try {
      const response = await fetch(
        "http://localhost:8080/Appointments/Create",
        {
          method: "POST",
          body: JSON.stringify(appointment),
          headers: {
            "Content-Type": "application/json", // Indicate that the request body is JSON
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network error has occurred");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveChanges = async () => {
    const isValid = validateData(formData);

    if (isValid) {
      try {
        await createAppointment(formData);
        onClose(); // Close the modal if the appointment is created successfully
      } catch (error) {
        alert(error);
        // Handle error if needed
      }
    } else {
      setBannerColor("bg-red-500");
      setShowBanner(true);
    }
  };

  return (
    <>
      {isModalOpen ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {showBanner ? (
                <Banner
                  color={bannerColor}
                  errors={errors}
                  closeBanner={() => setShowBanner(false)}
                />
              ) : null}
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Create an Appointment
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={onClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="grid grid-cols-2 p-6 gap-6 place-items-center">
                  <label>Name</label>
                  <input
                    id="name"
                    onChange={(e) => {
                      changeName(e.target.value);
                    }}
                    className="border-2 w-full ps-2 rounded"
                    required
                    placeholder="Tien"
                  />
                  <label>Services</label>
                  <Select
                    id="services"
                    isMulti
                    options={services}
                    onChange={changeServices}
                    className="text-black w-full"
                    required
                  />
                  <label>Phone Number</label>
                  <input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      changePhoneNumber(e.target.value);
                    }}
                    className="border-2 w-full ps-2 rounded"
                    required
                    placeholder="330-423-9103"
                  />
                  <p>Start time</p>
                  <p>{startTime.toLocaleTimeString("en-us")}</p>
                  <p>End time</p>
                  <p>{endTime.toLocaleTimeString("en-us")}</p>
                  <p>Employee</p>
                  <p>{employeeName}</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AppointmentCreateModal;
