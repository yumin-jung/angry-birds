import { Bird } from '../../molecules/bird';

class HalBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../../data/birds/hal.png';
        this.body.render.sprite.xScale = 0.6;
        this.body.render.sprite.yScale = 0.6;
    };

    ability() {
        let body = this.body;
        if (body.force.x == 0) {
            body.force.x -= 4
            body.force.y += 2
            setTimeout(() => {
                body.force.x = 0
                body.force.y = 0
            }, 500)
        }
    }
}

export { HalBird };