
import {useState} from "react";
import {useParams, Link} from "react-router";

const VolunteerEventsRegistrationPage = ({allVolunteerTasks, allVolunteerRegistrations, onRegister}) => {
    const {eventId} = useParams();
    
    console.log("got into VolunteerEventsRegistrationPage");
    console.log("eventId", eventId);

    let eventTasks = [];
    eventTasks = allVolunteerTasks.filter((task) => String(task.eventId) === eventId)

console.log("eventTasks", eventTasks);    
//    console.log("here1");
//    if (allVolunteerTasks.length === 0) 
//    {
//        console.log("allVolunteerTasks is empty");
//    }
//    if (allVolunteerRegistrations.length === 0)
//    {
//        console.log("allVolunteerRegistrations is empty");
//    }


    allVolunteerRegistrations.forEach((registration) => {
        console.log("reg page - forEach registration");
        registration.selectedTasks.forEach((taskId) => {
            eventTasks = eventTasks.filter((task) => task.taskId !== taskId)
        });
console.log("eventTasks", eventTasks);
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

  /* length zero is false, all others is true */
  const isFormComplete = formData.selectedTasks.length && formData.name && formData.email;

  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (formData.selectedTasks.length > 0) 
    {
        let numberEventId = Number(eventId);
    
        const registrationData = {
            eventId: numberEventId,
            name: formData.name,
            email: formData.email,
            selectedTasks: formData.selectedTasks,
        };
//console.log("registrationData", registrationData);
        onRegister(registrationData);
        setIsRegistered(true);
    }
    else
    {

    }
    


 //   setFormData({name: "", email: "", selectedTasks:[]}); /* is this needed */



  };

  
  return (
    <div>
        <div>
            <Link to="/" className="back-link">Back to All Events</Link>
        </div>
    



    <div className="registration-form">
    {isRegistered ? (<h3>Registration complete.</h3>)
    :(

    <form onSubmit={handleSubmit}>
      <h2>Register for Event {eventId}</h2>

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






