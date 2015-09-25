///<reference path="./IStage.d.ts" />
///<reference path="./LightCinematic.d.ts" />
/**
 * @class LightManager
 */
var LightManager = (function () {
    /**
     * Class for managing cinematic objects.
     *
     * @class LightManager
     * @param {IStage} properties.
     * @constructor
     */
    function LightManager(properties) {
        this._stop = false;
        this._then = 0;
        this._update = this.update.bind(this);
        this._properties = properties;
        this._fpsInterval = 1000 / this._properties.fps;
        this._properties.canvas.width = this._properties.width;
        this._properties.canvas.height = this._properties.height;
        this._ctx = this._properties.canvas.getContext('2d');
        this._children = [];
    }
    Object.defineProperty(LightManager.prototype, "fps", {
        set: function (value) {
            this._fpsInterval = 1000 / value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LightManager.prototype, "stop", {
        set: function (value) {
            this._stop = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Append a cinematic
     * @param child
     */
    LightManager.prototype.appendChild = function (child) {
        child.setContext(this._ctx);
        this._children.push(child);
    };
    /**
     * Remove a cinematic
     * @param child
     */
    LightManager.prototype.removeChild = function (child) {
        var index = this._children.indexOf(child);
        if (index !== -1) {
            this._children.splice(index, 0);
        }
    };
    /**
     * Loop through children returning a free one, setting new properties.
     * @param properties
     * @returns {LightCinematic}
     */
    LightManager.prototype.reuseChild = function (properties) {
        for (var i = 0; i < this._children.length; i++) {
            if (this._children[i].free) {
                return this._children[i].setProperties(properties);
            }
        }
        //If there is any free children create a new instance.
        this._children.push(new LightCinematic(properties));
        return this._children[this._children.length - 1];
    };
    /**
     * Start manager, executes RAF
     */
    LightManager.prototype.start = function () {
        this._stop = false;
        requestAnimationFrame(this._update);
    };
    /**
     * Method in charge of drawing the stage
     * @param timestamp
     */
    LightManager.prototype.update = function (timestamp) {
        if (this._stop)
            return;
        // calc elapsed time since last loop
        var elapsed = timestamp - this._then;
        // if enough time has elapsed, draw the next frame
        if (elapsed > this._fpsInterval) {
            this._ctx.clearRect(0, 0, this._properties.canvas.width, this._properties.canvas.height);
            var length = this._children.length;
            while (length--) {
                if (!this._children[length].free) {
                    this._children[length].draw();
                }
            }
            this._then = timestamp - (elapsed % this._fpsInterval);
        }
        requestAnimationFrame(this._update);
    };
    LightManager.prototype.destruct = function () {
        this.stop = true;
        while (this._children.length)
            this._children.pop().destruct();
        this._children = null;
    };
    return LightManager;
})();
