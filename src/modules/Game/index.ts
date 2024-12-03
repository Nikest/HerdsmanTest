import { GameObject } from 'src/modules/Game/GameObject';
import { Procedural } from '@Modules/Procedural';
import { MainHero } from '@GameModules/MainHero';
import { Animal } from '@GameModules/Animal';
import { Vector2 } from '@GameModules/Vector';
import { InteractiveComponent, PositionComponent, ShepherdComponent } from "@GameModules/Component";

export class Game {
    public rand: Procedural;
    public gameObjects: GameObject[] = [];
    public mainHero: GameObject;
    public score: number = 0;

    public sceneWidth: number;
    public sceneHeight: number;
    public center: Vector2;


    readonly yardHeight: number = 200;

    constructor(seed: number) {
        this.rand = new Procedural(seed);
    }

    public getYardCoordinates(): Vector2 {
        return new Vector2(0, this.sceneHeight - this.yardHeight);
    }

    public init(sceneWidth: number, sceneHeight: number, center: Vector2): void {
        this.sceneWidth = sceneWidth;
        this.sceneHeight = sceneHeight;
        this.center = center;

        this.mainHero = new MainHero(center, this);
        this.gameObjects.push(this.mainHero);

        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const animal = this.createAnimal(this.rand.randomInt(1000000, 9999999));
                this.gameObjects.push(animal);
            }, this.rand.randomInt(0, 2000));
        }

        this.animalCreationFlow();
    }

    private animalCreationFlow(): void {
        setTimeout(() => {
            const animal = this.createAnimal(this.rand.randomInt(1000000, 9999999));
            this.gameObjects.push(animal);

            this.animalCreationFlow();
        }, this.rand.randomInt(5000, 10000));
    }

    private createAnimal(seed: number): GameObject {
        return new Animal(seed, this.sceneWidth, this.sceneHeight - this.yardHeight);
    }

    private scoreUpdate(): void {
        this.score = this.mainHero.getComponent<ShepherdComponent>('shepherdComponent').score;
    }

    public update(deltaTime: number): void {
        for (const gameObject of this.gameObjects) {
            for (const component of gameObject.components.values()) {
                component.isActive && component.update(deltaTime);
            }
        }

        this.scoreUpdate();
    }

    public moveMainHero(direction: Vector2): void {
        const interactiveComponent = this.mainHero.getComponent<InteractiveComponent>('interactiveMovement');
        interactiveComponent.setTargetPosition(direction);
    }

    public stopMainHero(): void {
        const interactiveComponent = this.mainHero.getComponent<InteractiveComponent>('interactiveMovement');
        interactiveComponent.setTargetPosition(this.mainHero.getComponent<PositionComponent>('position').getPosition());
    }
}