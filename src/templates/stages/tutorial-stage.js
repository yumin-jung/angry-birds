import { RedBird } from '../../organisms/birds/red-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { SteelSquare } from '../../organisms/obstacles/steel-square';
import { Subject } from '../../pages/subject'
import {
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    PIG_SIZE_MINION,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    OBSTACLE_SQUARE_LENGTH,
    Composite
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

        this.flyingBird = this.bird;
    }

    getComposites() {
        return this.composites;
    }

    // transmit information to ScoreDisplay
    updateScore(score) {
        this.notifySubscribers('update-score-stage1',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
    }

    // control bird firing
    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage1-red1').style.display = "none";
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage1-red2').style.display = "none";
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage1-red3').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            let newBird = new RedBird(BIRD_X, BIRD_Y, 20);
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { TutorialStage }