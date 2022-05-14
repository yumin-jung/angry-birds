import { Bird } from '../../molecules/bird';

class HalBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../../data/birds/hal.png';
        this.body.render.sprite.xScale = 0.65;
        this.body.render.sprite.yScale = 0.65;
    };
}

export { HalBird };