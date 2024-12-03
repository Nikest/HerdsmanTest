import { Game } from '@Modules/Game';
import { Vector2 } from '@GameModules/Vector';
import { Actor } from '@GameModules/Actor';
import * as Components from "@GameModules/Component";

const settings = {
    size: 25,
    color: '#aa3131',
    speed: 5,
    maxSheep: 5,
    captureRadius: 100,
}

export class MainHero extends Actor {
    name = 'mainHero';

    constructor(center: Vector2, game: Game) {
        super();

        this.addComponent(new Components.PositionComponent(this, center));
        this.addComponent(new Components.RenderComponent(this, settings.size, settings.color));
        this.addComponent(new Components.InteractiveComponent(this, center, settings.size, settings.speed));
        this.addComponent(new Components.ShepherdComponent(this, game, settings.maxSheep, settings.captureRadius));
    }
}
