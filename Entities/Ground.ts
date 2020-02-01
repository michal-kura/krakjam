import {Entity, Position, Size, Vector2D} from "./Entity";
import {Collision} from "../Physics/Collision";
import {World} from "../World/World";
import {Game} from "../Game";
import {Sprite} from "../Graphics/Sprite";

export class Ground extends Entity {
    game: Game;

    constructor(
        public position: Position,
        public size: Size = null,
        public isColliding = false
    ) {

        super(position, size);
        this.sprite = new Sprite(
            'https://cdn.dribbble.com/users/3671336/screenshots/8937091/1big.jpg',
            //{width: 1600, height: 1200}
            {width: 800, height: 600}
        );
    }
    // collisionHandler(entity: Entity, world: World, collision: Collision) {
    //     world.game.setCurrentWorld(this.portalTarget)
    // }
}