var gameWidth = 600;
var gameHeight = 600;

var turtle;
var t;





var commands;

$(()=>{
	$("#input").focus();

	$("#submit").click(()=>{
		console.log("click");
		turtle.runCommands($("#input").val());
	});

	$("#input").keyup((e)=>{
		if(e.which === 13){
			turtle.runCommands($("#input").val());
			$("#input").val("");
		}
	})
});




function setup(){
	console.log("p5");
	createCanvas(gameWidth, gameHeight);
	turtle = new Turtle(gameWidth / 2, gameHeight / 2);
	t = turtle;
	angleMode(DEGREES);
}


function update(){
	turtle.update();
}


function draw(){

	background(51);
	turtle.draw();
	update();
}
