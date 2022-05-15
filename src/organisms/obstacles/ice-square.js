import { Box } from '../../molecules/box';

class IceSquare extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.body.render.sprite.texture = '../../../data/obstacles/ice-square.png';
        this.body.render.sprite.xScale = 0.75;
        this.body.render.sprite.yScale = 0.75;
    };
}

export { IceSquare };