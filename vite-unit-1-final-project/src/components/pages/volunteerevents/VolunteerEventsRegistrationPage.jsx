import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "../../common/Button";
import ErrorPage from "../ErrorPage";
import GoBack from "../../common/GoBack";
import InputErrorMessage from "../../common/InputErrorMessage";

let errorMessages = {
  nameRequired: "Name is required.",
  emailRequired: "Email is required.",
  taskRequired: "At least 1 task required.",
};

const VolunteerEventsRegistrationPage = ({
  allVolunteerEvents,
  allVolunteerTasks,
  allVolunteerRegistrations,
  setAllVolunteerRegistrations,
}) => {
  const { eventId } = useParams();

  const [eventTasks, setEventTasks] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    selectedTasks: [],
  });

  const navigate = useNavigate();

  const handleGoToVolunteerEventsPage = () => {
    navigate("/volunteerevents");
  };

  /* find the available tasks */
  useEffect(() => {
    if (!eventId || !allVolunteerTasks) return;

    // Find tasks for this event
    let filteredTasks = allVolunteerTasks.filter(
      (task) => String(task.eventId) === eventId
    );

    // Remove tasks already registered for
    allVolunteerRegistrations.forEach((registration) => {
      registration.selectedTasks.forEach((taskId) => {
        filteredTasks = filteredTasks.filter((task) => task.taskId !== taskId);
      });
    });

    setEventTasks(filteredTasks);
  }, [eventId, allVolunteerTasks, allVolunteerRegistrations]);

  const eventWorkingOn =
    allVolunteerEvents.find((event) => String(event.eventId) === eventId) ||
    null;

  /* update the stateful variable formData */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* checking and unchecking a checkbox */
  const handleCheckboxChange = (taskId) => {
    setFormData((prev) => {
      const selected = prev.selectedTasks.includes(taskId)
        ? prev.selectedTasks.filter((id) => id !== taskId)
        : [...prev.selectedTasks, taskId];

      return { ...prev, selectedTasks: selected };
    });
  };

  /* look at checkboxes, if length zero then false, else true. also, name & email must be populated */
  const isFormComplete =
    formData.selectedTasks.length > 0 &&
    formData.name.trim() != "" &&
    formData.email.trim() != "";

  /*
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
*/

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormComplete) {
      setHasErrors(true);
    } else {
      const numberEventId = Number(eventId);

      const registrationData = {
        eventId: numberEventId,
        name: formData.name.trim(),
        email: formData.email.trim(),
        date: eventWorkingOn.date /* used for sorting */,
        selectedTasks: formData.selectedTasks,
      };

      const alreadyRegistered = allVolunteerRegistrations.some(
        (registration) => registration.eventId === registrationData.eventId
      );

      let sortedAllVolunteerRegistrations = [];

      if (alreadyRegistered) {
        /* adding additional task for event you are already registered for */

        const updatedAllVolunteerRegistrations = allVolunteerRegistrations.map(
          (event) => {
            /* check if the current registered event is the one we need to update */
            if (event.eventId === numberEventId) {
              return {
                ...event,
                selectedTasks: [
                  ...event.selectedTasks,
                  ...registrationData.selectedTasks,
                ],
              };
            } else {
              /* save the other registereed events as is */
              return event;
            }
          }
        );

        /* sort the registrations */
        sortedAllVolunteerRegistrations = [
          ...updatedAllVolunteerRegistrations,
        ].sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        /* adding event for the first time and the selected tasks, then sort the registrations */
        sortedAllVolunteerRegistrations = [
          ...allVolunteerRegistrations,
          registrationData,
        ].sort((a, b) => a.eventId - b.eventId);
      }

      /* save back to the stateful variable using setter */
      setAllVolunteerRegistrations(sortedAllVolunteerRegistrations);

      setFormData({
        name: "",
        email: "",
        selectedTasks: [],
      });

      setIsRegistered(true);
    }
  };

  const hasCheckboxes = eventTasks.length > 0;

  if (eventWorkingOn === null) {
    return (
      <ErrorPage>
        <p>Sorry, that volunteer event does not exist!</p>
        <GoBack
          text={"View All Volunteer Events"}
          handleClick={handleGoToVolunteerEventsPage}
        />
      </ErrorPage>
    );
  } else {
    return (
      <div className="registration-div">
        <div>
          <GoBack
            text={"View All Volunteer Events"}
            handleClick={handleGoToVolunteerEventsPage}
          />
        </div>

        <main className="registration-main">
          {isRegistered ? (
            <h3>Registration complete.</h3>
          ) : (
            <form>
              <fieldset>
                <h2>
                  Register for Event:{" "}
                  {eventWorkingOn ? eventWorkingOn.title : "Loading event..."}
                </h2>

                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required={true}
                  />
                </label>

                <InputErrorMessage
                  hasError={hasErrors && formData.name.trim() === ""}
                  msg={errorMessages["nameRequired"]}
                />

                <div>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required={true}
                    />
                  </label>

                  <InputErrorMessage
                    hasError={hasErrors && formData.email.trim() === ""}
                    msg={errorMessages["emailRequired"]}
                  />
                </div>

                <h3>Available Volunteer Tasks</h3>

                {eventTasks.length > 0 ? (
                  <div>
                    {eventTasks.map((task) => (
                      <div key={task.taskId}>
                        <label>
                          <input
                            type="checkbox"
                            name="selectedTasks"
                            checked={formData.selectedTasks.includes(
                              task.taskId
                            )}
                            onChange={() => handleCheckboxChange(task.taskId)}
                          />
                          {task.description}
                        </label>
                      </div>
                    ))}

                    <InputErrorMessage
                      hasError={
                        hasErrors && formData.selectedTasks.length === 0
                      }
                      msg={errorMessages["taskRequired"]}
                    />
                  </div>
                ) : (
                  <p>No tasks found for this event.</p>
                )}

                <Button
                  id={`submit-event-${eventId}`}
                  type="submit"
                  label="Register"
                  handleClick={handleSubmit}
                  classes={hasCheckboxes ? "btn-enabled" : "btn-disabled"}
                  disabled={!hasCheckboxes}
                />
              </fieldset>
            </form>
          )}
        </main>

        <aside className="registration-sidebar">
          <h5>{eventWorkingOn.title}</h5>
          <h6>{eventWorkingOn.description}</h6>
          <h6>{eventWorkingOn.getFormattedDate()}</h6>
          <h6>{eventWorkingOn.getFormattedTime()}</h6>
          <h6 className="criteria">{eventWorkingOn.criteria}</h6>
        </aside>
      </div>
    );
  }
};

export default VolunteerEventsRegistrationPage;
