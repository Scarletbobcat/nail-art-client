import PropTypes from "prop-types";

AppointmentCard.propTypes = {
  appointment: PropTypes.object,
};

export default function AppointmentCard({ appointment }) {
  return (
    <div>
      <ul>
        <li>{appointment.name}</li>
      </ul>
    </div>
  );
}
