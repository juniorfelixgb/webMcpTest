import Merchant from '../models/merchant.js';

let toolController = null;

export async function checkAvailabilityTool() {

    const modelContext = document.modelContext;
    if (typeof modelContext?.registerTool !== "function") {
        console.warn("WebMCP is not enabled or supported.");
        return;
    }

    cleanConnection();
    toolController = new AbortController();

    await modelContext.registerTool({
        name: 'checkAvailability',
        description: 'Check table availability for a given date and party size at this restaurant. Returns available time slots.',
        inputSchema: {
            type: 'object',
            properties: {
                date: {
                    type: 'string',
                    description: 'The desired reservation date in YYYY-MM-DD format'
                },
                partySize: {
                    type: 'number',
                    description: 'Number of guests, between 1 an 12'
                },
            },
            required: ['date', 'partySize']
        },
        execute: async ({ date, partySize }) => {
            if (partySize < 1 || partySize > 12) {
                return {
                    content: [{
                        type: 'text',
                        text: 'Party size must be between 1 and 12. For larger groups, please call the restaurant directly at (555) 123-4567'
                    }]
                }
            }

            const result = await Merchant.getAvailableSlots(date, partySize);
            const availableSlots = result.availability.map(a => a.time);

            return {
                content: [{
                    type: 'text',
                    text: JSON.stringify({
                        date,
                        partySize,
                        availableSlots,
                        message: availableSlots.length > 0
                            ? `Found ${availableSlots.length} available time slots.`
                            : "No availability for this date. Try a different date or smaller party."
                    })
                }]
            };
        }
    }, {
        signal: toolController.signal,
    });
}

function cleanConnection() {
    toolController?.abort();
    toolController = null;
}