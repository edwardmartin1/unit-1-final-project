import Card from "../../common/Card";

const VolunteerEventCard = ({event}) => {

    
//console.log("VolunteerEventCard event", event);
    return (
        <Card clickable={true}>
        <div className="event-card">    
            <div>
                <h5>{event.title}</h5>
                <h6>{event.description}</h6>
            </div>
            <div>
                {/*<div className="date">{event.date}</div>*/}  
                <div>{event.getFormattedDate()}</div>
                <div>{event.getFormattedTime()}</div>
            </div>
            <div className="criteria">
                {event.criteria}
            </div>
        </div>    
        </Card>
    );

};

export default VolunteerEventCard;

