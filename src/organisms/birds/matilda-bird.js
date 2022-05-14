import { Bird } from '../../molecules/bird';

class MatildaBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../../data/matilda.png';
        this.body.render.sprite.xScale = 0.6;
        this.body.render.sprite.yScale = 0.6;
    };
}

export { MatildaBird };