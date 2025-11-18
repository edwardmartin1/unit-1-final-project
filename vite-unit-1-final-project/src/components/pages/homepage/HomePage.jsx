import {useState, useEffect} from "react";
import {Link} from "react-router";
import HomeCard from "./HomeCard";
/*import homeImg from "../../../assets/bt-home-2.jpg";*/
import homeImg from "../../../assets/farhad-ibrahimzade-n02DKJ1fiK0-unsplash-hero-large.jpg";
import flipCardFront from "../../../assets/doina-gavrilov-FvdoYvSEaCI-unsplash-flip.jpg";
/*import flipCardBack from "../../../assets/doina-gavrilov-FvdoYvSEaCI-unsplash-flip.jpg";*/
import flipCardBack from "../../../assets/kevin-kevin-w5CB081l1V4-unsplash-flip.jpg";


const HomePage = ({allVolunteerEvents, 
                   allVolunteerTasks,
                   allVolunteerRegistrations,
                   setAllVolunteerRegistrations}) => {


/*  ???not needed anymore */                   
//  const getTaskDescription = (taskId) => {
//    const task = allVolunteerTasks.find((task) => task.taskId === taskId); /* either update the taskId's or try to add task.eventId === eventide && ... */
//    return task ? task.description : taskId;  /* maybe the or should just return blank */
//  };

//  const getEventDate = (eventId) => {
//    console.log(eventId);
//    const event = allVolunteerEvents.find((event) => event.eventId === eventId);
//    return event ? event.date : eventId;
//  };

//  const getEventTitle = (eventId) => {
//    const event = allVolunteerEvents.find((event) => event.eventId === eventId);
//    return event ? event.title : eventId;
//  };





  let allVolunteerRegistrationsJSX = [...allVolunteerRegistrations].map((registration, idx) => {
    return (
      <HomeCard key={registration.eventId ?? idx}
                registration={registration} 
                idx={idx} 
                allVolunteerEvents={allVolunteerEvents} 
                allVolunteerTasks={allVolunteerTasks} 
                setAllVolunteerRegistrations={setAllVolunteerRegistrations}
                />
    );  
  });    

  return (
    <div className="homepage-div">
        
      <img
        className="homepage-img"
        /*src="assets/bt-home.jpg"*/
        src={homeImg}
        /*width="100%"*/
        alt="volunteer serving meal"
      />
  
      <main className="homepage-main">
            

        <div className="main-content">
          
          <h2>A home-cooked dinner, free to all who are hungry.</h2>

          <h2>Every Monday at 5:30 p.m., we serve a delicious, home-cooked, healthy meal to anyone who comes to our door. Anyone.</h2>

          <p>Do you enjoy helping and enriching the lives of others?</p>
          <p>Bessie’s Table provides an excellent opportunity to do both! Volunteering is simple. We need volunteers to assist with:</p>
          <p>View our <Link to="/volunteerevents">volunteer</Link> opportunities.</p>
          <p>Bessie’s Table serves dinner each Monday from 5:30 p.m. until 6:30 p.m.  Dining room volunteers should arrive by 4:00 p.m. to set up. Clean up is completed by 7:00 p.m.</p>

        </div>


        <div className="flip-card">
          <div className="card-inner">
            <div className="card-front">	
	            <img
                className="flip-img"
                src={flipCardFront}              
                alt="vegetables on a table"
              />
			       
	            <h6 className="card-title">Free Healthy Meal Every Monday</h6>		
	
            </div>
    
            <div className="card-back">
		          <img
			          className="flip-img"
                src={flipCardBack}                          
                alt="volunteer baking desserts"
              />      
              
              <h6 className="card-title">Volunteer With Us</h6>
            </div>
          </div>  
        </div>


      </main>

      <aside className="homepage-sidebar">
        <h2>Your Volunteer Registrations</h2>

        {allVolunteerRegistrations.length === 0 
          ?
          (
            <p>You have no registrations.</p>
          ) 
          : 
          (
            <div>{allVolunteerRegistrationsJSX}</div>            
          )                
        }
      </aside>
    </div>
  );

};

export default HomePage;

