interface ISpritesheet {
    cols?: number;
    count: number;
    width: number;
    height: number;
    /**
     * 	Could be either one spritesheet or
     * 	multiple frames. No multi spritesheet.
     */
    src: Array<HTMLImageElement | HTMLCanvasElement>;
}
export default ISpritesheet;
