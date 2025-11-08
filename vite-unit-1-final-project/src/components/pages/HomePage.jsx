import {Link} from "react-router";

const HomePage = ({allVolunteerRegistrations, 
                    setAllVolunteerRegistrations, 
                    allVolunteerEvents, 
                    allVolunteerTasks}) => {

console.log("allVolunteerRegistrations", allVolunteerRegistrations);
/*
  const event = allEvents.filter((event) => event.eventId === eventId)
*/


  const handleCancelTask = (registrationIndex, taskId) => {
    setAllVolunteerRegistrations((prev) => {
      return prev.map((registration, idx) => {
        if (idx !== registrationIndex) return registration;
        
        const updatedTasks = registration.selectedTasks.filter((id) => id !== taskId);

        /* if removing the final task for an event then remove the entire event */
        if (updatedTasks.length === 0) return null;
        return {...registration, selectedTasks: updatedTasks};
      }).filter(Boolean);
 
    });


  };

  const getTaskDescription = (taskId) => {
    const task = allVolunteerTasks.find((task) => task.taskId === taskId); /* either update the taskId's or try to add task.eventId === eventide && ... */
    return task ? task.description : taskId;  /* maybe the or should just return blank */
  };

  const getEventDate = (eventId) => {
    console.log(eventId);
    const event = allVolunteerEvents.find((event) => event.eventId === eventId);
    return event ? event.date : eventId;
  };

  const getEventTitle = (eventId) => {
    const event = allVolunteerEvents.find((event) => event.eventId === eventId);
    return event ? event.title : eventId;
  };

    return (
        <main>
            <div className="main-content">
                <h1>Welcome to Bessies Table</h1>
                <p>View our <Link to="/volunteerevents">volunteer</Link> opportunities.</p>
            </div>



            <h2>All Registrations</h2>
            {allVolunteerRegistrations.length === 0 
                ? 
                (
                    <p>You have no registrations.</p>
                ) 
                : 
                (
                    
                    allVolunteerRegistrations.map((registration, idx) => (
                        <div key={idx}> 
{/*
                            <p>Event:</p>
 
                            <p>{registration.eventId}</p>
                            <p>{registration.name}</p>
                            <p>{registration.email}</p>
*/}
                            <p>{getEventDate(registration.eventId)} {" - "}
                            {getEventTitle(registration.eventId)}</p>
                            
                            <ul>
                                {registration.selectedTasks.map((taskId) => (
                                    <li key={taskId}>
                                        {getTaskDescription(taskId)}{" "}
                                        <button onClick={() => handleCancelTask(idx, taskId)}>
                                            Cancel
                                        </button>
                                 </li>
                                ))}
                            </ul>
                        </div> 
                    )      
                    )
                )
            } 


        </main>
    );

          


{/*
        {registrations.map((registration, idx) => (
          <li key={idx}>
            Event: {registration.eventId} Name: {registration.name} Email: {registration.email}
            <br />
            Tasks: {registrations.selectedTasks.join(, " || "None"}
          </li>
        ))}
*/}
{/*
        </ul>

      </div>  is this div needed 
    ))} 


        </main>
    );
*/}


};

export default HomePage;

