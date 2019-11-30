// Marco van Malsen

// Original created by
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

// Cell class
class Cell {
  constructor(i, j) {
    this.i = i; // column index
    this.j = j; // row index
    this.onstack = false; // is cell on the stack, used for statistics
    this.visited = false; // has cell been visited
    this.walls = [true, true, true, true]; // top, right, bottom, left
    this.x = this.i * w + 0.5 * (width - (cols * w)); // x-coordinate of upper-left-corner of cell
    this.y = statsHeight + this.j * w + 0.5 * (height - statsHeight - (rows * w)); // y-coordinate of upper-left-corner of cell
  }

  // check if neighbor cells (top, right, bottom, left) can be visited 
  checkNeighbors() {
    let neighbors = [];

    let t = grid[index(this.i, this.j - 1)];
    let r = grid[index(this.i + 1, this.j)];
    let b = grid[index(this.i, this.j + 1)];
    let l = grid[index(this.i - 1, this.j)];

    if (t && !t.visited) neighbors.push(t);
    if (r && !r.visited) neighbors.push(r);
    if (b && !b.visited) neighbors.push(b);
    if (l && !l.visited) neighbors.push(l);

    // return random neighbor, or undefined when no neighbors available
    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }
  }

  // highlight cell (current cell only)
  highlight() {
    noStroke();
    fill(0, 0, 255, 255);
    rect(this.x, this.y, w, w);
  }

  // show cell, draw walls
  show() {
    var x = this.x;
    var y = this.y;

    var myAlpha = this.visited ? 255 : 25;
    stroke(255, myAlpha)
    if (this.walls[0]) line(x, y, x + w, y); // top
    if (this.walls[1]) line(x + w, y, x + w, y + w); // right
    if (this.walls[2]) line(x + w, y + w, x, y + w); // bottom
    if (this.walls[3]) line(x, y + w, x, y); // left

    if (this.onstack) {
      noStroke();
      fill(0, 0, 255, 50);
      rect(x, y, w, w);
    }
  }
}