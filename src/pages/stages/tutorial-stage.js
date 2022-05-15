import { RedBird } from '../../organisms/birds/red-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Subject } from '../../subject'
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    PIG_SIZE_MINION,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    OBSTACLE_SQUARE_LENGTH
} from '../../atoms/constants';


class TutorialStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;

        this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig = new MinionPig(1000, 300, PIG_SIZE_MINION);
        this.steelSquare = new SteelSquare(1000, 400, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig.getBody());
        this.composites.push(this.steelSquare.getBody());
    }

    getComposites() {
        return this.composites;
    }

    updateScore(score) {
        this.notifySubscribers('updateScore',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
    }
}

export { TutorialStage }