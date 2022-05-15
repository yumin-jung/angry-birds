import { HalBird } from '../../organisms/birds/hal-bird';
import { CorporalPig } from '../../organisms/pigs/corporal-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Subject } from '../../subject'
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    OBSTACLE_SQUARE_LENGTH,
    PIG_SIZE_CORPORAL
} from '../../atoms/constants';

class BoomerangStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;
        // hal, hal, hal

        this.bird = new HalBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground1 = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.slingshot = new Slingshot(this.bird);
        this.pig = new CorporalPig(700, 500, PIG_SIZE_CORPORAL);

        this.steelSquare1 = new SteelSquare(600, 540, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare2 = new SteelSquare(600, 480, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare3 = new SteelSquare(600, 420, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);
        this.steelSquare4 = new SteelSquare(600, 360, OBSTACLE_SQUARE_LENGTH, OBSTACLE_SQUARE_LENGTH);

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground1.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig.getBody());

        this.composites.push(this.steelSquare1.getBody());
        this.composites.push(this.steelSquare2.getBody());
        this.composites.push(this.steelSquare3.getBody());
        this.composites.push(this.steelSquare4.getBody());
    }

    getComposites() {
        return this.composites;
    }

    updateScore(score) {
        this.notifySubscribers('update-score-stage4',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
    }
}

export { BoomerangStage }