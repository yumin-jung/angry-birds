import { Bird } from '../../molecules/bird';
import { Box } from '../../molecules/box';
import { Ground } from '../../molecules/ground';
import { Slingshot } from '../../molecules/slingshot';

class TutorialStage {
    constructor() {
        this.composites = [];

        this.bird = new Bird(250, 250, 20);
        this.ground = new Ground(450, 370, 915, 30);
        this.slingshot = new Slingshot(250, 250, this.bird.getBody());
        this.box = new Box(600, 200, 25, 40);

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