const aboutImg = "/images/keesha-s-kitchen-gDwy_JEoz8k-unsplash-about.jpg";

const AboutPage = () => {
  return (
    <main className="main-content">
      <div className="about-container">
        <div className="about-content">
          <h1>About Bessie's Table</h1>
          <h2>The Bessie's Table story</h2>
          <p>
            In 2003, we heard the call and started Bessie's Table. It's a
            mission with one simple goal: to provide a hot home-cooked meal, in
            a welcoming setting, to persons and families in need, at no cost.
          </p>
          <p>
            It works on the “Stone Soup Principle”; we gather donated food items
            from our local community and create a complete meal. These donations
            make it possible for Bessie's Table to create and serve dinner to
            100-125 hungry people every Monday evening.
          </p>
          <p>
            It's a challenge when there aren't enough donations. When the
            donations are not enough, we have to purchase whatever is needed.
            One night's meal can cost about $150.00. Unbelievably, our expert
            volunteers can stretch that $150 budget to enough food to make a
            nutritous meal that feeds the entire group.
          </p>
          <p>
            Is your organization, school, or church looking for a community
            partnership program? What better way than to partner with Bessie’s
            Table, and have your $150.00 partner donation help so many
            individuals here, in our home community. With your gift, you'll get
            a certificate to proudly display in your office or headquarters,
            recognizing you as a partner.
          </p>
        </div>

        <img className="aboutpage-img" src={aboutImg} alt="soup in a bowl" />
      </div>
    </main>
  );
};

export default AboutPage;
