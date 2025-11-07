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


  const [registrations, setRegistrations] = useState([]);

  const handleRegister = (data) => {
    setRegistrations((prev) => [...prev, data]);
  };




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
          element={<HomePage registrations={registrations} 
                              setRegistrations={setRegistrations}
                              allVolunteerEvents={allVolunteerEvents} 
                              allVolunteerTasks={allVolunteerTasks}
                              />} 
        /> 
      

        <Route 
          path="/volunteerevents"
          element={<VolunteerEventsPage volunteerEvents={allVolunteerEvents} />} 
        /> 
      
        <Route 
          path="/volunteerevents/registration/:eventId"
          element={<VolunteerEventsRegistrationPage 
                    volunteerTasks={allVolunteerTasks}
                    /*volunteerRegistrations={allVolunteerRegistrations}*/ 
                    onRegister={handleRegister}
                    
                    />} 
        /> 
      
      </Routes>
    
    
    
    </div>
  );
}

export default App;

