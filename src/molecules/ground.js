import { Box } from './box';

class Ground extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.body.isStatic = true;
        this.body.friction = 0.6;
        this.body.render.fillStyle = 'grey'
    }
}

export { Ground };