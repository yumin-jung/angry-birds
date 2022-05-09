import { RedBird } from '../../organisms/birds/red-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../molecules/slingshot';
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    PIG_SIZE_MINION,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y
} from '../../atoms/constants';


class TutorialStage {
    constructor() {
        this.composites = [];

        this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(BIRD_X, BIRD_Y, this.bird.getBody());

        this.box = new MinionPig(1000, 400, PIG_SIZE_MINION);

        this.composites.push(this.bird.getBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.slingshot.getBody());
        this.composites.push(this.box.getBody());
    }

    getStage() {
        return this.composites;
    }
}

export { TutorialStage }