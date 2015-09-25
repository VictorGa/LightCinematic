///<reference path="./ICinematic.d.ts" />
///<reference path="./ISpritesheet.d.ts" />
/**
 * @class LightCinematic
 */
var LightCinematic = (function () {
    /**
     * Class for managing cinematic objects.
     *
     * @class LightCinematic
     * @param {ICinematic} properties.
     * @constructor
     */
    function LightCinematic(properties) {
        this._currentFrame = 0;
        this._spriteProps = { iX: 0, iY: 0, x: 0, y: 0 };
        this.setProperties(properties);
    }
    /**
     * Method setting properties.
     * Useful for reusing the object.
     * @param properties
     */
    LightCinematic.prototype.setProperties = function (properties) {
        this.free = false;
        this._properties = properties;
        this._spriteProps.iX = this._spriteProps.iY = this._spriteProps.x = this._spriteProps.y = 0;
        this._currentFrame = 0;
        this.direction = LightCinematic.FORWARD;
        return this;
    };
    /**
     * Set context in which the cinematic will be drawn
     * @param ctx
     */
    LightCinematic.prototype.setContext = function (ctx) {
        this._ctx = ctx;
    };
    /**
     * Draw method
     */
    LightCinematic.prototype.draw = function () {
        if ((this.direction === LightCinematic.FORWARD && this._currentFrame < this._properties.frames.count - 1) || (this.direction === LightCinematic.REVERSE && this._currentFrame > 0)) {
            this._currentFrame += this.direction;
        }
        else if (this._properties.loop) {
            this._currentFrame = 0;
        }
        this.drawImage(this._currentFrame);
    };
    /**
     * Draw specific frame;
     * @param frame
     */
    LightCinematic.prototype.goto = function (frame) {
        this._ctx.clearRect(0, 0, this._ctx.canvas.width, this._ctx.canvas.height);
        this.drawImage(frame);
    };
    /**
     * Draw frame passed
     * @param frame
     */
    LightCinematic.prototype.drawImage = function (frame) {
        try {
            this._ctx.drawImage(this.getCurrentFrameImage(frame), this._spriteProps.x, this._spriteProps.y, this._properties.frames.width, this._properties.frames.height, this._properties.x, this._properties.y, this._properties.frames.width, this._properties.frames.height);
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * Get image object of frame specified
     * @param frame
     * @returns {any}
     */
    LightCinematic.prototype.getCurrentFrameImage = function (frame) {
        if (this._properties.frames.src.length > 1) {
            return this._properties.frames.src[frame];
        }
        else {
            this.setFrameInfo(frame);
            return this._properties.frames.src[0];
        }
        return null;
    };
    /**
     * Set spritesheet information for the current frame.
     * @param frame
     */
    LightCinematic.prototype.setFrameInfo = function (frame) {
        this._spriteProps.iX = frame % this._properties.frames.cols;
        this._spriteProps.iY = Math.floor(frame / this._properties.frames.cols);
        this._spriteProps.x = this._spriteProps.iX * this._properties.frames.width;
        this._spriteProps.y = this._spriteProps.iY * this._properties.frames.height;
    };
    LightCinematic.prototype.destruct = function () {
    };
    LightCinematic.FORWARD = 1;
    LightCinematic.REVERSE = -1;
    return LightCinematic;
})();
