import Card from "../../common/Card";

const VolunteerEventCard = ({ event }) => {
  //console.log("VolunteerEventCard event", event);
  return (
    <Card clickable={true}>
      <div className="event-card">
        <div>
          <h5>{event.title}</h5>
          <p>{event.description}</p>
          {/*
        </div>
        */}{" "}
          {/*
        <div>
          */}
          {/*<div className="date">{event.date}</div>*/}
          <p>{event.getFormattedDate()}</p>
          <p>{event.getFormattedTime()}</p>
          {/*
        </div>
        */}
          <p className="criteria">{event.criteria}</p>
        </div>
      </div>
    </Card>
  );
};

export default VolunteerEventCard;
