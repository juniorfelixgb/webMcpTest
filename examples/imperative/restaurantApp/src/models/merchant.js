import HttpClient from "../utils/httpClient.js";
import Restaurant from '../models/restaurant.js';
import Availability from './availability.js';
import Slot from '../models/slot.js';

export default class Merchant {
    restaurant;
    availability;

    constructor(restaurant, availability) {
        this.restaurant = restaurant;
        this.availability = availability;
    }

    static async getAvailableSlots(date, partySize) {
        const client = new HttpClient();

        const response = await client.sendAsync(
            "GET",
            "./src/data/slots.json"
        );

        const data = typeof response === "string"
            ? JSON.parse(response)
            : response;

        if (!data) {
            return null;
        }

        const availability = data.availability.find(
            a => a.date === date
        );

        const availableSlots = availability?.slots.filter(
            s => s.capacity >= partySize &&
                s.availableTables > 0 &&
                s.status === "available"
        ) ?? [];

        const restaurant = data.restaurant;

        return new Merchant(
            new Restaurant(
                restaurant.id,
                restaurant.name,
                restaurant.timezone,
                restaurant.openingTime,
                restaurant.closingTime,
                restaurant.maxPartySize
            ),
            availableSlots
        );
    }
}