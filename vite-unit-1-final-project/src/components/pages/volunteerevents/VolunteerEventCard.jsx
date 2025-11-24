import Card from "../../common/Card";

const VolunteerEventCard = ({ event }) => {
  return (
    <Card clickable={true}>
      <div>
        <div>
          <h5>{event.title}</h5>
          <p>{event.description}</p>
          <p>{event.getFormattedDate()}</p>
          <p>{event.getFormattedTime()}</p>
          <p className="criteria">{event.criteria}</p>
        </div>
      </div>
    </Card>
  );
};

export default VolunteerEventCard;
