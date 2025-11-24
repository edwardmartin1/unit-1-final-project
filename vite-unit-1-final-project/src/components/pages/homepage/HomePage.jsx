import { Link } from "react-router";
import HomeCard from "./HomeCard";

const homeImg =
  "/images/farhad-ibrahimzade-n02DKJ1fiK0-unsplash-hero-large.jpg";
const flipCardFront = "/images/doina-gavrilov-FvdoYvSEaCI-unsplash-flip.jpg";
const flipCardBack = "/images/kevin-kevin-w5CB081l1V4-unsplash-flip.jpg";

const HomePage = ({
  allVolunteerEvents,
  allVolunteerTasks,
  allVolunteerRegistrations,
  setAllVolunteerRegistrations,
}) => {
  let allVolunteerRegistrationsJSX = [...allVolunteerRegistrations].map(
    (registration, idx) => {
      return (
        <HomeCard
          key={registration.eventId ?? idx}
          registration={registration}
          idx={idx}
          allVolunteerEvents={allVolunteerEvents}
          allVolunteerTasks={allVolunteerTasks}
          setAllVolunteerRegistrations={setAllVolunteerRegistrations}
        />
      );
    }
  );

  return (
    <div className="homepage-div">
      {/* image at the top of the page */}
      <img
        className="homepage-img"
        src={homeImg}
        alt="volunteer serving meal"
      />

      {/* main content section */}
      <main className="homepage-main">
        <div className="main-content">
          <h2>A home-cooked dinner, free to all who are hungry.</h2>

          <h4>
            Every Monday at 5:30 p.m., we serve a delicious, home-cooked,
            healthy meal to anyone who comes to our door. Anyone.
          </h4>

          <p>Do you enjoy helping and enriching the lives of others?</p>
          <p>
            Bessie’s Table provides an excellent opportunity to do both!
            Registering to volunteer is simple.
          </p>
          <p>
            View our <Link to="/volunteerevents">volunteer</Link> opportunities.
          </p>
          <p>
            Bessie’s Table serves dinner each Monday from 5:30 p.m. until 6:30
            p.m. Dining room volunteers should arrive by 4:00 p.m. to set up.
            Clean up is completed by 7:00 p.m.
          </p>
        </div>

        {/* flip card */}
        <div className="flip-card">
          <div className="card-inner">
            <div className="card-front">
              <img
                className="flip-img"
                src={flipCardFront}
                alt="vegetables on a table"
              />

              <p className="card-title">Free Healthy Meal Every Monday</p>
            </div>

            <div className="card-back">
              <img
                className="flip-img"
                src={flipCardBack}
                alt="volunteer baking desserts"
              />

              <p className="card-title">Volunteer With Us</p>
            </div>
          </div>
        </div>
      </main>

      {/* sidebar with volunteer registrations */}
      <aside className="homepage-sidebar">
        <h2>Your Volunteer Registrations</h2>

        {allVolunteerRegistrations.length === 0 ? (
          <p>You have no registrations.</p>
        ) : (
          <div>{allVolunteerRegistrationsJSX}</div>
        )}
      </aside>
    </div>
  );
};

export default HomePage;
