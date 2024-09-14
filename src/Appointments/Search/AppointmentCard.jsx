import PropTypes from "prop-types";

AppointmentCard.propTypes = {
  appointment: PropTypes.object,
};

// appointment = {
//   name,
//   phoneNumber,
//   startTime,
//   endTime,
//   date,
//   employeeId,
//   services,
//   employeeName,
// }

export default function AppointmentCard({ appointment }) {
  return (
    <div className="p-4 border-2">
      <div className="flex">
        <p className="text-2xl">{appointment.name}</p>
      </div>
      <div className="flex">
        <p>{appointment.phoneNumber}</p>
      </div>
      <div className="flex">
        <p>Start time:</p>
        <p>
          {new Date(
            appointment.date + appointment.startTime
          ).toLocaleTimeString("en-US")}
        </p>
      </div>

      <div className="flex">
        <p>End time:</p>
        <p>
          {new Date(appointment.date + appointment.endTime).toLocaleTimeString(
            "en-US"
          )}
        </p>
      </div>
      <div className="flex">
        <p>Date:</p>
        <p>{appointment.date}</p>
      </div>
      <div className="flex">
        <p>Services:</p>
        <p>{appointment.services}</p>
      </div>
      <div className="flex">
        <p>Employee:</p>
        <p>{appointment.employeeName}</p>
      </div>
    </div>
  );
}
