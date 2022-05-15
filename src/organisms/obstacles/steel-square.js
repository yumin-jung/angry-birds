import { Box } from '../../molecules/box';

class SteelSquare extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.body.render.sprite.texture = '../../../data/obstacles/steel-square.png';
        this.body.render.sprite.xScale = 0.75;
        this.body.render.sprite.yScale = 0.75;
        this.body.isStatic = true;
    };
}

export { SteelSquare };