import { RedBird } from '../../organisms/birds/red-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../molecules/slingshot';
import { Box } from '../../molecules/box';

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
        this.slingshot1 = new Slingshot(BIRD_X + 4, BIRD_Y, this.bird.getBody());
        this.slingshot2 = new Slingshot(BIRD_X - 20, BIRD_Y, this.bird.getBody());
        this.slingshot1.body.render.visible = false;
        this.slingshot2.body.render.visible = false;

        this.box = new Box(BIRD_X - 8, GROUND_Y - 80, 0.1, 0.1);
        this.box.body.render.sprite.texture = '../../../data/img/slingshot.png';
        this.box.body.render.sprite.xScale = 0.15;
        this.box.body.render.sprite.yScale = 0.15;
        this.box.body.isStatic = true;

        this.pig = new MinionPig(1000, 400, PIG_SIZE_MINION);

        this.composites.push(this.ground.getBody());
        this.composites.push(this.box.getBody());
        this.composites.push(this.slingshot1.getBody());
        this.composites.push(this.slingshot2.getBody());
        this.composites.push(this.bird.getBody());
        this.composites.push(this.pig.getBody());
    }

    getStage() {
        return this.composites;
    }
}

export { TutorialStage }