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
import { RedBird } from './organisms/birds/red-bird';

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

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

    // engine.timing.timeScale = 0.3 ;
    // engine.gravity.scale += 0.001;

    mouse = Mouse.create(render.canvas);

    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.05,
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
            if (event.body == tutorialStage.bird.getBody()) firing = true;
        })

        Events.on(engine, 'afterUpdate', function () {
            if (firing && Math.abs(tutorialStage.bird.body.position.x - 250) < 20
                && Math.abs(tutorialStage.bird.body.position.y - 450) < 20) {
                let newBird = new RedBird(250, 450, 20);
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
            if (event.body == pyramidStage.bird.getBody()) firing = true;
        })

        Events.on(engine, 'afterUpdate', function () {
            if (firing && Math.abs(pyramidStage.bird.body.position.x - 250) < 20
                && Math.abs(pyramidStage.bird.body.position.y - 450) < 20) {
                let newBird = new RedBird(250, 450, 20);
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
            if (event.body == twoPyramidStage.bird.getBody()) firing = true;
        })
        Events.on(engine, 'afterUpdate', function () {
            if (firing && Math.abs(twoPyramidStage.bird.body.position.x - 250) < 20
                && Math.abs(twoPyramidStage.bird.body.position.y - 450) < 20) {
                let newBird = new RedBird(250, 450, 20);
                twoPyramidStage.bird = newBird;
                Composite.add(engine.world, twoPyramidStage.bird.getBody());
                twoPyramidStage.slingshot.body.bodyB = twoPyramidStage.bird.getBody();
                firing = false;
            }
        })
    }
    noLoop();
}

button1.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("tutorial");
    stageName = "tutorial"
    loop();
});
button2.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("pyramid");
    stageName = "pyramid";
    loop();
});
button3.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("twopyramid");
    stageName = "twoPyramid";
    loop();
});

function keyPressed() {
    if (key == ' ') {
        loop();
    } else if (key == 'a') { // increase gravity
        engine.gravity.scale = 0.005;
        console.log(engine);
        setTimeout(() => {
            engine.gravity.scale = 0.001;
        }, 500)
    } else if (key == 'b') { // increase x-axis-gravity
        engine.gravity.x = 1;
        console.log(engine);
        setTimeout(() => {
            engine.gravity.x = 0;
        }, 500)
    }
}


window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
