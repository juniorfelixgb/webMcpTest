import HttpClient from "../utils/httpClient.js";

export default class User {
    id;
    email;
    password;

    constructor(id, email, password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    get getId() {
        return this.id;
    }

    static async loadUsers() {
        const client = new HttpClient();
        const response = await client.send(
            "GET",
            "./src/data/users.json"
        );

        const data = typeof response === "string"
            ? JSON.parse(response)
            : response;

        if (!data) {
            return [];
        }

        return (Array.isArray(data) ? data : [data])
            .map(d => new User(d.id, d.email, d.password));
    }
}