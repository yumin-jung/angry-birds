import '../../css/style.css';

import {
    Engine,
    Render,
    Runner,
    Mouse,
    Composite,
    MouseConstraint,
    Events,
    RENDER_WIDTH,
    RENDER_HEIGHT,
    BIRD_X,
    BIRD_Y
} from '../atoms/constants';

import { HomeScreen } from '../templates/screens/home-screen';
import { TutorialStage } from '../templates/stages/tutorial-stage';
import { PyramidStage } from '../templates/stages/pyramid-stage';
import { TwoPyramidStage } from '../templates/stages/two-pyramid-stage';
import { BoomerangStage } from '../templates/stages/boomerang-stage';
import { ScoreDisplay } from '../templates/screens/score-display';

const stage1 = document.getElementById('stage1');
const stage2 = document.getElementById('stage2');
const stage3 = document.getElementById('stage3');
const stage4 = document.getElementById('stage4');

const playHomeButton = document.getElementById('play-home');
const restartButton = document.getElementById('restart-btn');
const homeButton = document.getElementById('home-btn');
const stageButton = document.getElementById('stage-btn');

let score,
    engine,
    render,
    mouse,
    runner,
    mouseConstraint,
    homeScreen,
    tutorialStage,
    pyramidStage,
    twoPyramidStage,
    boomerangStage;
let stageName = "home";
let firing = false;

function setup() {
    createCanvas(0, 0)

    score = new ScoreDisplay();

    // init render canvas
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

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    // add mouse constraint to canvas
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

// add composites to render canvas
function draw() {
    if (stageName == "home") {
        Composite.clear(engine.world);
        homeScreen = new HomeScreen();
        addComposites(homeScreen);
    }
    else if (stageName == "tutorial") {
        Composite.clear(engine.world);
        score.score_stage1 = 0;
        tutorialStage = new TutorialStage();
        getStage(tutorialStage);
    }
    else if (stageName == "pyramid") {
        Composite.clear(engine.world);
        score.score_stage2 = 0;
        pyramidStage = new PyramidStage();
        getStage(pyramidStage);
    }
    else if (stageName == "twoPyramid") {
        Composite.clear(engine.world);
        score.score_stage3 = 0;
        twoPyramidStage = new TwoPyramidStage();
        getStage(twoPyramidStage);
    }
    else if (stageName == "boomerang") {
        Composite.clear(engine.world);
        score.score_stage4 = 0;
        boomerangStage = new BoomerangStage();
        getStage(boomerangStage);
    }
    noLoop();
}


// remove composites from render canvas when stage button is clicked
stage1.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("tutorial");
});

stage2.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("pyramid");
});

stage3.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("twoPyramid");
});

stage4.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("boomerang");
});

// home screen to stage select screen
playHomeButton.addEventListener('click', function (event) {
    event.preventDefault();
    let awaitReset = new Promise((resolve) => {
        stageName = "selectStage";
        setTimeout(function () {
            resolve('success');
        }, 100)
    })
    awaitReset.then(() => {
        loop();
    })
});

// when user click restart button
restartButton.addEventListener('click', function (event) {
    event.preventDefault();
    if (stageName == "tutorial") {
        score.score_stage1 = 0;
        document.getElementById('rb-stage1-red1').style.display = "flex";
        document.getElementById('rb-stage1-red2').style.display = "flex";
        document.getElementById('rb-stage1-red3').style.display = "flex";
    } else if (stageName == "pyramid") {
        score.score_stage2 = 0;
        document.getElementById('rb-stage2-red1').style.display = "flex";
        document.getElementById('rb-stage2-chuck1').style.display = "flex";
        document.getElementById('rb-stage2-chuck2').style.display = "flex";
    } else if (stageName == "twoPyramid") {
        score.score_stage3 = 0;
        document.getElementById('rb-stage3-red1').style.display = "flex";
        document.getElementById('rb-stage3-chuck1').style.display = "flex";
        document.getElementById('rb-stage3-bomb1').style.display = "flex";
    } else if (stageName == "boomerang") {
        score.score_stage4 = 0;
        document.getElementById('rb-stage4-hal1').style.display = "flex";
        document.getElementById('rb-stage4-hal2').style.display = "flex";
        document.getElementById('rb-stage4-hal3').style.display = "flex";
    }
    resetStage(stageName);
});

