import ICinematic from './ICinematic';
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
declare class LightCinematic {
    static FORWARD: number;
    static REVERSE: number;
    private _properties;
    private _currentFrame;
    private _ctx;
    /**
     * Each frame data.
     */
    private _frames;
    /**
     * If the animation is completed.
     * It will be always false if loop:true
     * @type {boolean}
     * @private
     */
    private _completed;
    /**
     * Pool purposes
     */
    free: boolean;
    /**
     * Animation direction
     */
    direction: number;
    /**
     * Class for managing cinematic objects.
     *
     * @class LightCinematic
     * @param {ICinematic} properties.
     * @constructor
     */
    constructor(properties: ICinematic);
    /**
     * Method setting properties.
     * Useful for reusing the object.
     * @param properties
     */
    setProperties(properties: ICinematic): LightCinematic;
    /**
     * Prepare frames array with each coordinate and frame
     */
    private prepareFrames();
    /**
     * Set context in which the cinematic will be drawn
     * @param ctx
     */
    setContext(ctx: CanvasRenderingContext2D): void;
    /**
     * Draw method
     */
    draw(): void;
    /**
     * Draw specific frame;
     * @param frame
     */
    goto(frame: number): void;
    /**
     * Draw frame passed
     * @param frame
     */
    private drawImage(frame);
    /**
     * Get frame coordinates
     * @param frame
     * @returns {{x: number, y: number}}
     */
    private getFrameInfo(frame);
    destruct(): void;
}
export default LightCinematic;
