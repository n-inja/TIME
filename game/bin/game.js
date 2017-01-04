class Game {
    constructor() {
        this.windowX = 512;
        this.windowY = 768;
        this.t = 0;
        this.player = new Player();
        this.enemy = new Enemy();
        this.deltaT = 1;
        this.gameOverPoint = 0;
        this.gameOverMax = 100000;
        this.color = "#000000";
    }
	isGameOver(){
		return this.gameOverPoint >= this.gameOverMax;
	}
	isGameClear(){
		return this.enemy.s < 5;
	}
	getTime(){
		return this.t;
	}
    set() {}
    update() {
        this.deltaT = 1;
        let cnt = 0;
        let minLeng = 1000000;
        for (let i = 0; i < this.enemy.bullet.length; i++) {
            if (((this.player.x - this.enemy.bullet[i].x) * (this.player.x - this.enemy.bullet[i].x) + (this.player.y - this.enemy.bullet[i].y) * (this.player.y - this.enemy.bullet[i].y)) < minLeng) {
                minLeng = ((this.player.x - this.enemy.bullet[i].x) * (this.player.x - this.enemy.bullet[i].x) + (this.player.y - this.enemy.bullet[i].y) * (this.player.y - this.enemy.bullet[i].y));
            }
        }
        this.deltaT = Math.min(1, minLeng / 10000);
        for (let i = 0; i < this.player.shot.length; i++) {
            if (this.player.shot[i].enable) {
                if ((this.enemy.x - this.player.shot[i].x) * (this.enemy.x - this.player.shot[i].x) + (this.enemy.y - this.player.shot[i].y) * (this.enemy.y - this.player.shot[i].y) < this.enemy.s * this.enemy.s) {
                    this.enemy.damage();
                    this.player.shot[i].enable = false;
                    this.player.shot[i].hit = true;
                }
            }
        }
        if (this.gameOverPoint < this.gameOverMax) {
            this.gameOverPoint += 1 / this.deltaT - 1;
        } else {
            this.deltaT = 0;
        }
		this.t += this.deltaT;
        let co = Math.floor(this.gameOverPoint / this.gameOverMax * 255);
        if (co < 16) {
            this.color = "#" + "0" + co.toString(16) + "0" + co.toString(16) + "0" + co.toString(16);
        } else {
            this.color = "#" + co.toString(16) + co.toString(16) + co.toString(16);
        }
		if(this.gameOverPoint >= this.gameOverMax){
			this.color = "#FFFFFF";
		}
        this.player.update(this.deltaT);
        this.enemy.update(this.deltaT);
    }
    draw() {
        drawRect(0, 0, this.windowX, this.windowY, this.color);
        this.player.draw();
        this.enemy.draw(this.deltaT);
    }
}

class Player {
    constructor() {
        this.x = 512 / 2;
        this.y = 768 / 8 * 7;
        this.v = 1;
        this.t = 0;
        this.color = "#00FF00"
        this.shot = new Array();
    }
    update(t) {
        for (let i = 0; i < this.shot.length; i++) {
            this.shot[i].update(t);
        }
        for (let i = 0; i < this.shot.length; i++) {
            if (!this.shot[i].enable && !this.shot[i].hit) {
                this.shot.splice(i, 1);
                i--;
            }
        }
		if(this.x === x){
			this.x = x + 0.0001;
		}
		if(this.y === y){
			this.y = y + 0.0001;
		}
        let l = Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y));
        let dx = (x - this.x) / l;
        let dy = (y - this.y) / l;
        this.x += dx * this.v * t * l / 2;
        this.y += dy * this.v * t * l / 2;
        this.t += t;
        if (this.t > 6) {
            this.t -= 6;
            let shot = new Shot(this.x, this.y);
            this.shot.push(shot);
        }
    }
    draw() {
        drawCircle(this.x, this.y, 10, this.color);
        for (let i = 0; i < this.shot.length; i++) {
            this.shot[i].draw();
        }
    }
}

class Shot {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.v = 20;
        this.color = "#00FFFF"
        this.s = 5;
        this.t = 0;
        this.r = 1;
        this.enable = true;
        this.hit = false;
    }
    update(t) {
        this.t += t;
        if (!this.hit) {
            this.y -= this.v * t;
        }
        if (this.t > 100) {
            this.enable = false;
        }
        if (this.hit) {
            this.r *= (1.0 + Math.random() / 4);
        }
    }
    draw() {
        if (this.enable && this.x > -5 && this.x < 517 && this.y > -5 && this.y < 773) {
            drawTriangle(this.x, this.y - this.s, this.x - 0.86602540378 * this.s, this.y + 0.5 * this.s, this.x + 0.86602540378 * this.s, this.y + 0.5 * this.s, this.color);
        }
        if (this.hit) {
            drawCircle(this.x, this.y, this.r, this.color);
        }
    }
}

