import LightCinematic from '../src/lib/LightCinematic';
import ICinematic from '../src/lib/ICinematic';
import {cinematic, cinematic2} from './LightCinematicMock';

let lightCinematic:LightCinematic;

describe('LightCinematic - set properties', () =>
{
	lightCinematic = new LightCinematic(<ICinematic>cinematic);

	it('should be not free cinematic', () =>
	{
		expect(lightCinematic).not.toBeUndefined();
		expect(lightCinematic.free).toBe(false);
	});

	it('direction should be forward by default', () =>
	{
		expect(lightCinematic.direction).toBe(LightCinematic.FORWARD);
	});

	it('frames should be set to 9', () =>
	{
		expect(lightCinematic.frames.length).toBe(9);
	});

	it('loop should be set to 2', () =>
	{
		expect(lightCinematic.properties.loop).toBe(2);
	});

});

describe('LightCinematic - play', () =>
{
	var canvas = document.createElement('canvas');
	lightCinematic.setContext(canvas.getContext('2d'));

	beforeEach(function(done)
	{
		lightCinematic.setProperties(cinematic);

		var draw = ()=>
		{
			lightCinematic.draw();
			done();
		};

		requestAnimationFrame(draw);
	});

	it('frame should be incremented', () =>
	{
		expect(lightCinematic.currentFrame).toBe(1);
	});

	it('Goto modify currentFrame', () =>
	{
		lightCinematic.goto(0);
		expect(lightCinematic.currentFrame).toBe(0);
	});
});

describe('LightCinematic - playing', () =>
{

	beforeEach(function(done)
	{
		lightCinematic.setProperties(cinematic);

		var stop = false;

		cinematic.onComplete = ()=>
		{
			stop = true;
			done();
		};

		var canvas = document.createElement('canvas');
		lightCinematic.setContext(canvas.getContext('2d'));

		var draw = ()=>
		{
			if(!stop)
			{
				lightCinematic.draw();
				requestAnimationFrame(draw);
			}
		};

		requestAnimationFrame(draw)

	});

	it('should be stopped', () =>
	{
		expect(lightCinematic.properties.loop).toBe(0);
	});

});

describe('LightCinematic - play reverse', () =>
{
	var canvas = document.createElement('canvas');
	lightCinematic.setContext(canvas.getContext('2d'));

	beforeEach(function(done)
	{
		lightCinematic.setProperties(cinematic);
		lightCinematic.direction = LightCinematic.REVERSE;

		var draw = ()=>
		{
			lightCinematic.draw();
			done();
		};

		requestAnimationFrame(draw);
	});

	it('frame should be decremented', () =>
	{
		expect(lightCinematic.currentFrame).toBe(lightCinematic.frames.length - 1);
	});

	it('Goto modify currentFrame', () =>
	{
		lightCinematic.goto(0);
		expect(lightCinematic.currentFrame).toBe(0);
	});
});


describe('LightCinematic - multispritesheet', () =>
{
	var canvas = document.createElement('canvas');
	lightCinematic.setContext(canvas.getContext('2d'));
	var spritesheets:Array<HTMLImageElement> = [];

	beforeEach(function(done)
	{
		var count = 0;
		spritesheets = [new Image(), new Image()];
		spritesheets[0].src = 'base/test/images/spritesheet.png';
		spritesheets[1].src = 'base/test/images/spritesheet2.png';

		spritesheets[0].onload = spritesheets[1].onload = ()=>
		{
			if(++count === spritesheets.length) done();
		};

	});

	it('set new properties, should reset frames', () =>
	{
		var cinematicMock = {

			frames: {cols: 5, count: 50, width: 37, height: 45, src: spritesheets},
			loop: 1,
			x: 0,
			y: 0,
			multispritesheet: true,
			onComplete: (sprite:LightCinematic) =>
			{
			}
		};

		lightCinematic.setProperties(cinematicMock);
		expect(lightCinematic.properties.loop).toBe(1);
		expect(lightCinematic.frames.length).toBe(50);
	});

	it('set new properties, should reset frames', () =>
	{
		var cinematicMock = {

			frames: {cols: 5, count: 50, width: 37, height: 45, src: spritesheets},
			loop: 1,
			x: 0,
			y: 0,
			multispritesheet: false,
			onComplete: (sprite:LightCinematic) =>
			{
			}
		};

		lightCinematic.setProperties(cinematicMock);
		expect(lightCinematic.properties.loop).toBe(1);
		expect(lightCinematic.frames.length).toBe(50);
	});
});
