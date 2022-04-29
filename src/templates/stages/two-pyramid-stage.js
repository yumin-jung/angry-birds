import { Bird } from '../../molecules/bird';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../molecules/slingshot';

class TwoPyramidStage {
    constructor() {
        this.composites = [];

        this.bird = new Bird(250, 250, 20);
        this.ground1 = new Ground(395, 600, 815, 50);
        this.ground2 = new Ground(610, 250, 200, 20);
        this.slingshot = new Slingshot(250, 250, this.bird.getBody());
        this.pyramid1 = Matter.Composites.pyramid(500, 300, 9, 10, 0, 0, function (x, y) {
            let box1 = new Box(x, y, 25, 40);
            return box1.getBody();
        });
        this.pyramid2 = Matter.Composites.pyramid(550, 0, 5, 10, 0, 0, function (x, y) {
            let box2 = new Box(x, y, 25, 40);
            return box2.getBody();
        });

        this.composites.push(this.bird.getBody());
        this.composites.push(this.ground1.getBody());
        this.composites.push(this.ground2.getBody());
        this.composites.push(this.slingshot.getBody());
        this.composites.push(this.pyramid1);
        this.composites.push(this.pyramid2);
    }

    getStage() {
        return this.composites;
    }
}

export { TwoPyramidStage }