class Enemy {
    constructor() {
        this.x = 512 / 2;
        this.y = 768 / 5;
        this.x1 = this.x;
        this.y1 = this.y;
        this.x2 = this.x;
        this.y2 = this.y;
        this.x3 = this.x;
        this.y3 = this.y;
        this.x4 = this.x;
        this.y4 = this.y;
        this.delta = 0.01;
        this.s = 100;
        this.visualS = 100;
        this.t = 0;
        this.subT = 0;
        this.theta = 0;
        this.color = "#FFFFFF"
        this.bullet = new Array();
        this.hp = 300;
    }
    update(t) {
        for (let i = 0; i < this.bullet.length; i++) {
            this.bullet[i].update(t);
        }
        for (let i = 0; i < this.bullet.length; i++) {
            if (!this.bullet[i].enable) {
                this.bullet.splice(i, 1);
                i--;
            }
        }
        this.visualS = this.s + 10 * Math.sin(7 * this.theta / 13);
		if(this.hp <= 0){
			this.visualS = this.s;
		}
        this.theta += t * this.delta;
        if (this.theta > Math.PI * 2) {
            this.theta -= Math.PI * 2;
        }
        this.t += t;
        this.subT += t;
        if (this.hp > 0) {
            if (this.hp > 250) {
                if (this.t > 10) {
                    this.t -= 10;
                    this.nWay(7, 15, "#FFFFFF");
                }
            } else {
                if (this.hp > 200) {
                    if (this.t > 10) {
                        this.t -= 10;
                        this.nWay(8, 18, "#0000FF");
                    }
                } else {
                    if (this.t > 7) {
                        this.t -= 7;
                        this.nWay(10, 20, "#AA00FF");
                    }
                    if (this.hp < 100) {
                        if (this.subT > 4) {
                            this.subT = 0;
                            this.nWay(3, 45, "#AAFFAA");
                        }
                    }
                }
            }
            this.x1 = this.x + this.visualS * Math.cos(this.theta);
            this.y1 = this.y + this.visualS * Math.sin(this.theta);
            this.x2 = this.x + this.visualS * Math.cos(this.theta + Math.PI / 2);
            this.y2 = this.y + this.visualS * Math.sin(this.theta + Math.PI / 2);
            this.x3 = this.x + this.visualS * Math.cos(this.theta + Math.PI);
            this.y3 = this.y + this.visualS * Math.sin(this.theta + Math.PI);
            this.x4 = this.x + this.visualS * Math.cos(this.theta + Math.PI * 3 / 2);
            this.y4 = this.y + this.visualS * Math.sin(this.theta + Math.PI * 3 / 2);
        } else {

            this.s *= 0.99;
            this.x1 = this.x + this.visualS * Math.cos(this.theta);
            this.y1 = this.y + this.visualS * Math.sin(this.theta);
            this.x2 = this.x + this.visualS * Math.cos(this.theta + Math.PI / 2);
            this.y2 = this.y + this.visualS * Math.sin(this.theta + Math.PI / 2);
            this.x3 = this.x + this.visualS * Math.cos(this.theta + Math.PI);
            this.y3 = this.y + this.visualS * Math.sin(this.theta + Math.PI);
            this.x4 = this.x + this.visualS * Math.cos(this.theta + Math.PI * 3 / 2);
            this.y4 = this.y + this.visualS * Math.sin(this.theta + Math.PI * 3 / 2);
        }
    }
    damage() {
        this.hp -= 2;
        this.delta += 0.001;
    }
    nWay(n, v, c) {
        let a = Math.random() * Math.PI * 2;
        for (let i = 0; i < n; i++) {
            let b = new Bullet(this.x, this.y, v, a + Math.PI * 2 / n * i, c);
            this.bullet.push(b);
        }
    }
    draw(t) {
        for (let i = 0; i < this.bullet.length; i++) {
            this.bullet[i].draw(t);
        }
        drawFreeRect(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4, this.color);
    }
}

class Bullet {
    constructor(x, y, v, theta, color) {
        this.x = x;
        this.y = y;
        this.v = v;
        this.vx = this.v * Math.cos(theta);
        this.vy = this.v * Math.sin(theta);
        this.s = 10;
        this.color = color;
        this.x1 = this.x + this.s * Math.cos(theta);
        this.y1 = this.y + this.s * Math.sin(theta);
        this.x2 = this.x + this.s * Math.cos(theta + Math.PI * 2 / 3);
        this.y2 = this.y + this.s * Math.sin(theta + Math.PI * 2 / 3);
        this.x3 = this.x + this.s * Math.cos(theta + Math.PI * 4 / 3);
        this.y3 = this.y + this.s * Math.sin(theta + Math.PI * 4 / 3);
        this.theta = theta;
        this.enable = true;
        this.t = 0;
        this.r = 100;
    }
    update(t) {
        this.t += t;
        this.vx = this.v * Math.cos(this.theta);
        this.vy = this.v * Math.sin(this.theta);
        this.x += this.vx * t;
        this.y += this.vy * t;
        this.x1 = this.x + this.s * Math.cos(this.theta);
        this.y1 = this.y + this.s * Math.sin(this.theta);
        this.x2 = this.x + this.s * Math.cos(this.theta + Math.PI * 2 / 3);
        this.y2 = this.y + this.s * Math.sin(this.theta + Math.PI * 2 / 3);
        this.x3 = this.x + this.s * Math.cos(this.theta + Math.PI * 4 / 3);
        this.y3 = this.y + this.s * Math.sin(this.theta + Math.PI * 4 / 3);
        this.r -= t;
        if (this.t > 100) {
            this.enable = false;
        }
    }
    draw(t) {
        if (this.enable) {
			if(this.x > -5 && this.x < 517 && this.y > -5 && this.y < 773)
            	drawTriangle(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.color);

            if (t < 0.5 && this.r*this.r < 1546)
                drawCircle(this.x, this.y, this.r * this.r, "#FFFFFF");
        }
    }
}
