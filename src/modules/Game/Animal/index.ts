import { Procedural } from '@Modules/Procedural';
import { Vector2 } from '@GameModules/Vector';
import { Actor } from '@GameModules/Actor';
import * as Components from "@GameModules/Component";

const settings = {
    size: 15,
    color: '#ffffff',
    speed: 0.05,
}

export class Animal extends Actor {
    name = 'animal';
    public seed: number;

    constructor(seed: number, maxPositionX: number, maxPositionY: number) {
        super();
        this.seed = seed;

        const rand = new Procedural(seed);
        const appearance = rand.randomFromArray(['left', 'top', 'right']);
        let position: Vector2;

        if (appearance === 'left') {
            position = new Vector2(0 - settings.size, rand.randomInt(0, maxPositionY));
        } else if (appearance === 'top') {
            position = new Vector2(rand.randomInt(0 - settings.size, maxPositionX), 0 - settings.size);
        } else {
            position = new Vector2(maxPositionX, rand.randomInt(0 - settings.size, maxPositionY));
        }

        this.addComponent(new Components.PositionComponent(this, position));
        this.addComponent(new Components.MovementComponent(this, rand.randomInt(100000, 999999), maxPositionX - settings.size, maxPositionY - settings.size, settings.speed));
        this.addComponent(new Components.RenderComponent(this, settings.size, settings.color));
        this.addComponent(new Components.AnimalComponent(this, settings.speed));
    }
}
