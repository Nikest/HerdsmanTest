import { Component, PositionComponent } from "./";
import { GameObject } from "src/modules/Game/GameObject";
import { FollowingComponent, MovementComponent, RenderComponent } from "./";

export class AnimalComponent extends Component {
    public name = 'animalComponent';
    public isCaptured = false;
    public onYard = false;
    public speed = 0.05;

    constructor(entity: GameObject, speed: number) {
        super(entity);
        this.speed = speed;
    }

    public capture(target: GameObject): void {
        this.isCaptured = true;
        this.gameObject.getComponent<RenderComponent>("render").color = '#ffe3e3';
        this.gameObject.getComponent<MovementComponent>("movement").deactivate();
        this.gameObject.addComponent(new FollowingComponent(this.gameObject, target, this.speed));
    }

    public uncapture(): void {
        this.isCaptured = false;
        this.gameObject.removeComponent("followingMovement");
        this.gameObject.getComponent<MovementComponent>("movement").activate();
    }

    public setOnYard(minPositionY: number, maxPositionY: number): void {
        this.onYard = true;
        this.gameObject.getComponent<RenderComponent>("render").color = '#fffcdc';
        const movementComponent = this.gameObject.getComponent<MovementComponent>('movement');
        movementComponent.minPositionY = minPositionY;
        movementComponent.minPositionY = maxPositionY;
        movementComponent.randomTarget();
        this.uncapture();
    }
}