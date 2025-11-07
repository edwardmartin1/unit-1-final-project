

/*
const VolunteerEventsRegistrationPage = () => {

};

export default VolunteerEventsRegistrationPage;
*/

import {useState} from "react";
import {useParams} from "react-router";

const VolunteerEventsRegistrationPage = ({volunteerTasks, onRegister}) => {
  const {eventId} = useParams();
console.log("got into VolunteerEventsRegistrationPage");
  console.log("eventId", eventId);


  const eventTasks = volunteerTasks.filter((task) => task.eventId === eventId)

  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",    
    email: "",
    selectedTasks: [],
  });

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

  const handleSubmit = (event) => {
    event.preventDefault();

    const registrationData = {
      eventId,
      name: formData.name,
      email: formData.email,
      selectedTasks: formData.selectedTasks,
    };

    onRegister(registrationData);
    setFormData({name: "", email: "", selectedTasks:[]}); /* is this needed */



  };

  
  return (
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

      <button type="submit">Submit</button>   
    </form>
  );


};


export default VolunteerEventsRegistrationPage;






