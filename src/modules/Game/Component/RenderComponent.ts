import { Component, PositionComponent } from "./";
import { GameObject } from "src/modules/Game/GameObject";

export class RenderComponent extends Component {
    public name = 'render';
    public radius: number;
    public color: string;

    constructor(gameObject: GameObject, radius: number = 25, color: string = '#ff00ff') {
        super(gameObject);
        this.radius = radius;
        this.color = color;
    }
}