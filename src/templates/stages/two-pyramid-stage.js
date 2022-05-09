import { RedBird } from '../../organisms/birds/red-bird';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../molecules/slingshot';
import {
    Composites,
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y
} from '../../atoms/constants';

class TwoPyramidStage {
    constructor() {
        this.composites = [];

        this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground1 = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(BIRD_X, BIRD_Y, this.bird.getBody());

        this.ground2 = new Ground(960, 250, 200, 20);
        this.pyramid1 = Composites.pyramid(900, 300, 9, 10, 0, 0, function (x, y) {
            let box1 = new Box(x, y, 25, 40);
            return box1.getBody();
        });
        this.pyramid2 = Composites.pyramid(900, 0, 5, 10, 0, 0, function (x, y) {
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