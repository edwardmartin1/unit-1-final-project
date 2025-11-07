import {Link} from "react-router";
import VolunteerEventCard from "./VolunteerEventCard.jsx";

const VolunteerEventsPage = ({volunteerEvents}) => {
    
    console.log("volunteerevents", volunteerEvents);

    let volunteerEventsJSX = [...volunteerEvents].map((event) => {
        return (
            <Link 
                to={"/volunteerevents/registration/" + event.eventId}
                key={event.eventId}>
                    <VolunteerEventCard /*key={event.eventId}*/ event={event} />;
            </Link>
        
        );
    });

    return (
        <main className="main-content">
            <h1>Volunteer Events</h1>
            {volunteerEvents.length ? (
                <div className="event-card-container">{volunteerEventsJSX}</div>
            ) : (
                <p>
                    <em>There are no volunteer events to display.</em>
                </p>
            )}
        </main>
    );


};

export default VolunteerEventsPage;

