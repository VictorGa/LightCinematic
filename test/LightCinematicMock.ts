import ICinematic from '../src/lib/ICinematic';
import LightCinematic from '../src/lib/LightCinematic';

var img = new Image();

export var cinematic = <ICinematic>{

	frames: {cols: 9, count: 9, width: 50, height: 72, src: [img]},
	loop: 2,
	x: 0,
	y: 0,
	multispritesheet: false,
	onComplete: (sprite:LightCinematic) =>
	{
	}
};