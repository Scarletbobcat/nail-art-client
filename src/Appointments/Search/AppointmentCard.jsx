import PropTypes from "prop-types";

AppointmentCard.propTypes = {
  appointment: PropTypes.object,
  className: PropTypes.string,
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

export default function AppointmentCard({ appointment, className }) {
  return (
    <tr className={`text-center ${className}`}>
      <td className="">
        <p className="">{appointment.name}</p>
      </td>
      <td className="">
        <p>{appointment.phoneNumber}</p>
      </td>
      <td className="">
        <p>
          {new Date(
            appointment.date + appointment.startTime
          ).toLocaleTimeString("en-US")}
        </p>
      </td>

      <td className="">
        <p>
          {new Date(appointment.date + appointment.endTime).toLocaleTimeString(
            "en-US"
          )}
        </p>
      </td>
      <td className="">
        <p>{appointment.date}</p>
      </td>
      <td className="">
        <p>{appointment.employeeName}</p>
      </td>
      <td className="">
        <p>{appointment.services}</p>
      </td>
    </tr>
  );
}
