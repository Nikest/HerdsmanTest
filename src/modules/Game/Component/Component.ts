import { GameObject } from "src/modules/Game/GameObject";

export abstract class Component {
    public gameObject: GameObject;
    public abstract name: string;
    public isActive: boolean = true;

    constructor(gameObject: GameObject) {
        this.gameObject = gameObject;
    }

    public update(deltaTime: number): void {

    }

    public deactivate(): void {
        this.isActive = false;
    }

    public activate(): void {
        this.isActive = true;
    }
}