import {
    Events,
    Composite
} from '../atoms/constants';

import { Body } from '../atoms/body';
import { Bird } from './bird';

class Slingshot extends Body {
    constructor(x, y, bird) {
        super();
        this.bird = bird;
        const options = {
            pointA: {
                x: x,
                y: y
            },
            bodyB: this.bird,
            stiffness: 0.05,
            render: {
                type: "line",
                strokeStyle: '#8B4513',
                lineWidth: 4
            }
        }
        this.body = Matter.Constraint.create(options);
    }
}

export { Slingshot }