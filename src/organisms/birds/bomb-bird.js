import { Bird } from '../../molecules/bird';

class BombBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../../data/birds/bomb.png';
        this.body.render.sprite.xScale = 0.5;
        this.body.render.sprite.yScale = 0.5;
    };
}

export { BombBird };