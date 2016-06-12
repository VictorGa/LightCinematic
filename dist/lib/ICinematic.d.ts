import ISpritesheet from './ISpritesheet';
import LightCinematic from "./LightCinematic";
interface ICinematic {
    frames: ISpritesheet;
    loop: number;
    x: number;
    y: number;
    multispritesheet: boolean;
    onComplete: (data: LightCinematic) => void;
}
export default ICinematic;
