import { Component } from "./";
import { Vector2 } from "@GameModules/Vector";
import { GameObject } from "src/modules/Game/GameObject";

export class PositionComponent extends Component {
    public name = 'position';
    public position: Vector2;

    constructor(gameObject: GameObject, position: Vector2) {
        super(gameObject);
        this.position = position;
    }

    public setPosition(x: number, y: number): void {
        this.position = new Vector2(x, y);
    }

    public getPosition(): Vector2 {
        return this.position;
    }
}