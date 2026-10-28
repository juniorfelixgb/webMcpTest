import Order from "../models/order.js";

let toolController = null;

export async function onUserLogin(user) {
    const modelContext = document.modelContext;

    if (typeof modelContext?.registerTool !== "function") {
        console.warn("WebMCP is not enabled or supported.");
        return;
    }

    onUserLogout();
    toolController = new AbortController();

    await modelContext.registerTool({
        name: "viewOrderHistory",
        description: "Show the authenticated user's order history",
        inputSchema: {
            type: "object",
            properties: {
                limit: {
                    type: "integer",
                    minimum: 1,
                    maximum: 100,
                    description: "Maximum number of orders"
                }
            }
        },
        annotations: {
            readOnlyHint: true
        },
        execute: async ({ limit = 10 }) => {
            const orders = await Order.fetchOrders(
                user.id,
                limit
            );

            return {
                content: [{
                    type: "text",
                    text: JSON.stringify(orders)
                }]
            };
        }
    }, {
        signal: toolController.signal
    });

    console.log("WebMCP tool registered successfully");
}

function onUserLogout() {
    toolController?.abort();
    toolController = null;
}