
import {useState, useEffect} from "react";
import {useParams, useNavigate, Link} from "react-router";
import Button from "../../common/Button";
import ErrorPage from "../ErrorPage";
import GoBack from '../../common/GoBack';

const VolunteerEventsRegistrationPage = ({allVolunteerEvents,
                                          allVolunteerTasks, 
                                          allVolunteerRegistrations, 
                                          setAllVolunteerRegistrations}) => {

    //console.log("VolunteerEventsRegistrationPage.jsx allVolunteerEvents", allVolunteerEvents);
    //console.log("VolunteerEventsRegistrationPage.jsx allVolunteerTasks", allVolunteerTasks);



  const {eventId} = useParams();
    
//  console.log("got into VolunteerEventsRegistrationPage");
//  console.log("eventId", eventId);
//console.log("after using eventId");

  const [eventWorkingOn, setEventWorkingOn] = useState(null);
  const [eventTasks, setEventTasks] = useState([]);  
  const [isRegistered, setIsRegistered] = useState(false);
  
  useEffect(() => {
//    console.log("VolunteerEventsRegistrationPage mounted");

    const foundEvent = allVolunteerEvents.find((event) => 
      String(event.eventId) === eventId);
  
    setEventWorkingOn(foundEvent || null);
//    console.log("eventWorkingOn", eventWorkingOn);

  

  }, [eventId, allVolunteerEvents]);

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



//  console.log("finished looping through registrations");

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",    
    email: "",
    selectedTasks: [],
  });


  /* update the stateful variable formData using setter function setFormData */
  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleCheckboxChange = (taskId) => {
    setFormData((prev) => {
      const selected = prev.selectedTasks.includes(taskId)
      ? prev.selectedTasks.filter((id) => id !== taskId)
      : [...prev.selectedTasks, taskId];

      return {...prev, selectedTasks: selected};
    });
  };

  /* look at checkboxes, if length zero then false, else true. also, name & email must be populated */
  const isFormComplete = formData.selectedTasks.length && formData.name.trim() && formData.email.trim();


  const handleSubmit = (e) => {
    e.preventDefault();

    const numberEventId = Number(eventId);
    
    const registrationData = {
      eventId: numberEventId,
      name: formData.name.trim(),
      email: formData.email.trim(),
      date: eventWorkingOn.date,
      selectedTasks: formData.selectedTasks,
    };

    //console.log("registrationData", registrationData);
    
    
    const eventFound = 
      allVolunteerRegistrations.some((registration) => 
        registration.eventId === registrationData.eventId);
    
    let sortedAllVolunteerRegistrations = [];

    if (eventFound)
      
    {
      /* adding additional task for event you are already registered for */
      
      const updatedAllVolunteerRegistrations = allVolunteerRegistrations.map((event) => {
      /* check if the current registered event is the one we need to update */
        if (event.eventId === registrationData.eventId)
        {
          return {
            ...event, selectedTasks: [...event.selectedTasks, ...registrationData.selectedTasks]
          };
        }
        /* save the other registereed events as is */
        else
        {
          return event;
        }
      });
    
      /* sort the registrations */
      sortedAllVolunteerRegistrations = 
        [...updatedAllVolunteerRegistrations].sort((a, b) => new Date(a.date) - new Date(b.date));

    }
    else
    {
      /* adding event for the first time and the selected tasks, then sort the registrations */      
      sortedAllVolunteerRegistrations = 
        [...allVolunteerRegistrations, registrationData].sort((a, b) => a.eventId - b.eventId);

      }  

    /* save back to the stateful variable using setter */
    setAllVolunteerRegistrations(sortedAllVolunteerRegistrations);

    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      selectedTasks: [],
    });
    
    setIsRegistered(true);
  };

  const navigate = useNavigate();

  const handleGoToVolunteerEventsPage = () => {
        navigate("/volunteerevents");
  };


/* dont need this anymore
  const getEventDate = (eventId) => {
/ /        console.log(eventId);
        const event = allVolunteerEvents.find((event) => event.eventId === eventId);
        return event ? event.getFormattedDate() : eventId;
  };
*/



  if (eventWorkingOn === null)
  {
    console.log("VolunteerEventsRegistrationPage run ErrorPage");
    return (
      <ErrorPage>
        <p>Sorry, that volunteer event does not exist!</p>
         <GoBack text={'View All Volunteer Events'} handleClick={handleGoToVolunteerEventsPage} />
      </ErrorPage>
    )
    
  }
  else
  {

  
  return (
    <div>
      <div>
{/*          <Link to="/" className="back-link">Back to All Events</Link>   */}
          <GoBack text={'View All Volunteer Events'} handleClick={handleGoToVolunteerEventsPage} />

      </div>
    
      <div className="registration-form">
        {isRegistered 
          ? (<h3>Registration complete.</h3>)
          :(
            <form>
              <fieldset>
            {/*<form onSubmit={handleSubmit}>*/}
              <h2>Register for Event: {eventWorkingOn ? eventWorkingOn.title : "Loading event..."}</h2>
 {/*                  <h5>{getEventDate(eventWorkingOn.eventId)}</h5> */}   {/*{" - "}*/}
                 
                   <h5>{eventWorkingOn.getFormattedDate()}</h5>
 {/*                  <h5>{getEventTime(eventWorkingOn.eventId)}</h5>  */}

              <div>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>

              <h3>Available Volunteer Tasks</h3>

              {eventTasks.length > 0 ? 
                (
                  eventTasks.map((task) => 
                  (
                    <div key={task.taskId}>
                      <label>
                        <input
                          type="checkbox"
                          checked={formData.selectedTasks.includes(task.taskId)}
                          onChange={() => handleCheckboxChange(task.taskId)}
                        />
                        {task.description}
                      </label>
                    </div>
                  ))
                ) : 
                (
                  <p>No tasks found for this event.</p>      
                )
              }         


              <Button
                id={`submit-event-${eventId}`}
                type="submit"
                label="Register"
                classes={isFormComplete ? "btn-enabled" : "btn-disabled"}
                handleClick={handleSubmit}
                disabled={!isFormComplete}
              />
{/* 
              <button 
                type="submit"
                  disabled={!isFormComplete}
                  className={isFormComplete ? "btn-enabled" : "btn-disabled"}>
                  Submit

              </button>   
*/}  
              </fieldset>
            </form>
          )}

      </div>
    </div>      
  );
  }
};

export default VolunteerEventsRegistrationPage;

