import LightCinematic from '../src/lib/LightCinematic';
import ICinematic from '../src/lib/ICinematic';
import {cinematic} from './LightCinematicMock';

let lightCinematic:LightCinematic;

describe('LightCinematic', () =>
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

describe('LightCinematic - playing', () =>
{
	beforeEach(function(done)
	{
		var stop = false;

		cinematic.onComplete = ()=>{
			stop = true;
			done();
		};

		lightCinematic = new LightCinematic(<ICinematic>cinematic);

		var canvas = document.createElement('canvas');
		lightCinematic.setContext(canvas.getContext('2d'));

		var draw = ()=>{
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