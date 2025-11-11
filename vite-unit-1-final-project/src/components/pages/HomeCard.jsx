import Card from "../common/Card";

const HomeCard = ({registration, 
                    idx, 
                    allVolunteerEvents, 
                    allVolunteerTasks, 
                    setAllVolunteerRegistrations}) => {
  
  
  
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
        <Card clickable={false} >
            <div className="home-card">    
                <div key={idx}> 
                   <p>{getEventDate(registration.eventId)} {" - "}
                    {getEventTitle(registration.eventId)}</p>
                            
                    <ul className="homepage-ul">
                        {registration.selectedTasks.map((taskId) => (
                            <article className="homepage-article">
                                <li key={taskId}>                                            
                                    <button onClick={() => handleCancelTask(idx, taskId)}>
                                        Cancel
                                    </button>

                                    {" "} {getTaskDescription(taskId)} 
                    
                                </li>
                            </article>  
                        ))}
                    </ul>
                </div>             
            </div>
            
        </Card>
    );

};

export default HomeCard;
