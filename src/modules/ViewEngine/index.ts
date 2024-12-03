import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import { RenderComponent, PositionComponent } from '@GameModules/Component';
import { Vector2 } from '@GameModules/Vector';
import { GameObject } from 'src/modules/Game/GameObject';

export class ViewEngine {
    public viewElem: HTMLDivElement;
    public viewApp: PIXI.Application<HTMLCanvasElement>;
    public scoreInfoElem: HTMLElement;
    public width: number;
    public height: number;
    public mouseOn: Vector2 = new Vector2(0, 0);
    public isMouseDown: boolean = false;

    public resolution: number = 2;

    public fieldColor: string = '#52944c';
    public yardColor: string = '#c4b566';

    private game: Game;

    constructor(viewElem: HTMLDivElement, scoreInfoElem: HTMLElement) {
        this.viewElem = viewElem;
        this.scoreInfoElem = scoreInfoElem;
        this.width = this.viewElem.clientWidth * this.resolution;
        this.height = this.viewElem.clientHeight * this.resolution;

        this.viewApp = new PIXI.Application<HTMLCanvasElement>({
            width: this.width,
            height: this.height,
            backgroundColor: this.fieldColor,
        });

        this.viewElem.appendChild(this.viewApp.view);
    }

    onMouseDown(e: MouseEvent) {
        this.isMouseDown = true;
    }

    onMouseUp(e: MouseEvent) {
        this.isMouseDown = false;
        this.game.stopMainHero();
    }

    onMouseMove(e: MouseEvent) {
        const x = e.clientX * this.resolution;
        const y = e.clientY * this.resolution;
        this.mouseOn = new Vector2(x, y);

        if (this.isMouseDown) {
            this.game.moveMainHero(this.mouseOn);
        }
    }

    init(game: Game): void {
        this.game = game;

        this.viewApp.view.addEventListener('mousedown', (e) => {
            this.onMouseDown(e);
        });

        this.viewApp.view.addEventListener('mouseup', (e) => {
            this.onMouseUp(e);
        });

        this.viewApp.view.addEventListener('mousemove', (e) => {
            this.onMouseMove(e);
        });

        const center = new Vector2(this.width / 2, this.height / 2);

        this.game.init(this.width, this.height, center);

        this.viewApp.ticker.add(this.update.bind(this));
    }

    drawYard() {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(this.yardColor);
        graphics.drawRect(0, this.height - this.game.yardHeight, this.width, this.game.yardHeight);
        graphics.endFill();
        this.viewApp.stage.addChild(graphics);
    }

    drawGameObject(gameObject: GameObject) {
        const positionComponent = gameObject.getComponent<PositionComponent>('position');
        const renderComponent = gameObject.getComponent<RenderComponent>('render');

        const graphics = new PIXI.Graphics();
        graphics.beginFill(renderComponent.color);
        graphics.drawCircle(positionComponent.position.x, positionComponent.position.y, renderComponent.radius * this.resolution);
        graphics.endFill();
        this.viewApp.stage.addChild(graphics);
    }


    update(deltaTime: number): void {
        this.viewApp.stage.removeChildren();
        this.drawYard();
        this.game.gameObjects.forEach(gameObject => this.drawGameObject(gameObject));

        this.game.update(deltaTime);
        this.scoreInfoElem.innerText = `${this.game.score}`;
    }
}