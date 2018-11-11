var gameWidth = 600;
var gameHeight = 600;

var turtle;
var t;

var commands;

$(()=>{
	$("#input").focus();

	$("#submit").click(()=>{
		console.log("click");
		commands = $("#input").val();
		turtle.runCommands(commands);
		// turtle.move(50);
		// turtle.rt(90);
		// turtle.move(50);
		// turtle.rt(90);
		// // turtle.move(50);
		// // turtle.rt(90);
		// // turtle.move(50);
		// // turtle.rt(90);
	});

	$("#input").keyup((e)=>{
		if(e.which === 13){
			commands = $("#input").val();
			turtle.runCommands(commands);
			$("#input").val("");
		}
	})
});




function setup(){
	console.log("p5");
	createCanvas(gameWidth, gameHeight);
	turtle = new Turtle(gameWidth / 2, gameHeight / 2);
	t = turtle;
	//background(51);
	angleMode(DEGREES);


	//noLoop();
}


function update(){
	turtle.update();


}


function draw(){

	background(51);

	// for (var r = 0; r < 10; r++) {
	// 	for (var c = 0; c < 10; c++) {
	// 		stroke(255, 255, 0);
	//
	// 		line(0, r * gameHeight / 10, gameWidth, r * gameHeight / 10);
	// 		line(c * gameWidth / 10, 0, c * gameWidth / 10, gameHeight);
	// 	}
	// }

	turtle.draw();

	update();
}


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
		// console.log(commandsArray);



// console.log(commandsArray);


		for (var i = 0; i < commandsArray.length; i++) {
			// console.log({x:this.x, y:this.y});
			switch (commandsArray[i]) {
				case "fd":
					this.move(parseInt(commandsArray[i + 1]));
					i ++;
					//console.log("i: " + i);
					break;
				case "FORWARD":
					this.move(parseInt(commandsArray[i + 1]));
					i ++;
					//console.log("i: " + i);
					break;
				case "bk":
					this.move(-parseInt(commandsArray[i + 1]));
					i ++;
					//console.log("i: " + i);
					break;
				case "rt":
					this.rt(parseInt(commandsArray[i + 1]));
					i ++;
					break;
				case "lt":
					this.lt(parseInt(commandsArray[i + 1]));
					i ++;
					break;
				case "cs":
					this.cs();
					break;
				case "pu":
					this.isPenDown = false;
					break;
				case "pd":
					this.isPenDown = true;
					break;
				default:
					console.log(commandsArray[i] + " Is not a command");
			}

		}
	}

	update(){
		// this.x = this.x % gameWidth;
		// this.y = this.y % gameHeight;

	}



	draw(){
		//rotate(90);
		fill(0, 0, 255);
		ellipse(this.x, this.y, this.size, this.size);
		noFill();
		stroke(255);


		for (var i = 0; i < this.lines.length; i++) {

			line(this.lines[i].x1, this.lines[i].y1, this.lines[i].x2, this.lines[i].y2);
			// this.x = this.lines[i].x2;
			// this.y = this.lines[i].y2;
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

		console.log({x1:this.x, y1:this.y, x2:newX, y2:newY});


		if(this.isPenDown){
			if(newY < 0){

				var offset = this.y;
				console.log("offset: " + offset);
				this.lines.push({x1:this.x, y1:this.y, x2: newX, y2: 0});

				console.log("before newY: " + newY);
				newY = gameHeight - -newY ;
				console.log("newY: " + newY);

				this.lines.push({x1:this.x, y1:gameHeight, x2: newX, y2: newY});

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


		// draw();
	}

	lt(deg){
		this.currentDeg -= deg;
		// draw();
	}

	rt(deg){
		this.currentDeg += deg;
		// draw();
	}

	cs(){
		this.lines = [];
	}

	getDeg(){
		return this.currentDeg;
	}



	// degToCoord(ang){
	// 	var newX = this.x * cos(ang);
	// 	var newY = this.y * sin(ang);
	// 	return {x: newX, y: newY}
	// }
}
