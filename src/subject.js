class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        if (observer != null) this.observers.push(observer);
    }

    unsubscribe(observer) {
        if (observer == null) return;
        this.observers = this.observers.filter((e) => e != observer);
    }

    unsubscribeAll() {
        this.observers = [];
    }

    notifySubscribers(source, ...others) {
        for (let ob of this.observers) {
            if (ob != null) ob.update(source, ...others);
        }
    }
}

export { Subject };
