import ICinematic from './ICinematic';
import ISpritesheet from './ISpritesheet';
import ISpriteProperties from './ISpriteProperties';

/**
 * @module Temple
 * @namespace temple.utils
 * @class LightCinematic
 *
 * Use:
 * var img = new Image();
 * img.src = "spritesheet.png";
 *
 * var sprites = new LightCinematic({
 *		frames: {cols: 9, count: 9, width: 50, height: 72, src: [img]},
 *		loop: -1, (infinite loop: -1)
 *		x: 0,
 *		y: 0,
 *		multispritesheet: true,
 *      onComplete: (sprite:LightCinematic) => {}
 *	});
 *
 * sprites.setContext(<CanvasRenderingContext2D>document.getElementById('myCanvas').getContext('2d'));
 *
 * requestAnimationFrame(() => {
 * 	sprites.draw();
 * })
 *
 * More info: https://github.com/VictorGa/LightCinematicTS
 *
 * @version 1.0.0
 */
class LightCinematic
{
	public static FORWARD:number = 1;
	public static REVERSE:number = -1;

	private _properties:ICinematic;
	private _currentFrame:number = 0;
	private _ctx:CanvasRenderingContext2D;

	/**
	 * Each frame data.
	 */
	private _frames:Array<ISpriteProperties>;

	/**
	 * If the animation is completed.
	 * It will be always false if loop:true
	 * @type {boolean}
	 * @private
	 */
	private _completed:boolean = false;

	/**
	 * Pool purposes
	 */
	public free:boolean;

	/**
	 * Animation direction
	 */
	public direction:number;

	get frames():Array<ISpriteProperties>
	{
		return this._frames;
	}

	get properties():ICinematic
	{
		return this._properties;
	}

	get currentFrame():number
	{
		return this._currentFrame;
	}

	/**
	 * Class for managing cinematic objects.
	 *
	 * @class LightCinematic
	 * @param {ICinematic} properties.
	 * @constructor
	 */
	constructor(properties:ICinematic)
	{
		this.setProperties(properties);
	}

	/**
	 * Method setting properties.
	 * Useful for reusing the object.
	 * @param properties
	 */
	public setProperties(properties:ICinematic):LightCinematic
	{
		this.free = false;
		this._properties = properties;
		this._currentFrame = 0;
		this.direction = LightCinematic.FORWARD;

		this.prepareFrames();
		/*if(typeof this._properties.loop !== 'undefined' && this._properties.loop > 0)
		{
			this._properties.loop = 0;
		}
		else
		{
			this._properties.loop--;
		}*/

		return this;
	}

	/**
	 * Prepare frames array with each coordinate and frame
	 */
	private prepareFrames():void
	{
		this._frames = [];
		let spritesheetIndex:number = 0;
		let multispriteCounter:number = 0;

		for(var i:number = 0; i < this._properties.frames.count; i++)
		{
			if(this._properties.multispritesheet)
			{
				if(spritesheetIndex <= this._properties.frames.src.length - 1)
				{
					let frame = this.getFrameInfo(multispriteCounter);
					let width = frame.x + this._properties.frames.width;
					let height = frame.y + this._properties.frames.height;

					this._frames.push({spritesheet: spritesheetIndex, x: frame.x, y: frame.y});

					if(width >= this._properties.frames.src[spritesheetIndex].width
						&& height >= this._properties.frames.src[spritesheetIndex].height)
					{
						spritesheetIndex++;
						multispriteCounter = 0;
					}
					else
					{
						multispriteCounter++;
					}
				}
			}
			else if(this._properties.frames.src.length > 1)
			{
				this._frames.push({spritesheet: spritesheetIndex, x: 0, y: 0});
				spritesheetIndex++;
			}
			else
			{
				let frameInfo =  this.getFrameInfo(i);
				this._frames.push({spritesheet: spritesheetIndex, x: frameInfo.x, y:frameInfo.y});
			}
		}
	}


	/**
	 * Set context in which the cinematic will be drawn
	 * @param ctx
	 */
	public setContext(ctx:CanvasRenderingContext2D):void
	{
		this._ctx = ctx;
	}

	/**
	 * Draw method
	 */
	public draw():void
	{
		if(!this._completed && this._properties.loop === 0)
		{
			this._properties.onComplete && this._properties.onComplete(this);

			if(this._properties.loop === 0)
			{
				this._completed = true;
			}

			return;
		}

		//Draw current frame
		this.drawImage(this._currentFrame);

		//Update frame
		if((this.direction === LightCinematic.FORWARD && this._currentFrame < this._properties.frames.count - 1) ||
			(this.direction === LightCinematic.REVERSE && this._currentFrame > 0))
		{
			this._currentFrame += this.direction;
			return;
		}

		//Check end of cinematic
		if(this.direction === LightCinematic.REVERSE && this._currentFrame === 0)
		{
			this._currentFrame = this._properties.frames.count - 1;
			this._properties.loop--;
		}

		if(this.direction === LightCinematic.FORWARD && this._currentFrame === this._properties.frames.count - 1)
		{
			this._currentFrame = 0;
			this._properties.loop--;
		}
	}

	/**
	 * Draw specific frame;
	 * @param frame
	 */
	public goto(frame:number):void
	{
		this._currentFrame = frame;
		this._completed = false;
		this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height );
		this.drawImage(frame);
	}

	/**
	 * Draw frame passed
	 * @param frame
	 */
	private drawImage(frame:number):void
	{
		this._ctx.drawImage(this._properties.frames.src[this._frames[frame].spritesheet],
			this._frames[frame].x, this._frames[frame].y,
			this._properties.frames.width, this._properties.frames.height,
			this._properties.x, this._properties.y,
			this._properties.frames.width, this._properties.frames.height);
	}

	/**
	 * Get frame coordinates
	 * @param frame
	 * @returns {{x: number, y: number}}
	 */
	private getFrameInfo(frame:number):ISpriteProperties
	{
		return {
			x: (frame % this._properties.frames.cols) * this._properties.frames.width,
			y: (Math.floor(frame / this._properties.frames.cols)) * this._properties.frames.height
		};
	}

	destruct():void
	{

	}
}

export default LightCinematic;