
export default class Restaurant {
    id;
    name;
    timezone;
    openingTime;
    closingTime;
    maxPartySize;
    availability;

    /**
     *
     */
    constructor(id, name, timezone, openingTime, closingTime, maxPartySize, availability) {
        this.id = id;
        this.name = name;
        this.timezone = timezone;
        this.openingTime = openingTime;
        this.closingTime = closingTime;
        this.maxPartySize = maxPartySize;
        this.availability = availability;
    }
}