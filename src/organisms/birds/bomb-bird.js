import { Bird } from '../../molecules/bird';

class BombBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../../data/birds/bomb.png';
        this.body.render.sprite.xScale = 0.5;
        this.body.render.sprite.yScale = 0.5;
    };

    ability() {
        if (this.isAbility) {
            let body = this.body;
            Matter.Body.scale(body, 1.5, 1.5);
            body.render.sprite.xScale = 0.75;
            body.render.sprite.yScale = 0.75;
            this.isAbility = false;
        }
    }
}

export { BombBird };