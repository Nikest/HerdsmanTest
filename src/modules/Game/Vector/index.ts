export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    static lerp(current: Vector2, target: Vector2, t: number): Vector2 {
        return new Vector2(
            current.x + (target.x - current.x) * t,
            current.y + (target.y - current.y) * t
        );
    }

    static clone(current: Vector2): Vector2 {
        return new Vector2(current.x, current.y);
    }

    static add(current: Vector2, vector: Vector2): Vector2 {
        return new Vector2(current.x + vector.x, current.y + vector.y);
    }

    static subtract(current: Vector2, vector: Vector2): Vector2 {
        return new Vector2(current.x - vector.x, current.y - vector.y);
    }

    static multiplyScalar(current: Vector2, scalar: number): Vector2 {
        return new Vector2(current.x * scalar, current.y * scalar);
    }

    public length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public normalize(): Vector2 {
        const len = this.length();
        if (len > 0) {
            return Vector2.multiplyScalar(this, 1 / len);
        }
        return new Vector2(0, 0);
    }

    static distanceTo(current: Vector2, vector: Vector2): number {
        return Math.sqrt(Vector2.distanceToSquared(current, vector));
    }

    static distanceToSquared(current: Vector2, vector: Vector2): number {
        const dx = current.x - vector.x;
        const dy = current.y - vector.y;
        return dx * dx + dy * dy;
    }
}