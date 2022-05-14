import {
    Elastic_LEFT_X,
    Elastic_RIGHT_X,
    Elastic_Y,
    SLIGSHOT_BODY_X,
    SLIGSHOT_BODY_Y
} from '../../atoms/constants';

import { Body } from '../../atoms/body';
import { Box } from '../../molecules/box';
import { Elastic } from '../../molecules/elastic'

class Slingshot extends Body {
    constructor(bird) {
        super();
        this.bird = bird;
        this.elastic1 = new Elastic(Elastic_LEFT_X, Elastic_Y, this.bird.getBody());
        this.elastic2 = new Elastic(Elastic_RIGHT_X, Elastic_Y, this.bird.getBody());
        this.elastic1.body.render.visible = false;
        this.elastic2.body.render.visible = false;

        this.slingshotBody = new Box(SLIGSHOT_BODY_X, SLIGSHOT_BODY_Y, 0.1, 0.1);
        this.slingshotBody.body.render.sprite.texture = '../../../data/img/slingshot.png';
        this.slingshotBody.body.render.sprite.xScale = 0.15;
        this.slingshotBody.body.render.sprite.yScale = 0.15;
        this.slingshotBody.body.isStatic = true;
    }

    getLeftElastic() {
        return this.elastic1.getBody();
    }

    getRightElastic() {
        return this.elastic2.getBody();
    }

    getSlingshotBody() {
        return this.slingshotBody.getBody();
    }
}

export { Slingshot }