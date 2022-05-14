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

const button0 = document.getElementById('button0');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

let engine,
    render,
    mouse,
    mouseConstraint;
let stageName = "home";
let firing = false;

let homeScreen,
    tutorialStage,
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
    if (stageName == "home") {
        Composite.clear(engine.world);

        homeScreen = new HomeScreen();

        let getScreenComposite = new Promise((resolve) => {
            Composite.add(engine.world, homeScreen.getScreen());
            Composite.add(engine.world, mouseConstraint);

            setTimeout(function () {
                resolve('success');
            }, 250)
        })

        // getScreenComposite.then(() => {
        //     Events.on(mouseConstraint, 'enddrag', function (event) {
        //         console.log(event.body == tutorialStage.bird.body)
        //         if (event.body == tutorialStage.bird.body) firing = true;
        //     })

        //     Events.on(engine, 'afterUpdate', function () {
        //         if (firing && Math.abs(tutorialStage.bird.body.position.x - 250) < 20
        //             && Math.abs(tutorialStage.bird.body.position.y - 450) < 20) {
        //             let newBird = new RedBird(250, 450, 20);
        //             tutorialStage.bird = newBird;
        //             Composite.add(engine.world, tutorialStage.bird.getBody());
        //             tutorialStage.slingshot.body.bodyB = tutorialStage.bird.getBody();
        //             firing = false;
        //         }
        //     })
        // })
    }
    if (stageName == "tutorial") {
        Composite.clear(engine.world);

        tutorialStage = new TutorialStage();

        let getStageComposite = new Promise((resolve) => {
            Composite.add(engine.world, tutorialStage.getStage());
            Composite.add(engine.world, mouseConstraint);

            setTimeout(function () {
                resolve('success');
            }, 250)
        })

        getStageComposite.then(() => {
            Events.on(mouseConstraint, 'enddrag', function (event) {
                console.log(event.body == tutorialStage.bird.body)
                if (event.body == tutorialStage.bird.body) firing = true;
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
        })

    } else if (stageName == "pyramid") {
        Composite.clear(engine.world);

        pyramidStage = new PyramidStage();

        Composite.add(engine.world, pyramidStage.getStage());
        Composite.add(engine.world, mouseConstraint);

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
    } else if (stageName == "twoPyramid") {
        Composite.clear(engine.world);

        twoPyramidStage = new TwoPyramidStage();

        Composite.add(engine.world, twoPyramidStage.getStage());
        Composite.add(engine.world, mouseConstraint);

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
    }
    noLoop();
}

button0.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("home");
    stageName = "home";
    loop();
});
button1.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("tutorial");
    stageName = "tutorial";
    resetEvents();
    loop();
});
button2.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("pyramid");
    stageName = "pyramid";
    resetEvents();
    loop();
});
button3.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("twopyramid");
    stageName = "twoPyramid";
    resetEvents();
    loop();
});

function keyPressed() {
    if (key == ' ') {
        resetEvents();
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

function resetEvents() {
    Events.off(mouseConstraint, 'enddrag');
    Events.off(engine, 'afterUpdate');
}


window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
