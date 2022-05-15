import { Bird } from '../../molecules/bird';

class HalBird extends Bird {
    constructor(x, y, r) {
        super(x, y, r);
        this.body.render.sprite.texture = '../../../data/birds/hal.png';
        this.body.render.sprite.xScale = 0.6;
        this.body.render.sprite.yScale = 0.6;
    };

    ability() {
        if (this.isAbility) {
            let body = this.body;
            if (body.force.x == 0) {
                body.force.x -= 0.5
                setTimeout(() => {
                    body.force.x -= 0.5
                }, 100)
                setTimeout(() => {
                    body.force.x -= 0.5
                }, 100)
                setTimeout(() => {
                    body.force.x -= 0.5
                }, 100)
                setTimeout(() => {
                    body.force.x -= 0.5
                }, 100)
                body.force.y += 1.5
                body.torque += 50;
                setTimeout(() => {
                    body.force.x = 0
                    body.force.y = 0
                }, 500)
            }
            this.isAbility = false;
        }
    }
}

export { HalBird };