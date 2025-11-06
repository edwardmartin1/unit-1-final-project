import VolunteerEventCard from "./VolunteerEventCard.jsx";

const VolunteerEventsPage = ({volunteerEvents}) => {
    
    console.log("volunteerevents", volunteerEvents);

    let volunteerEventsJSX = volunteerEvents.map((event) => {
        return <VolunteerEventCard key={event.eventId} event={event} />;
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

