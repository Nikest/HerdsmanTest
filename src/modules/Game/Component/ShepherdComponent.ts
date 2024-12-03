import { Component, PositionComponent } from "./";
import { Vector2 } from "@GameModules/Vector";
import { GameObject } from "src/modules/Game/GameObject";
import { Game } from "@Modules/Game";
import { AnimalComponent } from "./";


export class ShepherdComponent extends Component {
    public name = 'shepherdComponent';
    public score = 0;
    public maxSheep: number;

    private captured: number = 0;
    private game: Game;
    private captureRadius;
    private yardCoordY: number;

    constructor(gameObject: GameObject, game: Game, maxSheep: number, captureRadius: number = 100) {
        super(gameObject);
        this.game = game;
        this.captureRadius = captureRadius;
        this.maxSheep = maxSheep;
        this.yardCoordY = game.getYardCoordinates().y;
    }

    public update(deltaTime: number): void {
        const positionComponent = this.gameObject.getComponent<PositionComponent>('position');
        const currentPosition = positionComponent.getPosition();

        const onYard = currentPosition.y > this.yardCoordY;

        const allAnimals = this.game.gameObjects;

        for (const animal of allAnimals) {
            if (animal === this.gameObject) {
                continue;
            }

            const animalPositionComponent = animal.getComponent<PositionComponent>('position');
            const animalComponent = animal.getComponent<AnimalComponent>('animalComponent');

            if (animalComponent.onYard) {
                continue;
            }

            const distance = Vector2.distanceTo(currentPosition, animalPositionComponent.getPosition());

            if (onYard) {
                const animalComponent = animal.getComponent<AnimalComponent>('animalComponent');
                if (animalComponent.isCaptured) {
                    animalComponent.setOnYard(this.yardCoordY, this.game.sceneHeight);
                    this.score++;
                    this.captured--;
                }
            } else if (distance < this.captureRadius && !animalComponent.isCaptured && this.captured < this.maxSheep) {
                animal.getComponent<AnimalComponent>('animalComponent').capture(this.gameObject);
                this.captured++;
            }
        }
    }
}