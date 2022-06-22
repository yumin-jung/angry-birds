import { Pig } from '../../molecules/pig';

class KingPig extends Pig {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/pigs/king-pig.png';
        this.body.render.sprite.xScale = 0.7;
        this.body.render.sprite.yScale = 0.7;
    };
}

export { KingPig };