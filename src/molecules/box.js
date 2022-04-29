import { Body } from '../atoms/body';

class Box extends Body {
    constructor(x, y, w, h) {
        super();
        this.body = Matter.Bodies.rectangle(x, y, w, h);
    }
}

export { Box };