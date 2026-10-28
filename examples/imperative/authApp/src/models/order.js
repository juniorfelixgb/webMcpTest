import HttpClient from '../utils/httpClient.js';

export default class Order {
    id;
    description;
    status;
    items;
    userId;

    constructor(id, description, status, items, userId) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.items = items;
        this.userId = userId;
    }

    static async fetchOrders(userId, limit) {
        const client = new HttpClient();
        const response = await client.send(
            "GET",
            "./src/data/orders.json"
        );

        const data = typeof response == 'string'
            ? JSON.parse(response)
            : response;

        if (!data) {
            return;
        }

        if (data.length > 1) {
            return data.map(d =>
                new Order(d.id, d.description, d.status, d.items, d.userId))
                .slice(0, limit);
        }

        return new Order(data.id, data.description, data.status, data.items, data.userId)
    }
}