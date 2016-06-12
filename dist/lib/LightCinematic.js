"use strict";
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
        /**
         * If the animation is completed.
         * It will be always false if loop:true
         * @type {boolean}
         * @private
         */
        this._completed = false;
        this.setProperties(properties);
        this.prepareFrames();
    }
    /**
     * Method setting properties.
     * Useful for reusing the object.
     * @param properties
     */
    LightCinematic.prototype.setProperties = function (properties) {
        this.free = false;
        this._properties = properties;
        this._currentFrame = 0;
        this.direction = LightCinematic.FORWARD;
        if (typeof this._properties.loop !== 'undefined' && this._properties.loop > 0) {
            this._properties.loop = 0;
        }
        else {
            this._properties.loop--;
        }
        return this;
    };
    /**
     * Prepare frames array with each coordinate and frame
     */
    LightCinematic.prototype.prepareFrames = function () {
        this._frames = [];
        var spritesheetIndex = 0;
        var multispriteCounter = 0;
        for (var i = 0; i < this._properties.frames.count; i++) {
            if (this._properties.multispritesheet) {
                if (spritesheetIndex <= this._properties.frames.src.length - 1) {
                    var frame = this.getFrameInfo(multispriteCounter);
                    var width = frame.x + this._properties.frames.width;
                    var height = frame.y + this._properties.frames.height;
                    this._frames.push({ spritesheet: spritesheetIndex, x: frame.x, y: frame.y });
                    if (width >= this._properties.frames.src[spritesheetIndex].width
                        && height >= this._properties.frames.src[spritesheetIndex].height) {
                        spritesheetIndex++;
                        multispriteCounter = 0;
                    }
                    else {
                        multispriteCounter++;
                    }
                }
            }
            else if (this._properties.frames.src.length > 1) {
                this._frames.push({ spritesheet: spritesheetIndex, x: 0, y: 0 });
                spritesheetIndex++;
            }
            else {
                var frameInfo = this.getFrameInfo(i);
                this._frames.push({ spritesheet: spritesheetIndex, x: frameInfo.x, y: frameInfo.y });
            }
        }
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
        if ((this.direction === LightCinematic.FORWARD && this._currentFrame < this._properties.frames.count - 1) ||
            (this.direction === LightCinematic.REVERSE && this._currentFrame > 0)) {
            this._currentFrame += this.direction;
        }
        else if (this._properties.loop > 0 || this._properties.loop <= -1) {
            this._currentFrame = 0;
            this._properties.loop--;
        }
        if (!this._completed) {
            this._properties.onComplete && this._properties.onComplete(this);
            if (this._properties.loop === 0) {
                this._completed = true;
            }
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
            this._ctx.drawImage(this._properties.frames.src[this._frames[frame].spritesheet], this._frames[frame].x, this._frames[frame].y, this._properties.frames.width, this._properties.frames.height, this._properties.x, this._properties.y, this._properties.frames.width, this._properties.frames.height);
        }
        catch (e) {
            console.error(e);
        }
    };
    /**
     * Get frame coordinates
     * @param frame
     * @returns {{x: number, y: number}}
     */
    LightCinematic.prototype.getFrameInfo = function (frame) {
        return {
            x: (frame % this._properties.frames.cols) * this._properties.frames.width,
            y: (Math.floor(frame / this._properties.frames.cols)) * this._properties.frames.height
        };
    };
    LightCinematic.prototype.destruct = function () {
    };
    LightCinematic.FORWARD = 1;
    LightCinematic.REVERSE = -1;
    return LightCinematic;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LightCinematic;