// when user click home button at pause screen
homeButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("home");
});

// when user click stage select button at pause screen
stageButton.addEventListener('click', function (event) {
    event.preventDefault();
    resetStage("home");
});

// bird ability
function keyPressed() {
    if (key == ' ') {
        if (stageName == "tutorial") {
            if (tutorialStage.remainingBirds >= 0) {
                tutorialStage.flyingBird.ability();
            }
        }
        else if (stageName == "pyramid") {
            if (pyramidStage.remainingBirds >= 0) {
                pyramidStage.flyingBird.ability();
            }
        }
        else if (stageName == "twoPyramid") {
            if (twoPyramidStage.remainingBirds >= 0) {
                twoPyramidStage.flyingBird.ability();
            }
        }
        else if (stageName == "boomerang") {
            if (boomerangStage.remainingBirds >= 0) {
                boomerangStage.flyingBird.ability();
            }
        }
    }
}

// function at home and stage select stage
function mousePressed() {
    if (stageName == "home" || stageName == "selectStage") {
        homeScreen.addBody(engine.world);
    }
}

// reset events
function resetEvents() {
    if (stageName == "tutorial" || stageName == "pyramid"
        || stageName == "twoPyramid" || stageName == "boomerang") {
        Events.off(mouseConstraint, 'enddrag');
        Events.off(engine, 'afterUpdate');
    }
}

// check firing events
function firingEvents(stage) {
    if (stage.remainingBirds > 0) {
        Events.on(mouseConstraint, 'startdrag', function () {
            setTimeout(function () {
                stage.slingshot.elastic1.body.render.visible = true;
                stage.slingshot.elastic2.body.render.visible = true;
            }, 100)
        })

        Events.on(mouseConstraint, 'enddrag', function (event) {
            stage.flyingBird = stage.bird;
            stage.slingshot.elastic1.body.render.visible = false;
            stage.slingshot.elastic2.body.render.visible = false;
            if (event.body == stage.bird.body) {
                firing = true;
                stage.remaingBirds -= 1;
            }
        })

        Events.on(engine, 'afterUpdate', function () {
            addScore(stage)
            if (firing && Math.abs(stage.bird.body.position.x - BIRD_X) < 20
                && Math.abs(stage.bird.body.position.y - BIRD_Y) < 20
                && stage.remainingBirds > 0) {
                stage.firing(engine.world);
                firing = false;
            }
        })
    }
}

// add stage score
function addScore(stage) {
    let score = 0;
    if (stageName == "tutorial") {
        if (stage.pig.body.position.x > RENDER_WIDTH) {
            stage.pig.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "pyramid") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 2;
            stage.updateScore(score);
        }
    }
    else if (stageName == "twoPyramid") {
        if (stage.pig1.body.position.x > RENDER_WIDTH) {
            stage.pig1.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig2.body.position.x > RENDER_WIDTH) {
            stage.pig2.body.position.x = -100;
            score += 3;
            stage.updateScore(score);
        } else if (stage.pig3.body.position.x > RENDER_WIDTH) {
            stage.pig3.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        } else if (stage.pig4.body.position.x > RENDER_WIDTH) {
            stage.pig4.body.position.x = -100;
            score += 1;
            stage.updateScore(score);
        }
    }
    else if (stageName == "boomerang") {
        if (stage.pig.body.position.x < 700) {
            stage.pig.body.position.x = -100;
            score += 2;
            stage.updateScore(score);
        }
    }
}

// add composites of stage
function addComposites(stage) {
    Composite.add(engine.world, stage.getComposites());
    Composite.add(engine.world, mouseConstraint);
}

// add composites and firing events
function getStage(stage) {
    let getStageComposite = new Promise((resolve) => {
        addComposites(stage);

        setTimeout(function () {
            resolve('success');
        }, 250)
    })

    getStageComposite.then(() => {
        stage.subscribe(score);
        firingEvents(stage);
    })
}

// reset stage and change stageName
function resetStage(stage) {
    let awaitReset = new Promise((resolve) => {
        resetEvents();
        setTimeout(function () {
            resolve('success');
        }, 100)
    })
    awaitReset.then(() => {
        stageName = stage;
    }).then(() => {
        loop();
    })
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.mousePressed = mousePressed;