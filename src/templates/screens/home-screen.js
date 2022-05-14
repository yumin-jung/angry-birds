import { Ground } from '../../molecules/ground';
import { RedBird } from '../../organisms/birds/red-bird';
import { ChuckBird } from '../../organisms/birds/chuck-bird';
import { BombBird } from '../../organisms/birds/bomb-bird';
import { HalBird } from '../../organisms/birds/hal-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { CorporalPig } from '../../organisms/pigs/corporal-pig';
import { KingPig } from '../../organisms/pigs/king-pig';

import {
    RENDER_HEIGHT,
    RENDER_WIDTH,
    GROUND_HEIGHT,
    GROUND_X,
    GROUND_Y,
    BIRD_SIZE_RED,
    BIRD_SIZE_BOMB,
    BIRD_SIZE_CHUCK,
    BIRD_SIZE_HAL,
    PIG_SIZE_MINION,
    PIG_SIZE_CORPORAL,
    PIG_SIZE_KING,
    Composite
} from '../../atoms/constants';

class HomeScreen {
    constructor() {
        this.composites = [];

        this.groundTop = new Ground(GROUND_X, RENDER_HEIGHT - GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.groundBottom = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.groundLeft = new Ground(GROUND_HEIGHT / 2, RENDER_HEIGHT / 2, GROUND_HEIGHT, RENDER_HEIGHT);
        this.groundRight = new Ground(RENDER_WIDTH - GROUND_HEIGHT / 2, RENDER_HEIGHT / 2, GROUND_HEIGHT, RENDER_HEIGHT);

        this.RedBird = new RedBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_RED);
        this.ChuckBird = new ChuckBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_CHUCK);
        this.BombBird = new BombBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_BOMB);
        this.HalBird = new HalBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_HAL);
        this.MinionPig = new MinionPig(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, PIG_SIZE_MINION);
        this.CorporalPig = new CorporalPig(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, PIG_SIZE_CORPORAL);
        this.KingPig = new KingPig(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, PIG_SIZE_KING);

        this.composites.push(this.groundTop.getBody());
        this.composites.push(this.groundBottom.getBody());
        this.composites.push(this.groundLeft.getBody());
        this.composites.push(this.groundRight.getBody());

        this.composites.push(this.RedBird.getBody());
        this.composites.push(this.ChuckBird.getBody());
        this.composites.push(this.BombBird.getBody());
        this.composites.push(this.HalBird.getBody());
        this.composites.push(this.MinionPig.getBody());
        this.composites.push(this.CorporalPig.getBody());
        this.composites.push(this.KingPig.getBody());
    }

    getComposites() {
        return this.composites;
    }

    addBody(world) {
        let newBody = new RedBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_RED);
        let rand = Math.floor(Math.random() * 7);
        if (rand == 0) {
            newBody = new RedBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_RED);
        } else if (rand == 1) {
            newBody = new ChuckBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_CHUCK);
        } else if (rand == 2) {
            newBody = new BombBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_BOMB);
        } else if (rand == 3) {
            newBody = new HalBird(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, BIRD_SIZE_HAL);
        } else if (rand == 4) {
            newBody = new MinionPig(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, PIG_SIZE_MINION);
        } else if (rand == 5) {
            newBody = new CorporalPig(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, PIG_SIZE_CORPORAL);
        } else if (rand == 6) {
            newBody = new KingPig(GROUND_HEIGHT + Math.random() * 1000, GROUND_HEIGHT, PIG_SIZE_KING);
        }

        Composite.add(world, newBody.getBody());
    }
}

export { HomeScreen }