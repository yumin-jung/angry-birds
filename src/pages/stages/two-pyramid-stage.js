import { RedBird } from '../../organisms/birds/red-bird';
import { ChuckBird } from '../../organisms/birds/chuck-bird';
import { BombBird } from '../../organisms/birds/bomb-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../organisms/slingshot/slingshot';
import { Subject } from '../../subject'
import {
    Composites,
    RENDER_WIDTH,
    BIRD_X,
    BIRD_Y,
    BIRD_SIZE_RED,
    BIRD_SIZE_CHUCK,
    BIRD_SIZE_BOMB,
    PIG_SIZE_MINION,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    Composite
} from '../../atoms/constants';

class TwoPyramidStage extends Subject {
    constructor() {
        super();
        this.composites = [];
        this.remainingBirds = 3;

        this.bird = new RedBird(BIRD_X, BIRD_Y, BIRD_SIZE_RED);
        this.ground1 = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.ground2 = new Ground(960, 250, 200, 20);
        this.slingshot = new Slingshot(this.bird);
        this.pig = new MinionPig(1000, 300, PIG_SIZE_MINION);
        this.pyramid1 = Composites.pyramid(900, 300, 9, 10, 0, 0, function (x, y) {
            let box1 = new Box(x, y, 25, 40);
            return box1.getBody();
        });
        this.pyramid2 = Composites.pyramid(900, 0, 5, 10, 0, 0, function (x, y) {
            let box2 = new Box(x, y, 25, 40);
            return box2.getBody();
        });

        this.composites.push(this.slingshot.getLeftElastic());
        this.composites.push(this.slingshot.getRightElastic());
        this.composites.push(this.slingshot.getSlingshotBody());
        this.composites.push(this.ground1.getBody());
        this.composites.push(this.ground2.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig.getBody());
        this.composites.push(this.pyramid1);
        this.composites.push(this.pyramid2);
    }

    getComposites() {
        return this.composites;
    }

    updateScore(score) {
        this.notifySubscribers('update-score-stage3',
            { remainingBirds: this.remainingBirds },
            { scoreToAdd: score }
        )
    }

    firing(world) {
        let slingshot = this.slingshot;
        let bird = this.bird;
        let newBird;

        if (this.remainingBirds == 3) {
            document.getElementById('rb-stage3-red1').style.display = "none";
            newBird = new ChuckBird(BIRD_X, BIRD_Y, BIRD_SIZE_CHUCK);
        } else if (this.remainingBirds == 2) {
            document.getElementById('rb-stage3-chuck1').style.display = "none";
            newBird = new BombBird(BIRD_X, BIRD_Y, BIRD_SIZE_BOMB);
        } else if (this.remainingBirds == 1) {
            document.getElementById('rb-stage3-bomb1').style.display = "none";
        }
        this.remainingBirds -= 1;
        if (this.remainingBirds == 0) {
            slingshot.elastic1.body.bodyB = null;
            slingshot.elastic2.body.bodyB = null;
            Composite.remove(world, slingshot.getLeftElastic());
            Composite.remove(world, slingshot.getRightElastic());
        } else {
            this.bird = newBird;
            bird = this.bird;
            Composite.add(world, bird.getBody());
            slingshot.elastic1.body.bodyB = bird.getBody();
            slingshot.elastic2.body.bodyB = bird.getBody();
        }
    }
}

export { TwoPyramidStage }