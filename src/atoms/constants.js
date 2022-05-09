export let Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    Events = Matter.Events,
    Constraint = Matter.Constraint,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies;

export const RENDER_WIDTH = 1200;
export const RENDER_HEIGHT = 600;
export const BIRD_X = 250;
export const BIRD_Y = 450;
export const BIRD_SIZE_RED = 20;
export const PIG_SIZE_MINION = 20;

export const GROUND_HEIGHT = 30;
export const GROUND_X = RENDER_WIDTH / 2;
export const GROUND_Y = RENDER_HEIGHT - GROUND_HEIGHT / 2;