import { Component, PositionComponent } from "./";
import { Vector2 } from "@GameModules/Vector";
import { GameObject } from "src/modules/Game/GameObject";


export class InteractiveComponent extends Component {
    public name = 'interactiveMovement';
    public speed: number;
    public size: number;
    public targetPosition: Vector2 | null = null;

    constructor(gameObject: GameObject, initialPosition: Vector2, size: number, speed: number) {
        super(gameObject);
        this.speed = speed;
        this.size = size;
        this.targetPosition = initialPosition;

    }

    public setTargetPosition(targetPosition: Vector2): void {
        this.targetPosition = new Vector2(targetPosition.x - this.size, targetPosition.y - this.size);
    }

    public update(deltaTime: number): void {
        const positionComponent = this.gameObject.getComponent<PositionComponent>('position');
        const currentPosition = positionComponent.getPosition();

        const direction = Vector2.subtract(this.targetPosition, currentPosition).normalize();
        const distance = Vector2.distanceTo(currentPosition, this.targetPosition);

        const moveDistance = this.speed * deltaTime;
        if (moveDistance >= distance) {
            positionComponent.setPosition(this.targetPosition.x, this.targetPosition.y);
        } else {
            const moveVector = Vector2.multiplyScalar(direction, moveDistance);
            const newPosition = Vector2.add(currentPosition, moveVector);
            positionComponent.setPosition(newPosition.x, newPosition.y);
        }
    }
}