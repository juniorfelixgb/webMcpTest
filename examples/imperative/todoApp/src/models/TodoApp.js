
export default class TodoApp {
    constructor(todos) {
        this.todos = todos;
    }

    addItem(newItem) {
        if (!newItem) {
            return;
        }

        this.todos = [...this.todos, newItem];
        return this.todos;
    }

    renderList() {
        return this.todos;
    }

    getCount() {
        return this.todos.length;
    }
}
