import { Component, PositionComponent } from "./";
import { Vector2 } from "@GameModules/Vector";
import { GameObject } from "src/modules/Game/GameObject";
import { Procedural } from '@Modules/Procedural';


export class MovementComponent extends Component {
    public name = 'movement';
    public steps: number;
    public speed: number;
    public targetPosition: Vector2 | null = null;

    public minPositionX: number = 0;
    public minPositionY: number = 0;
    public maxPositionX: number;
    public maxPositionY: number;

    private rand: Procedural;

    constructor(gameObject: GameObject, seed: number, maxPositionX: number, maxPositionY: number, speed: number = 0.005) {
        super(gameObject);
        this.speed = speed;
        this.rand = new Procedural(seed);
        this.steps = 100;
        this.maxPositionX = maxPositionX;
        this.maxPositionY = maxPositionY;

        this.randomTarget();
    }

    public randomTarget(): void {
        const { position } = this.gameObject.getComponent<PositionComponent>('position');
        const randomX = this.rand.randomInt(Math.max(this.minPositionX, position.x - this.steps), Math.min(this.maxPositionX, position.x + this.steps));
        const randomY = this.rand.randomInt(Math.max(this.minPositionY, position.y - this.steps), Math.min(this.maxPositionY, position.y + this.steps));

        this.targetPosition = new Vector2(randomX, randomY);
    }

    public update(deltaTime: number): void {
        const positionComponent = this.gameObject.getComponent<PositionComponent>('position');
        const currentPosition = positionComponent.getPosition();

        const t = Math.min((this.speed * deltaTime) / 2, 1.5);

        const newPosition = Vector2.lerp(currentPosition, this.targetPosition, t);

        positionComponent.setPosition(newPosition.x, newPosition.y);

        if (Vector2.distanceTo(currentPosition, this.targetPosition) < 0.1) {
            positionComponent.setPosition(this.targetPosition.x, this.targetPosition.y);
            this.randomTarget();
        }
    }
}