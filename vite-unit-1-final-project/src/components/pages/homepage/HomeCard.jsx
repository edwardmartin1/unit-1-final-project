import Card from "../../common/Card";
import Button from "../../common/Button";

const HomeCard = ({
  registration,
  idx,
  allVolunteerEvents,
  allVolunteerTasks,
  setAllVolunteerRegistrations,
}) => {
  const handleCancelTask = (registrationIndex, taskId) => {
    setAllVolunteerRegistrations((prev) => {
      return prev
        .map((registration, idx) => {
          if (idx !== registrationIndex) return registration;

          const updatedTasks = registration.selectedTasks.filter(
            (id) => id !== taskId
          );

          /* if removing the final registered task for an event then remove the entire event */
          if (updatedTasks.length === 0) return null;
          return { ...registration, selectedTasks: updatedTasks };
        })
        .filter(Boolean);
    });
  };

  const getTaskDescription = (taskId) => {
    const task = allVolunteerTasks.find((task) => task.taskId === taskId);
    return task ? task.description : taskId;
  };

  const getEventDate = (eventId) => {
    const event = allVolunteerEvents.find((event) => event.eventId === eventId);
    return event ? event.getFormattedDate() : eventId;
  };

  const getEventTitle = (eventId) => {
    const event = allVolunteerEvents.find((event) => event.eventId === eventId);
    return event ? event.title : eventId;
  };

  return (
    <Card clickable={false}>
      <div>
        <div key={idx}>
          <h5>{getEventDate(registration.eventId)}</h5>
          <h6>{getEventTitle(registration.eventId)}</h6>
          <ul className="homepage-ul">
            {registration.selectedTasks.map((taskId) => (
              <li key={taskId}>
                <Button
                  id={`cancel-event-${idx}`}
                  type="button"
                  label="Cancel"
                  classes=""
                  handleClick={() => handleCancelTask(idx, taskId)}
                  disabled={false}
                />{" "}
                {getTaskDescription(taskId)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default HomeCard;
