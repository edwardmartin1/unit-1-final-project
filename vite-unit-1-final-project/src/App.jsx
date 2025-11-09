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
          element={<VolunteerEventsPage allVolunteerEvents={allVolunteerEvents} />} 
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

