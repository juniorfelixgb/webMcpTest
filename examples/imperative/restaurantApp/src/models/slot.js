
export default class Slot {
    id;
    time;
    durationMinutes;
    capacity;
    availableTables;
    status;

    /**
     *
     */
    constructor(id, time, durationMinutes, capacity, availableTables, status) {
        this.id = id;
        this.time = time;
        this.durationMinutes = durationMinutes;
        this.capacity = capacity;
        this.availableTables = availableTables;
        this.status = status;
    }
}
