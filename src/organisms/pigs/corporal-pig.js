import { Pig } from '../../molecules/pig';

class CorporalPig extends Pig {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/pigs/corporal-pig.png';
        this.body.render.sprite.xScale = 0.4;
        this.body.render.sprite.yScale = 0.4;
    };
}

export { CorporalPig };