///<reference path="./LightManager.d.ts" />
///<reference path="./LightCinematic.d.ts" />

//Load image/images first
var img = new Image();
img.src = "dude_animation_sheet.png";

var manager = new LightManager({fps:20, width: 200, height:200, canvas:<HTMLCanvasElement>document.getElementById('myCanvas')});
var sprites = new LightCinematic({
		frames: {cols: 9, count: 9, width: 50, height: 72, src: [img]},
		loop:true,
		x: 0,
		y: 0
	});

manager.appendChild(sprites);
manager.start();


