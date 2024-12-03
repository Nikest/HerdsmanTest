# Game Prototype: "Herdsman"

This repository contains a simple 2D prototype of a mini-game built using a component-based architecture. The goal of the game is for the player to collect animals using the Main Hero and guide them to the destination point (yard). The game is built using **PIXI.js** for rendering, with procedural generation and procedural movement handled by the **seedrandom** library.

---

## **Architecture**

The game is built using a **component-based architecture** to ensure flexibility, scalability, and maintainability.

### **Core Classes**

#### **Abstract Classes**
- **`GameObject`**  
  Represents a game entity that can hold components.
- **`Component`**  
  Represents the behavior or functionality that can be attached to a `GameObject`.

#### **Components**
- **`AnimalComponent`**  
  Handles animal-specific behavior, including procedural movement and patrol logic.
- **`FollowingComponent`**  
  Handles the behavior of an animal following the Main Hero.
- **`InteractiveComponent`**  
  Enables the Main Hero to respond to player input (mouse clicks).
- **`MovementComponent`**  
  Handles procedural movement for game objects like animals.
- **`PositionComponent`**  
  Tracks the position of a game object for rendering and collision detection.
- **`RenderComponent`**  
  Handles rendering attributes such as size and color for game objects.
- **`ShepherdComponent`**  
  Implements the Main Hero's behavior for capturing animals and releasing them in the yard.

#### **Derived Classes**
- **`Animal`**  
  Inherits from `GameObject` and initializes with components relevant to animal behavior.
- **`MainHero`**  
  Inherits from `GameObject` and initializes with components for movement, interaction, and shepherding.

#### **Utility Classes**
- **`Game`**  
  Manages global state, including all `GameObject` instances, the score, and procedural generation of animals.
- **`Vector2`**  
  Provides static methods for vector mathematics, used for movement calculations.
- **`ViewEngine`**  
  Implements rendering using **PIXI.js**, ensuring smooth visuals and performance.

---

## **Technologies Used**

- **PIXI.js**: Rendering engine for 2D graphics.
- **seedrandom**: Library for procedural generation and randomization.
- **TypeScript**: Core language for development.

---

## **How to run**
```
npm i
npm start
```
Project is running at http://localhost:8080/ 