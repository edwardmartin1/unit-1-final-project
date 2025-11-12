import {useState, useEffect} from "react";
import {Link} from "react-router";
import HomeCard from "./HomeCard";


const HomePage = ({allVolunteerEvents, 
                   allVolunteerTasks,
                   allVolunteerRegistrations,
                   setAllVolunteerRegistrations}) => {



/* moved below to HomeCard.jsx */ 
//  const handleCancelTask = (registrationIndex, taskId) => {
//    setAllVolunteerRegistrations((prev) => {
//      return prev.map((registration, idx) => {
//        if (idx !== registrationIndex) return registration;
        
//        const updatedTasks = registration.selectedTasks.filter((id) => id !== taskId);

        /* if removing the final task for an event then remove the entire event */
//        if (updatedTasks.length === 0) return null;
//        return {...registration, selectedTasks: updatedTasks};
//      }).filter(Boolean);

//    });


//  };
//moved above to HomeCard.jsx

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

/* 11/10 update this code below */

  let allVolunteerRegistrationsJSX = [...allVolunteerRegistrations].map((registration, idx) => {
    return (
      <HomeCard registration={registration} 
                idx={idx} 
                allVolunteerEvents={allVolunteerEvents} 
                allVolunteerTasks={allVolunteerTasks} 
                setAllVolunteerRegistrations={setAllVolunteerRegistrations}
                />
    );  });    
        
                
                  

//let allVolunteerEventsJSX = [...sortedEvents].map((event) => {
//        return (
//            <Link 
//                to={"/volunteerevents/registration/" + event.eventId}
//                key={event.eventId}>
//                    <VolunteerEventCard /*key={event.eventId}*/ event={event} />
//            </Link>
        
//        );
//    });


    return (
      <div className="homepage-div">
        
      <img
              className="homepage-img"
              src="/images/bt-home.jpg"
              width="100%"
              
              alt="volunteer serving meal"
            />
  
        <main className="homepage-main">
            

            <div className="main-content">
              <h1>Welcome to Bessie's Table</h1>
              

              <h2>Every Monday at 5:30 p.m., we serve a delicious, home-cooked, healthy meal to anyone who comes to our door. Anyone.</h2>
              <p>Do you enjoy helping and enriching the lives of others?</p>
              <p>Bessie’s Table provides an excellent opportunity to do both! Volunteering is simple. We need volunteers to assist with:</p>
              <p>View our <Link to="/volunteerevents">volunteer</Link> opportunities.</p>
              <p>Bessie’s Table serves dinner each Monday from 5:30 p.m. until 6:30 p.m.  Dining room volunteers should arrive by 4:00 pm to set up. Clean up is completed by 7:00 pm.</p>
{/*
            <h2>Your Volunteer Registrations</h2>
            {allVolunteerRegistrations.length === 0 
                ? 
                (
                    <p>You have no registrations.</p>
                ) 
                : 
                (
                    
                    allVolunteerRegistrations.map((registration, idx) => (
                        <div key={idx}> 
                            <p>{getEventDate(registration.eventId)} {" - "}
                            {getEventTitle(registration.eventId)}</p>
                            
                            <ul>
                                {registration.selectedTasks.map((taskId) => (
                                    <li key={taskId}>
                                            
                                        <button onClick={() => handleCancelTask(idx, taskId)}>
                                          Cancel
                                        </button>

                                        {" "} {getTaskDescription(taskId)}
                    
                                 </li>
                                ))}
                            </ul>
                        </div> 
                    )      
                    )
                )
            }
*/}                 
            </div>
        </main>

        <aside class="homepage-sidebar">
            <h2>Your Volunteer Registrations</h2>





            {allVolunteerRegistrations.length === 0 
                ? 
                (
                    <p>You have no registrations.</p>
                ) 
                : 
                (


<div >{allVolunteerRegistrationsJSX}</div>




                    
                    )
                
            }



        </aside>
      </div>
);




};

export default HomePage;

/* code to put back
                    
                    allVolunteerRegistrations.map((registration, idx) => (
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
                    )
                    
*/