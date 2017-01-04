const rnd = (n) => {
    return Math.floor(Math.random() * n);
};

let x, y, ctx;
const borderWidth = 0;
//初期化
window.onload = () => {
    screenCanvas = document.getElementById('can');
    screenCanvas.width = 512;
    screenCanvas.height = 768;
    ctx = screenCanvas.getContext('2d');

    screenCanvas.addEventListener("mousemove", (e) => {
        var rect = e.target.getBoundingClientRect();
        x = e.clientX - rect.left - borderWidth;
        y = e.clientY - rect.top - borderWidth;
    }, true);
};

openWindow = (url, name) => {
    if (!window.open(url, name)) {
        location.href = url;
    }
}

//メイン関数
const main = () => {
    if (this.t === undefined) {
        this.t = 0;
        this.game = new Game();
        x = 512 / 2;
        y = 768 / 8 * 7;
        this.button = new Button();
    }
    if (!this.game.isGameOver()) {
        this.game.update();
        if (this.game.isGameClear()) {
            this.t--;
            this.button.setColor("#FFFFFF");
            this.button.update();
            if (this.button.cnt >= 100) {
                openWindow('http://twitter.com/?status=可変時間シューティングTIME%0a体感時間' + Math.floor(this.t / 60) + '秒でクリア！%0ahttps://n-inja.github.io/TIME/game/', '_blank');
				this.t = 0;
	            this.game = new Game();
	            x = 512 / 2;
	            y = 768 / 8 * 7;
	            this.button = new Button();
            }
        }
    } else {
        this.button.update();
        if (this.button.cnt >= 100) {
            this.t = 0;
            this.game = new Game();
            x = 512 / 2;
            y = 768 / 8 * 7;
            this.button = new Button();
        }
    }
	drawString("a", 0, 0, 10, "#000000");
    this.game.draw();
    if (this.game.isGameClear()) {
        drawString("ツブヤク？", 0, 100, "#FFFFFF");
        this.button.draw();
    }
    if (this.game.isGameOver()) {
        drawString("マキモドス？", 0, 100, "#000000");
        this.button.draw();
    }
    this.t++;
};
setInterval(main, 1000 / 60);
