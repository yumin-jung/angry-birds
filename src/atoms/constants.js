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
export const BIRD_SIZE_RED = 25;
export const BIRD_SIZE_CHUCK = 30;
export const BIRD_SIZE_BOMB = 40;
export const BIRD_SIZE_HAL = 38;
export const PIG_SIZE_MINION = 20;
export const PIG_SIZE_CORPORAL = 25;
export const PIG_SIZE_KING = 50;

export const OBSTACLE_SQUARE_LENGTH = 60;

export const GROUND_HEIGHT = 30;
export const GROUND_X = RENDER_WIDTH / 2;
export const GROUND_Y = RENDER_HEIGHT - GROUND_HEIGHT / 2;

export const Elastic_LEFT_X = BIRD_X - 18;
export const Elastic_RIGHT_X = BIRD_X + 6;
export const Elastic_Y = BIRD_Y + 5;
export const SLIGSHOT_BODY_X = BIRD_X - 6;
export const SLIGSHOT_BODY_Y = GROUND_Y - 75;