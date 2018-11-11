var functions = {
	fd: {
		commands: ["fd", "FORWARD", "forward"],
		function: (px)=>{
			turtle.move(px)
		}
	},
	rt: {
		commands: ["rt", "RIGHT", "right"],
		function: (deg)=>{
			turtle.rt(deg)
		}
	},
	bk: {
		commands: ["bk", "BACK", "back"],
		function: (px)=>{
			turtle.move(-px)
		}
	},
	lt: {
		commands: ["lt", "LEFT", "left"],
		function: (deg)=>{
			turtle.lt(deg)
		}
	},
	pu: {
		commands: ["pu", "PENUP", "pendown"],
		function: ()=>{
			turtle.pu()
		}
	},
	pd: {
		commands: ["pd", "PENDOWN", "pd"],
		function: ()=>{
			turtle.pd()
		}
	},
	cs: {
		commands: ["cs", "CLEARSCREEN", "clearscreen"],
		function: ()=>{
			turtle.cs()
		}
	},
	home: {
		commands: ["HOME"],
		function: (px)=>{
			// turtle.move(px)
		}
	}
};


class Turtle{
	constructor(x, y){
		this.x = x;
		this.y = y;
		this.size = 20;
		this.currentDeg = -90;
		this.lines = [];
		this.isPenDown = true;

	}

	runCommands(commands){
		var commandsArray = commands.split(" ");

		commandsArray = commandsArray.filter((item)=>{//removes spaces by asking if item is truthy i.e. not a " "
			return item;
		});

		for (var i = 0; i < commandsArray.length; i++) {
			var cmd = commandsArray[i];
			console.log(cmd);

			if(functions.hasOwnProperty(cmd)){
				if(parseInt(commandsArray[i + 1])){
					console.log({cmd: commandsArray[i], arg: commandsArray[i + 1]});
					functions[cmd].function(parseInt(commandsArray[++i]));
				}
				else{
					console.log({cmd: commandsArray[i], arg: null});
					functions[cmd].function();
				}
			}
		}

	}

	update(){

	}

	draw(){
		noFill();
		stroke(255);

		for (var i = 0; i < this.lines.length; i++) {
			line(this.lines[i].x1, this.lines[i].y1, this.lines[i].x2, this.lines[i].y2);
		}

		push();
		translate(this.x, this.y);
		rotate(this.currentDeg + 90);
		triangle(0, 0, this.size / 2, this.size, -this.size / 2, this.size);
		pop();
	}

	move(px){
		console.log("x: " + this.x + "  y: " + this.y);
		var newX = this.x + px * cos(this.currentDeg);
		var newY = this.y + px * sin(this.currentDeg);

		//console.log({x1:this.x, y1:this.y, x2:newX, y2:newY});


		if(this.isPenDown){
			if(newY < 0){
				console.log("***********  < y0  *******************");
				var offset = this.y;
				this.lines.push({x1:this.x, y1:this.y, x2: newX, y2: 0});
				newY = gameHeight - -newY ;
				this.lines.push({x1:this.x, y1:gameHeight, x2: newX, y2: newY});
			}

			else if(newY > gameHeight){
				console.log("***********  > gh  *******************");
				var offset = gameHeight - this.y;
				this.lines.push({x1:this.x, y1:this.y, x2: newX, y2: gameHeight});
				newY = offset;
				this.lines.push({x1:this.x, y1:0, x2: newX, y2: newY});
			}

			else if(newX > gameWidth){
				console.log("***********  > gw  *******************");
				var offset = gameWidth - this.x;
				this.lines.push({x1:this.x, y1:this.y, x2: gameWidth, y2: newY});
				newX = offset;
				this.lines.push({x1:0, y1:this.y, x2: newX, y2: newY});
			}
			else if(newX < 0){
				console.log("***********  < x0  *******************");
				var offset = this.x;
				this.lines.push({x1:this.x, y1:this.y, x2: 0, y2: newY});
				newX = gameWidth - -newX ;
				this.lines.push({x1:gameWidth, y1:this.y, x2: newX, y2: newY});
			}
			else{
				this.lines.push({x1:this.x, y1:this.y, x2: newX, y2: newY});
			}
		}
		this.x = newX;
		this.y = newY;
	}

	bk(px){
		var newX = this.x - px * cos(this.currentDeg);
		var newY = this.y - px * sin(this.currentDeg);

		if(this.isPenDown){
			this.lines.push({x1:this.x, y1:this.y, x2: newX, y2: newY});
		}
	}

	lt(deg){
		this.currentDeg -= deg;
	}

	rt(deg){
		this.currentDeg += deg;
	}

	cs(){
		console.log("cs called");
		this.lines = [];
		this.currentDeg = -90;
		this.x = gameWidth / 2;
		this.y = gameHeight / 2;
	}

	pu(){
		this.isPenDown = false;
	}

	pd(){
		this.isPenDown = true;
	}

	// getDeg(){
	// 	return this.currentDeg;
	// }

}
