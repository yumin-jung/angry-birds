import { Bird } from '../../molecules/bird';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../molecules/slingshot';

class PyramidStage {
    constructor() {
        this.composites = [];

        this.bird = new Bird(250, 250, 20);
        this.ground = new Ground(450, 370, 915, 30);
        this.slingshot = new Slingshot(250, 250, this.bird.getBody());
        this.pyramid = Matter.Composites.pyramid(600, 100, 9, 10, 0, 0, function (x, y) {
            let box = new Box(x, y, 30, 50);
            return box.getBody()
        });

        this.composites.push(this.bird.getBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.slingshot.getBody());
        this.composites.push(this.pyramid);
    }

    getStage() {
        return this.composites;
    }
}

export { PyramidStage }