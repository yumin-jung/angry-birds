import { RedBird } from '../../organisms/birds/red-bird';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
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

class BoomerangStage {
    constructor() {
        this.composites = [];

        this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground1 = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.ground2 = new Ground(960, 250, 200, 20);
        this.slingshot = new Slingshot(this.bird);

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground1.getBody());
        this.composites.push(this.ground2.getBody());
        this.composites.push(this.bird.getBody());
    }

    getComposites() {
        return this.composites;
    }
}

export { BoomerangStage }