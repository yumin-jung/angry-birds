import { Bird } from '../../molecules/bird';

class BombBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = 'https://raw.githubusercontent.com/yumin-jung/Angry-Birds/main/data/birds/bomb.png';
        this.body.render.sprite.xScale = 0.4;
        this.body.render.sprite.yScale = 0.4;
    };

    // bomb bird ability
    ability() {
        if (this.isAbility) {
            let body = this.body;
            Matter.Body.scale(body, 2, 2);
            body.render.sprite.xScale = 0.8;
            body.render.sprite.yScale = 0.8;
            this.isAbility = false;
        }
    }
}

export { BombBird };