/// <reference path="IStage.d.ts" />
/// <reference path="LightCinematic.d.ts" />
/**
 * @class LightManager
 */
declare class LightManager {
    private _properties;
    private _stop;
    private _ctx;
    private _fpsInterval;
    private _then;
    private _update;
    private _children;
    fps: number;
    stop: boolean;
    /**
     * Class for managing cinematic objects.
     *
     * @class LightManager
     * @param {IStage} properties.
     * @constructor
     */
    constructor(properties: IStage);
    /**
     * Append a cinematic
     * @param child
     */
    appendChild(child: LightCinematic): void;
    /**
     * Remove a cinematic
     * @param child
     */
    removeChild(child: LightCinematic): void;
    /**
     * Loop through children returning a free one, setting new properties.
     * @param properties
     * @returns {LightCinematic}
     */
    reuseChild(properties: ICinematic): LightCinematic;
    /**
     * Start manager, executes RAF
     */
    start(): void;
    /**
     * Method in charge of drawing the stage
     * @param timestamp
     */
    private update(timestamp);
    destruct(): void;
}
