import { Body } from '../atoms/body';

class Bird extends Body {
    constructor(x, y, r) {
        super();
        this.body = Matter.Bodies.circle(x, y, r, {
            density: 0.005
        });
    }
}

export { Bird };