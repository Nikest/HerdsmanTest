import { Component, PositionComponent, RenderComponent } from "./";
import { GameObject } from "src/modules/Game/GameObject";

export class FollowingComponent extends Component {
    public name = 'followingMovement';
    public speed: number;
    public target: GameObject;

    constructor(gameObject: GameObject, target: GameObject, speed: number = 0.005) {
        super(gameObject);
        this.speed = speed;
        this.target = target;
    }

    public update(deltaTime: number): void {
        const positionComponent = this.gameObject.getComponent<PositionComponent>('position');
        const targetPositionComponent = this.target.getComponent<PositionComponent>('position');
        const targetRenderComponent = this.target.getComponent<RenderComponent>('render');

        const directionX = targetPositionComponent.position.x - positionComponent.position.x;
        const directionY = targetPositionComponent.position.y - positionComponent.position.y;

        const distance = Math.sqrt(directionX ** 2 + directionY ** 2);

        const normDirectionX = directionX / distance;
        const normDirectionY = directionY / distance;

        const approachX = targetPositionComponent.position.x - normDirectionX * (targetRenderComponent.radius * 4);
        const approachY = targetPositionComponent.position.y - normDirectionY * (targetRenderComponent.radius * 4);

        positionComponent.setPosition(approachX, approachY);
    }
}