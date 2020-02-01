import {Entity, Position, Size, Vector2D} from "./Entity";
import {Collision} from "../Physics/Collision";
import {World} from "../World/World";
import {Game} from "../Game";
import {Sprite} from "../Graphics/Sprite";

export class Obstacle extends Entity {
    //selectable: boolean = true;
    //color: string = 'orange';
    game: Game;

    constructor(
        public position: Position,
        public size: Size = null,
    ) {
        super(position, size);
        this.sprite = new Sprite(
            'https://vignette.wikia.nocookie.net/portalworldsgame/images/1/17/White_Brick.png',
            {width: 30, height: 30}
        );

    }
    // collisionHandler(entity: Entity, world: World, collision: Collision) {
    //     world.game.setCurrentWorld(this.portalTarget)
    // }
}