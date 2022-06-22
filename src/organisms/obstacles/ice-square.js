import { Box } from '../../molecules/box';

class IceSquare extends Box {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.body.render.sprite.texture = 'https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/obstacles/ice-square.png';
        this.body.render.sprite.xScale = 0.75;
        this.body.render.sprite.yScale = 0.75;
        this.body.friction = 0.05;
    };
}

export { IceSquare };