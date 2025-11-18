
/* import contactImg from "../../../assets/keesha-s-kitchen-gDwy_JEoz8k-unsplash-about.jpg"; */
import contactImg from "../../../assets/anna-pelzer-IGfIGP5ONV0-unsplash-contact.jpg";

const ContactPage = () => {
    return (
        <div>
        <main className="main-content">
            <div className="main-content">
                <h1>Location</h1>
                <h3>668 Graceland Ave</h3>
                <h3>Des Plaines, IL 60016</h3>


                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2963.0885793519064!2d-87.89324502537856!3d42.041280855183906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fb79f21fda0d7%3A0x8439dcc41b1283dc!2s668%20Graceland%20Ave%2C%20Des%20Plaines%2C%20IL%2060016!5e0!3m2!1sen!2sus!4v1763351614028!5m2!1sen!2sus" 
                    width="600" 
                    height="450" 
                  /*  style="border:0;" */
                    allowFullScreen=""  
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade">

                </iframe>


                <h1>Phone</h1>
                <h3>847-827-5561</h3>
                <h1>Email</h1>
                <h3>bessiesdinner_desplaines@yahoo.com</h3>
            </div>
        </main>

        <img
            className="contactpage-img"
            
            src={contactImg}
            
            alt="salad on a plate"
        />
        </div>  
    )

}

export default ContactPage;

