class EventBus {
    event: Record<string, Function[]>;
    constructor() {
        this.event = {};
    } 
    subscribe(eventName: string, callback: Function) {
        if (!this.event[eventName]) {
            this.event[eventName] = [];
        }
        this.event[eventName].push(callback);
    }
    unSubscribe(eventName: string, callback: Function) {
        if (!this.event[eventName]) {
            return
        }
        this.event[eventName] = this.event[eventName].filter(cb => cb !== callback)
    }
    dispatch(eventName: string, payload: any) {
        if (!this.event[eventName]) {
            return;
        }
        this.event[eventName].forEach(cb => cb(payload))
    }
}

const eventBus = new EventBus();
export default eventBus;
export { EventBus }