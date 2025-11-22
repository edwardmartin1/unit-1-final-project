import { Link } from "react-router";
import VolunteerEventCard from "./VolunteerEventCard.jsx";

const VolunteerEventsPage = ({ allVolunteerEvents }) => {
  /* get the current system date and time */
  const now = new Date();

  // Filter to only show future events (date > now)
  const upcomingEvents = allVolunteerEvents.filter(
    (event) => new Date(event.date) > now
  );

  // Sort the remaining events by date/time
  const sortedEvents = [...upcomingEvents].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let allVolunteerEventsJSX = [...sortedEvents].map((event, index) => {
    return (
      <Link
        to={"/volunteerevents/registration/" + event.eventId}
        key={event.eventId ?? index}
      >
        <VolunteerEventCard event={event} />
      </Link>
    );
  });

  return (
    <main className="main-content">
      <h1>Volunteer Events</h1>
      {sortedEvents.length ? (
        <div className="event-card-container">{allVolunteerEventsJSX}</div>
      ) : (
        <p>
          <em>There are no volunteer events to display.</em>
        </p>
      )}
    </main>
  );
};

export default VolunteerEventsPage;
