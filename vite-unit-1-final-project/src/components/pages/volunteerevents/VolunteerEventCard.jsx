import Card from "../../common/Card";

const VolunteerEventCard = ({event}) => {

    return (
        <Card>
        <div className="event-card">    
            <div>
                <h5>{event.title}</h5>
                <h6>{event.description}</h6>
            </div>
            <div>
                <div className="date">{event.date}</div>
            </div>
            <div className="criteria">
                {event.criteria}
            </div>
        </div>    
        </Card>
    );

};

export default VolunteerEventCard;

