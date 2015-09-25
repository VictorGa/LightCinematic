/// <reference path="ICinematic.d.ts" />
/// <reference path="ISpritesheet.d.ts" />
/**
 * @class LightCinematic
 */
declare class LightCinematic {
    static FORWARD: number;
    static REVERSE: number;
    private _properties;
    private _currentFrame;
    private _ctx;
    /**
     * Properties in update it in every tick.
     */
    private _spriteProps;
    free: boolean;
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
     * Get image object of frame specified
     * @param frame
     * @returns {any}
     */
    private getCurrentFrameImage(frame);
    /**
     * Set spritesheet information for the current frame.
     * @param frame
     */
    private setFrameInfo(frame);
    destruct(): void;
}
