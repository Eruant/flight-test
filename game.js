var world = {
  gravity: 0.98
};

var Plane = function (x, y) {

  this.x = x;
  this.y = y;

  this.forceX = 0;
  this.forceY = 0;

  this.throttle = 0;
  this.pitch = 0;

};

Plane.prototype.update = function () {

  //this.forceY += world.gravity;

  this.x += this.forceX;
  this.y += this.forceY;
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
  ctx.fillRect(10, 0, 2, 50);
  ctx.fillStyle = 'hsl(0, 30%, 30%)';
  ctx.translate(0, 50 - (50 * this.throttle));
  ctx.fillRect(0, 0, 20, 4);
  ctx.restore();

};

var Game = function (width, height) {

  this.createElements(width, height);
  this.plane = new Plane(width * 0.5, height * 0.5);

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

  this.tick();

};

Game.prototype.stop = function () {
};

Game.prototype.tick = function () {

  this.update();
  this.draw();

  window.requestAnimationFrame(this.tick.bind(this));

};

Game.prototype.update = function () {

  this.plane.update();
};

Game.prototype.draw = function () {

  this.ctx.fillStyle = 'hsl(200, 30%, 80%)';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.fillStyle = 'hsl(60, 30%, 60%)';
  this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

  this.plane.draw(this.ctx);

};

window.onload = function () {
  new Game(800, 600);
};

window.addEventListener('keydown', function() {
  console.log('key pressed');
}, false);
