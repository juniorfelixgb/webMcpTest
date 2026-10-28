
let toolController = null;

export default async function deleteAccount() {
    const modelContext = document.modelContext;
    if (!modelContext.registerTool) {
        console.warn("WebMCP is not enabled or supported.");
        return;
    }

    await modelContext.registerTool({
        name: 'deleteAccount',
        description: "Permanently delete the user's account and all associated data. Cannot be undone.",
        inputSchema: {
            type: 'object',
            properties: {
                confirmPhase: {
                    type: 'string',
                    description: "The user must type 'DELETE MY ACCOUNT' to confirm."
                }
            },
            required: ["confirmPhase"]
        },
        execute: async ({ confirmPhase }) => {
            if (confirmPhase !== 'DELETE MY ACCOUNT') {
                return {
                    content: [{
                        type: 'text',
                        text: 'Confirmation phrase does not match. Ask the user to confirm explicitly.'
                    }]
                };
            }

            const confirmed = await showConfirmationModal();

            if (!confirmed) {
                return {
                    content: [{
                        type: "text",
                        text: "Deletion cancelled by user."
                    }]
                };
            }

            // deleting user...
            console.log('Usuario eliminado');

            return {
                content: [{
                    type: "text",
                    text: "Account deleted successfully."
                }]
            };
        }
    })
}

function showConfirmationModal() {
    return new Promise((resolve) => {
        const dialog = document.getElementById(
            "confirmationDialog"
        );

        dialog.addEventListener("close", () => {
            resolve(dialog.returnValue === "confirm");
        }, { once: true });

        dialog.showModal();
    });
}