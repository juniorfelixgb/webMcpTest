import TodoApp from "../models/TodoApp.js";

const todoApp = new TodoApp([]);

export default async function addToDoTool() {
    if (!document.modelContext?.registerTool) {
        console.warn(
            'WebMCP is not available in this browser. Make sure you are using a recent version of Chrome with WebMCP support.'
        );
        return;
    }

    await document.modelContext.registerTool({
        name: 'addTodo',
        description:
            `Add a new item to user's to-do list.
             Use when the user asks to create, add, or remember a task.`,
        inputSchema: {
            type: 'object',
            properties: {
                text: {
                    type: 'string',
                    description: 'The task description',
                },
                priority: {
                    type: "string",
                    enum: ['low', 'medium', 'high'],
                    description: "Task priority level. Default to 'medium' if not specified by the user.",
                },
            },
            required: ['text'],
        },
        execute: async ({ text, priority = "medium" }) => {
            const newItem = { id: Date.now(), text, priority, done: false };

            todoApp.addItem(newItem);
            todoApp.renderList();

            return {
                content: [
                    {
                        type: "text",
                        text: `Added task: ${text} with ${priority} priority. The to-do list now has ${todoApp.getCount()}`,
                    },
                ],
            };
        },
    });
}
