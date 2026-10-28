

export default class HttpClient {
    async sendAsync(method, path) {
        const response = await fetch(path, {
            method
        });

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}: ${response.statusText}`
            );
        }

        return response.json();
    }
}