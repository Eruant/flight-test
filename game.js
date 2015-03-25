var world = {
  width: 800,
  height: 600,
  gravity: 0.98,
  drag: 0.8
};

var IO = function () {

  this.activeInput = {
    up: false,
    down: false,
    left: false,
    right: false
  };

  this.addEvents();

};

IO.prototype.addEvents = function () {

  window.addEventListener('keydown', this.handleEvent.bind(this), false);
  window.addEventListener('keyup', this.handleEvent.bind(this), false);

};

IO.prototype.handleEvent = function (e) {

  switch (e.type) {
    case 'keydown':
      this.setKeyState(e.keyCode, true);
      break;
    case 'keyup':
      this.setKeyState(e.keyCode, false);
  }

};

IO.prototype.setKeyState = function (code, value) {

  switch (code) {
    case 37: // left
      this.activeInput.left = value;
      break;
    case 39: // right
      this.activeInput.right = value;
      break;
    case 38: // up
      this.activeInput.up = value;
      break;
    case 40: // down
      this.activeInput.down = value;
      break;
  }

};

var Plane = function (x, y) {

  this.x = x;
  this.y = y;

  this.forceX = 0;
  this.forceY = 0;

  this.airSpeed = 0;

  this.throttle = 0;
  this.pitch = 0;

  this.maxAirSpeed = 10;

};

Plane.prototype.update = function (input) {

  if (input.left && !input.right) {
    this.pitch -= 0.05;
  } else if (!input.left && input.right) {
    this.pitch += 0.05;
  }

  if (input.up && !input.down) {
    this.throttle += 0.05;
  } else if (!input.up && input.down) {
    this.throttle -= 0.05;
  }

  if (this.throttle > 1) {
    this.throttle = 1;
  } else if (this.throttle < 0) {
    this.throttle = 0;
  }

  this.airSpeed = (this.airSpeed * world.drag) + this.throttle;

  // thrust
  this.forceX += Math.cos(this.pitch) * this.airSpeed;
  this.forceY += Math.sin(this.pitch) * this.airSpeed;

  // lift
  this.forceX += Math.cos(this.pitch - 1.57079) * (this.airSpeed * 0.25);
  this.forceY += Math.sin(this.pitch - 1.57079) * (this.airSpeed * 0.25);

  this.forceY += world.gravity;
  
  var scale = 0.05;

  this.x += (this.forceX) * scale;
  this.y += (this.forceY) * scale;

  if (this.x < 0) {
    this.x += world.width;
  } else if (this.x > world.width) {
    this.x -= world.width;
  }

};

Plane.prototype.draw = function (ctx) {

  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.pitch);
  ctx.fillStyle = 'hsl(180, 30%, 60%)';

  ctx.fillRect(-10, 0, 30, 15);
  ctx.fillRect(-5, -4, 10, 4);

  ctx.beginPath();
  ctx.moveTo(-10, 0);
  ctx.lineTo(-50, 0);
  ctx.lineTo(-30, 12);
  ctx.lineTo(-10, 15);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // draw plane HUD
  ctx.save();
  ctx.translate(20, 20);
  ctx.fillStyle = 'hsl(180, 30%, 30%)';

  ctx.fillText(Math.floor(this.airSpeed * 100) * 0.01, 0, 0);

  ctx.fillRect(10, 0, 2, 50);
  ctx.fillStyle = 'hsl(0, 30%, 30%)';
  ctx.translate(0, 50 - (50 * this.throttle));
  ctx.fillRect(0, 0, 20, 4);
  ctx.restore();

};

var Game = function (width, height) {

  this.createElements(width, height);
  this.plane = new Plane(width * 0.5, height * 0.5);
  this.io = new IO();
  this.state = 'stopped';

  this.start();

};

Game.prototype.createElements = function (width, height) {

  var body = document.querySelector('body');

  this.canvas = document.createElement('canvas');
  this.canvas.width = width;
  this.canvas.height = height;

  this.ctx = this.canvas.getContext('2d');

  body.appendChild(this.canvas);

};

Game.prototype.start = function () {

  this.state = 'playing';

  this.tick();

};

Game.prototype.stop = function () {

  this.state = 'stopped';
};

Game.prototype.tick = function () {

  if (this.state === 'playing') {

    this.update();
    this.draw();

    window.requestAnimationFrame(this.tick.bind(this));

  }

};

Game.prototype.update = function () {

  this.plane.update(this.io.activeInput);
};

Game.prototype.draw = function () {

  this.ctx.fillStyle = 'hsl(200, 30%, 80%)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.fillStyle = 'hsl(60, 30%, 60%)';
  this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

  this.plane.draw(this.ctx);

};

window.onload = function () {
  new Game(world.width, world.height);
};
