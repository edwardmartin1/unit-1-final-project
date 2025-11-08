import { useState, useEffect } from "react";
import {Routes, Route, Navigate} from "react-router";
import './App.css'

import HomePage from "./components/pages/HomePage";
import VolunteerEventsPage from "./components/pages/volunteerevents/VolunteerEventsPage";
import VolunteerEventsRegistrationPage 
  from "./components/pages/volunteerevents/VolunteerEventsRegistrationPage";


import {mockVolunteerEvents} from "./test-data/mockVolunteerEvents.js";
import {mockVolunteerTasks} from "./test-data/mockVolunteerTasks.js";
import {mockVolunteerRegistrations} from "./test-data/mockVolunteerRegistrations.js";


console.log("mockVolunteerEvents", mockVolunteerEvents);


const App = () => {
  const [allVolunteerEvents, setAllVolunteerEvents] = useState([]);
  const [allVolunteerTasks, setAllVolunteerTasks] = useState([]);
  const [allVolunteerRegistrations, setAllVolunteerRegistrations] = useState([]);

  useEffect(() => {
    setAllVolunteerEvents(mockVolunteerEvents);
    setAllVolunteerTasks(mockVolunteerTasks);
    /*setAllVolunteerRegistrations(mockVolunteerRegistrations);*/
  }, []);

/*
  const [registrations, setRegistrations] = useState([]);
*/



  const handleRegister = (data) => {

    const eventFound = allVolunteerRegistrations.some((registration) => registration.eventId === data.eventId);
    let sortedAllVolunteerRegistrations = [];

    
    if (eventFound)
    {
      /* adding additional task for event you are already registered for */
      
      const updatedAllVolunteerRegistrations = allVolunteerRegistrations.map((event) => {
      /* check if the current registered event is the one we need to update */
        if (event.eventId === data.eventId)
        {
          return {
            ...event, selectedTasks: [...event.selectedTasks, ...data.selectedTasks]
          };
        }
        else
        {
          return event;
        }
      });
    
      sortedAllVolunteerRegistrations = 
        [...updatedAllVolunteerRegistrations].sort((a, b) => a.eventId - b.eventId);
    }
    else
    {
      /* adding event for the first time and the selected tasks */
      sortedAllVolunteerRegistrations = 
        [...allVolunteerRegistrations, data].sort((a, b) => a.eventId - b.eventId);
    }  

    setAllVolunteerRegistrations(sortedAllVolunteerRegistrations);

    console.log("here in App.jsx");
  
  };





/* sample code to build from */
//    const task = allVolunteerTasks.find((task) => task.taskId === taskId); /* either update the taskId's or try to add task.eventId === eventide && ... */
//    return task ? task.description : taskId;  /* maybe the or should just return blank */

/* refacted this */
///    const task = allVolunteerRegistrations.find((registration) => registration.eventId === data.eventId);
///    let allVolunteerRegistrationsOneRemoved = [];

///    if (task)
///   {
///      allVolunteerRegistrationsOneRemoved = allVolunteerRegistrations.filter((registration) => registration.eventId !== task.eventId);

///      task.selectedTasks = [...task.selectedTasks, ...data.selectedTasks];
      
     
      
      


//      let volunteerRegistrations = allVolunteerRegistrations;
      
      

//      data.forEach((newRegistration) => {
        /* find and then filter out the event from allVolunteerRegistations */
        

//        volunteerRegistrations.forEach((registration) =>{
//          registration.selectedTasks.forEach((eventId) => {
//            eventTasks = [...eventId.SelectdTasks, data.]

//          });

//        });
//      });  
      

/* refactored this */
///      setAllVolunteerRegistrations([(prev) => [...allVolunteerRegistrationsOneRemoved, task]]);
///    }
///    else
///    {
///      setAllVolunteerRegistrations((prev) => [...prev, data]);
///    }
    
   
///  };




//  const handleCancelTask = (registrationIndex, taskId) => {
//    setRegistrations((prev) => {
//      return prev.map((registration, idx) => {
//        if (idx !== registrationIndex) return registration;
        
//        const updatedTasks = registration.selectedTasks.filter((id) => id !== taskId);

//        if (updatedTasks.length === 0) return null;
//        return {...registration, selectedTasks: updatedTasks};
//      }).filter(Boolean);
 
//    });


  //};

//  const getTaskDescription = (taskId) => {
//    const task = allVolunteerTasks.find((task) => task.taskId === taskId); /* either update the taskId's or try to add task.eventId === eventide && ... */
//    return task ? task.description : taskId;  /* maybe the or should just return blank */
//  };



console.log("allVolunteerEvents", {allVolunteerEvents});


  return (
    
    <div>
      <header>
      <h1>Unit 1 Final Project</h1>
      </header>
    
      <Routes>
        <Route 
          path="/"
          element={<HomePage allVolunteerEvents={allVolunteerEvents}
                             allVolunteerTasks={allVolunteerTasks}       
                             allVolunteerRegistrations={allVolunteerRegistrations} 
                             setAllVolunteerRegistrations={setAllVolunteerRegistrations}
                              />} 
        /> 
      

        <Route 
          path="/volunteerevents"
          element={<VolunteerEventsPage volunteerEvents={allVolunteerEvents} />} 
        /> 
      
        <Route 
          path="/volunteerevents/registration/:eventId"
          element={<VolunteerEventsRegistrationPage 
                    allVolunteerEvents={allVolunteerEvents}
                    allVolunteerTasks={allVolunteerTasks}
                    allVolunteerRegistrations={allVolunteerRegistrations} 
                    setAllVolunteerRegistrations={setAllVolunteerRegistrations}
                    />} 
        /> 
      
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    
    
    
    </div>
  );
}

export default App;

