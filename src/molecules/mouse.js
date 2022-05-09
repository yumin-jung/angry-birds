import { Body } from '../atoms/body';
import {
    Mouse,
    MouseConstraint
} from '../atoms/constants';

class MouseBody extends Body {
    constructor(render) {
        super();
        this.mouse = Mouse.create(render.canvas);
        this.mouseConstraint = MouseConstraint.create(engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: 0.3,
                render: {
                    visible: false
                }
            }
        });
        this.body = this.mouseConstraint;
    }

    getMouse() {
        return this.mouse;
    }

}

export { MouseBody };