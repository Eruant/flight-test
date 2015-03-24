var Game = function (width, height) {

    this.createElements(width, height);

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
};

Game.prototype.draw = function () {

    this.ctx.fillStyle = 'hsl(200, 30%, 80%)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = 'hsl(60, 30%, 60%)';
    this.ctx.fillRect(0, this.canvas.height - 100, this.canvas.width, 100);

};

window.onload = function () {
    new Game(800, 600);
};
