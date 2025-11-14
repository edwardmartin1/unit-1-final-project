export default class VolunteerEvent
{
    constructor(eventId, date, title, description, criteria)
    {
        this.eventId = eventId;
        this.date = date;
        this.title = title;
        this.description = description;
        this.criteria = criteria;
    }

    getFormattedDate = () =>
    {
        let lang = "en-US";
        let options = 
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        };
    
        return new Date(this.date).toLocaleDateString(lang, options);
    }

    getFormattedTime = () =>
    {
        let lang = "en-US";
        let options =
        {
            hour: "2-digit",
            minute: "2-digit",
        }

        return new Date(this.date).toLocaleTimeString(lang, options);
    }
}

