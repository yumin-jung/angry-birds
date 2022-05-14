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

import { HomeScreen } from './templates/screens/home-screen';
import { TutorialStage } from './templates/stages/tutorial-stage';
import { PyramidStage } from './templates/stages/pyramid-stage';
import { TwoPyramidStage } from './templates/stages/two-pyramid-stage';
import { RedBird } from './organisms/birds/red-bird';
import { ScoreDisplay } from './ScoreDisplay';

const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const stage4 = document.getElementById('stage4');

const playHomeButton = document.getElementById('play-home');
const pauseButton = document.getElementById('pause-btn');
const playButton = document.getElementById('play-btn');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');
const stageButton = document.getElementById('stage-btn');

let score;

let engine,
    render,
    mouse,
    runner,
    mouseConstraint;
let stageName = "home";
let firing = false;

let homeScreen,
    tutorialStage,
    pyramidStage,
    twoPyramidStage;

function setup() {
    createCanvas(0, 0)

    score = new ScoreDisplay();

    // load homeScreen
    engine = Engine.create();
    render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: RENDER_WIDTH,
            height: RENDER_HEIGHT,
            showAngleIndicator: false, // --> 나중에 false로
            wireframes: false,
            background: "lightblue"
        }
    })

    // Runner.run(engine);
    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

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
    if (stageName == "home") {
        Composite.clear(engine.world);

        homeScreen = new HomeScreen();

        Composite.add(engine.world, homeScreen.getScreen());
        Composite.add(engine.world, mouseConstraint);
    }
    if (stageName == "tutorial") {
        Composite.clear(engine.world);

        tutorialStage = new TutorialStage();

        let getTutorialStageComposite = new Promise((resolve) => {
            Composite.add(engine.world, tutorialStage.getStage());
            Composite.add(engine.world, mouseConstraint);

            setTimeout(function () {
                resolve('success');
            }, 250)
        })

        getTutorialStageComposite.then(() => {
            Events.on(mouseConstraint, 'startdrag', function () {
                tutorialStage.slingshot1.body.render.visible = true;
                tutorialStage.slingshot2.body.render.visible = true;
            })

            Events.on(mouseConstraint, 'enddrag', function (event) {
                console.log(event.body == tutorialStage.bird.body)
                tutorialStage.slingshot1.body.render.visible = false;
                tutorialStage.slingshot2.body.render.visible = false;
                if (event.body == tutorialStage.bird.body) firing = true;
            })

            Events.on(engine, 'afterUpdate', function () {
                if (firing && Math.abs(tutorialStage.bird.body.position.x - 250) < 20
                    && Math.abs(tutorialStage.bird.body.position.y - 450) < 20) {
                    let newBird = new RedBird(250, 450, 20);
                    tutorialStage.bird = newBird;
                    Composite.add(engine.world, tutorialStage.bird.getBody());
                    tutorialStage.slingshot1.body.bodyB = tutorialStage.bird.getBody();
                    tutorialStage.slingshot2.body.bodyB = tutorialStage.bird.getBody();
                    firing = false;
                }
            })
        })

    } else if (stageName == "pyramid") {
        Composite.clear(engine.world);

        pyramidStage = new PyramidStage();

        let getPyramidStageComposite = new Promise((resolve) => {
            Composite.add(engine.world, pyramidStage.getStage());
            Composite.add(engine.world, mouseConstraint);

            setTimeout(function () {
                resolve('success');
            }, 250)
        })

        getPyramidStageComposite.then(() => {
            Events.on(mouseConstraint, 'enddrag', function (event) {
                console.log(event.body == pyramidStage.bird.body)
                if (event.body == pyramidStage.bird.body) firing = true;
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
        })
    } else if (stageName == "twoPyramid") {
        Composite.clear(engine.world);

        twoPyramidStage = new TwoPyramidStage();

        let getTwoPyramidStageComposite = new Promise((resolve) => {
            Composite.add(engine.world, twoPyramidStage.getStage());
            Composite.add(engine.world, mouseConstraint);

            setTimeout(function () {
                resolve('success');
            }, 250)
        })

        getTwoPyramidStageComposite.then(() => {
            Events.on(mouseConstraint, 'enddrag', function (event) {
                console.log(event.body == twoPyramidStage.bird.body)
                if (event.body == twoPyramidStage.bird.body) firing = true;
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
        })
    }
    noLoop();
}

stage1.addEventListener('click', function (event) {
    event.preventDefault();
    resetEvents();
    score.resetScore();
    stageName = "tutorial";
    loop();
});
stage2.addEventListener('click', function (event) {
    event.preventDefault();
    resetEvents();
    score.resetScore();
    stageName = "pyramid";
    loop();
});
stage3.addEventListener('click', function (event) {
    event.preventDefault();
    resetEvents();
    score.resetScore();
    stageName = "twoPyramid";
    loop();
});
stage4.addEventListener('click', function (event) {
    event.preventDefault();
    resetEvents();
    score.resetScore();
    stageName = "boomerang";
    loop();
});

playHomeButton.addEventListener('click', function (event) {
    event.preventDefault();
    stageName = "selectStage";
    loop();
});

pauseButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(engine)
});

playButton.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(engine)
});

restartButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetEvents();
    score.resetScore();
    loop();
});

homeButton.addEventListener('click', function (event) {
    event.preventDefault();
    stageName = "home";
    score.resetScore();
    loop();
});

stageButton.addEventListener('click', function (event) {
    event.preventDefault();
    stageName = "home";
    score.resetScore();
    loop();
});

function keyPressed() {
    if (key == ' ') {
        resetEvents();
        score.resetScore();
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
    } else if (key == 's') {
        console.log("s");
        score.addScore(1);
    }
}

function mousePressed() {
    if (stageName == "home" || stageName == "selectStage") {
        homeScreen.addBody(engine.world);
    }
}

function resetEvents() {
    if (stageName == "tutorial" || stageName == "pyramid" || stageName == "twopyramid") {
        Events.off(mouseConstraint, 'enddrag');
        Events.off(engine, 'afterUpdate');
    }
}


window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.mousePressed = mousePressed;