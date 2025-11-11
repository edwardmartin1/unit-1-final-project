import { useState, useEffect } from "react";
import {Routes, Route, Navigate} from "react-router";
//import './App.css'
console.log("got here in App.jsx");

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./components/pages/HomePage";

import VolunteerEventsPage from "./components/pages/volunteerevents/VolunteerEventsPage";
import VolunteerEventsRegistrationPage 
  from "./components/pages/volunteerevents/VolunteerEventsRegistrationPage";


import {mockVolunteerEvents} from "./test-data/mockVolunteerEvents.js";
import {mockVolunteerTasks} from "./test-data/mockVolunteerTasks.js";
import {mockVolunteerRegistrations} from "./test-data/mockVolunteerRegistrations.js";
import AboutPage from "./components/pages/AboutPage.jsx";


console.log("got here in App.jsx");
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
    
    <div id="body-container">
      <Header />      


      <Routes>

        <Route 
          path="/"
          element={<HomePage 
                    allVolunteerEvents={allVolunteerEvents}
                    allVolunteerTasks={allVolunteerTasks}       
                    allVolunteerRegistrations={allVolunteerRegistrations} 
                    setAllVolunteerRegistrations={setAllVolunteerRegistrations} />} 
        /> 
      

        <Route 
          path="/volunteerevents"
          element={<VolunteerEventsPage 
                    allVolunteerEvents={allVolunteerEvents} />} 
        /> 
      
        <Route 
          path="/volunteerevents/registration/:eventId"
          element={<VolunteerEventsRegistrationPage 
                    allVolunteerEvents={allVolunteerEvents}
                    allVolunteerTasks={allVolunteerTasks}
                    allVolunteerRegistrations={allVolunteerRegistrations} 
                    setAllVolunteerRegistrations={setAllVolunteerRegistrations} />} 
        /> 
      
        <Route 
          path="/about"
          element={<AboutPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      
        
      </Routes>
      
      <Footer />
    </div>
  );


}

export default App;

