import { useState, useEffect } from "react";
import {Routes, Route, Navigate} from "react-router";
//import './App.css'
//console.log("got here in App.jsx");

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import HomePage from "./components/pages/homepage/HomePage";

import VolunteerEventsPage from "./components/pages/volunteerevents/VolunteerEventsPage";
import VolunteerEventsRegistrationPage 
  from "./components/pages/volunteerevents/VolunteerEventsRegistrationPage";


import {mockVolunteerEvents} from "./test-data/mockVolunteerEvents.js";
import {mockVolunteerTasks} from "./test-data/mockVolunteerTasks.js";
//import {mockVolunteerRegistrations} from "./test-data/mockVolunteerRegistrations.js";
import AboutPage from "./components/pages/aboutpage/AboutPage.jsx";
import ContactPage from "./components/pages/contactpage/ContactPage.jsx";

import VolunteerEvent from "./classes/VolunteerEvent";
import VolunteerTask from "./classes/VolunteerTask";


console.log("got here in App.jsx");
console.log("mockVolunteerEvents", mockVolunteerEvents);


const App = () => {
  const [allVolunteerEvents, setAllVolunteerEvents] = useState([]);
  const [allVolunteerTasks, setAllVolunteerTasks] = useState([]);
  const [allVolunteerRegistrations, setAllVolunteerRegistrations] = useState([]);


  const fetchVolunteerEvents = () => {
    let events = [];
    
    try {
      const data = mockVolunteerEvents;

      events = data.map((event) => {
        let newVolunteerEvent = new VolunteerEvent(
          event.eventId,
          event.date,
          event.title,
          event.description,
          event.criteria,          
        );

        return newVolunteerEvent;
      });
    }
    catch (error) {
      console.error(error.message);
    }
    finally {
      setAllVolunteerEvents(events);
    }
  };
  
  const fetchVolunteerTasks = () => {
    let tasks = [];
    
    try {
      const data = mockVolunteerTasks;

      tasks = data.map((task) => {
        let newVolunteerTask = new VolunteerTask(
          task.eventId,
          task.taskId,
          task.description,
        );

        return newVolunteerTask;
      });
    }
    catch (error) {
      console.error(error.message);
    }
    finally {
      setAllVolunteerTasks(tasks);
    }
  };
  
  
  
  
  //refactoring this 
  //useEffect(() => {
  //  setAllVolunteerEvents(mockVolunteerEvents);
  //  setAllVolunteerTasks(mockVolunteerTasks);
  //  /*setAllVolunteerRegistrations(mockVolunteerRegistrations);*/
  //}, []);
    

  useEffect(() => {
    fetchVolunteerEvents();
    fetchVolunteerTasks();

//console.log("hh-allVolunteerEvents", {allVolunteerEvents});
//console.log("hh-allVolunteerTasks", {allVolunteerTasks});

  }, []);



/*
    <div id="root-container"
         style={{ "--bg-img": `url(${background})` }}>
 
*/

  return (
    

    <div id="body-container" className="app-container">

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

        <Route 
          path="/contact"
          element={<ContactPage />} />


        <Route path="*" element={<Navigate to="/" />} />
      
        
      </Routes>
      
      <Footer />
    </div>
  );


}

export default App;

