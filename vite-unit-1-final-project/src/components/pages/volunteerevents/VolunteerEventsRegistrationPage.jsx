
import {useState, useEffect} from "react";
import {useParams, Link} from "react-router";

const VolunteerEventsRegistrationPage = ({allVolunteerEvents,
                                          allVolunteerTasks, 
                                          allVolunteerRegistrations, 
                                          setAllVolunteerRegistrations}) => {
  const {eventId} = useParams();
    
  console.log("got into VolunteerEventsRegistrationPage");
  console.log("eventId", eventId);

  let eventWorkingOn = {};
  /*
  useEffect(() => {
    eventWorkingOn = 
    allVolunteerEvents.find((event) => 
      String(event.eventId) === eventId);
  }, []);
*/
  eventWorkingOn = 
    allVolunteerEvents.find((event) => 
      event.eventId === Number(eventId));


    

  console.log("eventWorkingOn", eventWorkingOn);
/*
useEffect(() => {
    setAllVolunteerEvents(mockVolunteerEvents);
    setAllVolunteerTasks(mockVolunteerTasks);
    
  }, []);
*/

  let eventTasks = [];
  eventTasks = allVolunteerTasks.filter((task) => String(task.eventId) === eventId)

  console.log("eventTasks1", eventTasks);    



  allVolunteerRegistrations.forEach((registration) => {
    console.log("reg page - forEach registration");
  
    registration.selectedTasks.forEach((taskId) => {
      eventTasks = eventTasks.filter((task) => task.taskId !== taskId)
    });

    console.log("eventTasks2", eventTasks);
  });
  
  console.log("finished looping through registrations");

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",    
    email: "",
    selectedTasks: [],
  });

  const[isRegistered, setIsRegistered] = useState(false);

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

  /* look at checkboxes, if length zero then false, else true, name & email must be populated */
  const isFormComplete = formData.selectedTasks.length && formData.name && formData.email;


  const handleSubmit = (e) => {
    e.preventDefault();

    let numberEventId = Number(eventId);
    
    const registrationData = {
      eventId: numberEventId,
      name: formData.name,
      email: formData.email,
      selectedTasks: formData.selectedTasks,
    };

    //console.log("registrationData", registrationData);
    //onRegister(registrationData);
    
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
    
      /* sort the registrations before */
      sortedAllVolunteerRegistrations = 
        [...updatedAllVolunteerRegistrations].sort((a, b) => a.eventId - b.eventId);
    }
    else
    {
      /* adding event for the first time and the selected tasks */
      sortedAllVolunteerRegistrations = 
        [...allVolunteerRegistrations, registrationData].sort((a, b) => a.eventId - b.eventId);
    }  

    /* save back to the stateful variable using setter */
    setAllVolunteerRegistrations(sortedAllVolunteerRegistrations);

    setIsRegistered(true);
    
    console.log("here in App.jsx");
  
  };


  
  return (
    <div>
      <div>
          <Link to="/" className="back-link">Back to All Events</Link>
      </div>
    
      <div className="registration-form">
        {isRegistered 
          ? (<h3>Registration complete.</h3>)
          :(

            <form onSubmit={handleSubmit}>
              <h2>Register for Event: {eventWorkingOn && eventWorkingOn.title}</h2>

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

              <button 
                type="submit"
                  disabled={!isFormComplete}
                  className={isFormComplete ? "btn-enabled" : "btn-disabled"}>
                  Submit
              </button>   
            </form>
          )}

      </div>
    </div>      
  );
};

export default VolunteerEventsRegistrationPage;

