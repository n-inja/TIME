let ctx;

const rnd = (n) => {
	return Math.floor(Math.random()*n);
};

let x, y;
const borderWidth = 0;
//初期化
window.onload = () => {
    screenCanvas = document.getElementById('can');
    screenCanvas.width = 512;
    screenCanvas.height = 768;
    ctx = screenCanvas.getContext('2d');

    screenCanvas.addEventListener("mousemove", function(e) {
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left - borderWidth;
        y = e.clientY - rect.top - borderWidth;
    }, true);
};

const game = new Game();
//メイン関数
const main = () => {
    if (this.t === undefined) {
        this.t = 0;
        game.set();
    }
    game.update();
    game.draw();
    this.t++;
};
setInterval(main, 1000 / 60);
