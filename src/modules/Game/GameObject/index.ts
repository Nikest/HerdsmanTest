import { Component } from '@GameModules/Component';

export class GameObject {
    public components: Map<string, Component> = new Map();

    public addComponent(component: Component): void {
        this.components.set(component.name, component);
    }

    public removeComponent(name: string): void {
        this.components.delete(name);
    }

    public getComponent<T extends Component>(name: string): T | undefined {
        return this.components.get(name) as T;
    }
}