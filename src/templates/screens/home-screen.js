import { Ground } from '../../molecules/ground';
import { RedBird } from '../../organisms/birds/red-bird';
import { ChuckBird } from '../../organisms/birds/chuck-bird';
import { BombBird } from '../../organisms/birds/bomb-bird';
import { HalBird } from '../../organisms/birds/hal-bird';
import { MatildaBird } from '../../organisms/birds/matilda-bird';
import { MinionPig } from '../../organisms/pigs/minion-pig';
import { CorporalPig } from '../../organisms/pigs/corporal-pig';
import { KingPig } from '../../organisms/pigs/king-pig';

import {
    RENDER_HEIGHT,
    RENDER_WIDTH,
    GROUND_HEIGHT,
    BIRD_SIZE_RED,
    BIRD_SIZE_BOMB,
    BIRD_SIZE_CHUCK,
    BIRD_SIZE_HAL,
    BIRD_SIZE_MATILDA,
    PIG_SIZE_MINION,
    PIG_SIZE_CORPORAL,
    PIG_SIZE_KING,
    GROUND_X,
    GROUND_Y
} from '../../atoms/constants';

class HomeScreen {
    constructor() {
        this.composites = [];

        this.groundBottom = new Ground(GROUND_X, GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);
        this.groundLeft = new Ground(GROUND_HEIGHT / 2, RENDER_HEIGHT / 2, GROUND_HEIGHT, RENDER_HEIGHT);
        this.groundRight = new Ground(RENDER_WIDTH - GROUND_HEIGHT / 2, RENDER_HEIGHT / 2, GROUND_HEIGHT, RENDER_HEIGHT);
        this.groundTop = new Ground(GROUND_X, RENDER_HEIGHT - GROUND_Y, RENDER_WIDTH, GROUND_HEIGHT);

        this.bird1 = new RedBird(100, 200, BIRD_SIZE_RED);
        this.bird2 = new ChuckBird(100, 200, BIRD_SIZE_CHUCK);
        this.bird3 = new BombBird(100, 200, BIRD_SIZE_BOMB);
        this.bird4 = new HalBird(100, 200, BIRD_SIZE_HAL);
        this.bird5 = new MatildaBird(100, 200, BIRD_SIZE_MATILDA);
        this.pig1 = new MinionPig(1000, 400, PIG_SIZE_MINION);
        this.pig2 = new CorporalPig(1000, 400, PIG_SIZE_CORPORAL);
        this.pig3 = new KingPig(1000, 400, PIG_SIZE_KING);

        this.composites.push(this.groundBottom.getBody());
        this.composites.push(this.groundLeft.getBody());
        this.composites.push(this.groundRight.getBody());
        this.composites.push(this.groundTop.getBody());
        this.composites.push(this.bird1.getBody());
        this.composites.push(this.bird2.getBody());
        this.composites.push(this.bird3.getBody());
        this.composites.push(this.bird4.getBody());
        this.composites.push(this.bird5.getBody());
        this.composites.push(this.pig1.getBody());
        this.composites.push(this.pig2.getBody());
        this.composites.push(this.pig3.getBody());
    }

    getScreen() {
        return this.composites;
    }
}

export { HomeScreen }