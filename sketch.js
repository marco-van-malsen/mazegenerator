// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

var cols; // number of columns on the grid
var cellsVisited; // total number of visted cells
var current; // currently active cell
var grid = []; // The Grid
var rows; // number of rows on the grid
var stack = []; // stack for backtracker
var statsHeight = 20; // heoiht of statusbar in pixels
var w = 40; // cell width and height

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = floor((width) / w);
  rows = floor((height - statsHeight) / w);

  // create the grid
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  // select upper left cell and mark it active
  current = grid[0];
  current.visited = true;

  // initiate total number of visited cells
  cellsVisited = 0;
}

function draw() {
  background(0);

  // draw statistics
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  text("MAZE-GENERATOR", 0.5 * width, 0.5 * statsHeight);
  textAlign(LEFT, CENTER);
  text("Stack length: " + stack.length, 5, 0.5 * statsHeight);
  textAlign(RIGHT, CENTER);
  text(nfc((cellsVisited / (grid.length - 1) * 100), 2) + "% Completed", cols * w - 5, 0.5 * statsHeight);

  // draw the grid
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  // highlight the current cell
  if (cellsVisited > 0 & stack.length > 0) current.highlight();

  // check for unvisited neighbours
  let next = current.checkNeighbors();

  // while the current cell has any unvisited neighbour cell
  if (next) {
    // push the current cell onto the stack
    stack.push(current);
    current.onstack = true;

    // remove walls between current and next cell
    removeWalls(current, next);

    // set next cell as current
    cellsVisited++;
    current = next;
    current.visited = true;

    // no more neighbours, pop the last cell from the stack
  } else if (stack.length > 0) {
    current = stack.pop();
    current.onstack = false;

    // stop the loop
  } else {
    if (cellsVisited > 0 & stack.length === 0) noLoop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}


function removeWalls(c, n) {
  let x = c.i - n.i;
  let y = c.j - n.j;

  if (x === 1) {
    c.walls[3] = false;
    n.walls[1] = false;
  } else if (x === -1) {
    c.walls[1] = false;
    n.walls[3] = false;
  }

  if (y === 1) {
    c.walls[0] = false;
    n.walls[2] = false;
  } else if (y === -1) {
    c.walls[2] = false;
    n.walls[0] = false;
  }
}