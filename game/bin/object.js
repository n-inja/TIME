class Button{
	constructor(){
		this.x = 256;
		this.y = 384;
		this.r = 100;
		this.cnt = 0;
		this.theta = 0;
		this.visualR = 0;
		this.color = "#000000";
	}
	setColor(color){
		this.color = color;
	}
	update(){
		if((this.x - x)*(this.x - x) + (this.y - y)*(this.y - y) < this.r*this.r && this.cnt < 100){
			this.cnt++;
			this.visualR = this.cnt;
		}
		else{
			this.visualR = Math.min(this.cnt + (this.r - this.cnt)/2*Math.sin(this.theta)*Math.sin(this.theta), this.r);
		}
		this.theta += 5/Math.sqrt(Math.max((this.x - x)*(this.x - x) + (this.y - y)*(this.y - y), this.r*this.r));
		if(this.theta > Math.PI*2){
			this.theta -= Math.PI*2;
		}
	}
	draw(){
		drawCircle(this.x, this.y, this.r, this.color);
		drawFillCircle(this.x, this.y, this.visualR, this.color);
	}
}
