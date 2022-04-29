import '../css/style.css';

import {
    Engine,
    Render,
    Runner,
    Mouse,
    Composite,
    Composites,
    MouseConstraint,
    Events,
    RENDER_WIDTH,
    RENDER_HEIGHT
} from './atoms/constants';

import { TutorialStage } from './templates/stages/tutorial-stage';
import { PyramidStage } from './templates/stages/pyramid-stage';
import { TwoPyramidStage } from './templates/stages/two-pyramid-stage';
import { Bird } from './molecules/bird';

let engine,
    render,
    mouse,
    mouseConstraint;
let stageName = "tutorial";
let firing = false;

let tutorialStage,
    pyramidStage,
    twoPyramidStage;


function setup() {
    createCanvas(0, 0)
    // load homeScreen
    engine = Engine.create();
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: RENDER_WIDTH,
            height: RENDER_HEIGHT,
            showAngleIndicator: false,
            wireframes: false,
            background: "lightblue"
        }
    })

    Runner.run(engine);
    Render.run(render);
    engine.timing.timeScale = 0.45;

    mouse = Mouse.create(render.canvas);

    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    render.mouse = mouse;
}

function draw() {
    // input에 따라서 screen바꾸기
    if (stageName == "tutorial") {
        Matter.Composite.clear(engine.world);

        tutorialStage = new TutorialStage();

        Composite.add(engine.world, tutorialStage.getStage());
        Composite.add(engine.world, mouseConstraint);

        Events.on(mouseConstraint, 'enddrag', function (event) {
            if ((event.body == tutorialStage.bird.getBody())
                && (tutorialStage.bird.body.position.x - 250) < -50) firing = true;
        })

        Events.on(engine, 'afterUpdate', function () {
            if (firing && Math.abs(tutorialStage.bird.body.position.x - 250) < 20
                && Math.abs(tutorialStage.bird.body.position.y - 250) < 20) {
                let newBird = new Bird(250, 250, 20);
                tutorialStage.bird = newBird;
                Composite.add(engine.world, tutorialStage.bird.getBody());
                tutorialStage.slingshot.body.bodyB = tutorialStage.bird.getBody();
                firing = false;
            }
        })
    } else if (stageName == "pyramid") {
        Matter.Composite.clear(engine.world);

        pyramidStage = new PyramidStage();

        Composite.add(engine.world, pyramidStage.getStage());
        Composite.add(engine.world, mouseConstraint);

        Events.on(mouseConstraint, 'enddrag', function (event) {
            if ((event.body == pyramidStage.bird.getBody())
                && (pyramidStage.bird.body.position.x - 250) < -50) firing = true;
        })

        Events.on(engine, 'afterUpdate', function () {
            if (firing && Math.abs(pyramidStage.bird.body.position.x - 250) < 20
                && Math.abs(pyramidStage.bird.body.position.y - 250) < 20) {
                let newBird = new Bird(250, 250, 20);
                pyramidStage.bird = newBird;
                Composite.add(engine.world, pyramidStage.bird.getBody());
                pyramidStage.slingshot.body.bodyB = pyramidStage.bird.getBody();
                firing = false;
            }
        })
    } else if (stageName == "twoPyramid") {
        Matter.Composite.clear(engine.world);

        twoPyramidStage = new TwoPyramidStage();

        Composite.add(engine.world, twoPyramidStage.getStage());
        Composite.add(engine.world, mouseConstraint);

        Events.on(mouseConstraint, 'enddrag', function (event) {
            if ((event.body == twoPyramidStage.bird.getBody())
                && (twoPyramidStage.bird.body.position.x - 250) < -50) firing = true;
        })

        Events.on(engine, 'afterUpdate', function () {
            if (firing && Math.abs(twoPyramidStage.bird.body.position.x - 250) < 20
                && Math.abs(twoPyramidStage.bird.body.position.y - 250) < 20) {
                let newBird = new Bird(250, 250, 20);
                twoPyramidStage.bird = newBird;
                Composite.add(engine.world, twoPyramidStage.bird.getBody());
                twoPyramidStage.slingshot.body.bodyB = twoPyramidStage.bird.getBody();
                firing = false;
            }
        })
    }
    noLoop();
}

function keyPressed() {
    if (key == ' ') {
        if (stageName == "tutorial") {
            stageName = "pyramid";
        } else if (stageName == "pyramid") {
            stageName = "twoPyramid";
        } else if (stageName == "twoPyramid") {
            stageName = "tutorial"
        }

        loop();
    }
}


function mouseReleased() {
}

window.setup = setup;
window.draw = draw;
window.mouseReleased = mouseReleased;
window.keyPressed = keyPressed;
