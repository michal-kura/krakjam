import {Entity, Position, Size, Vector2D} from "./Entity";
import {Collision} from "../Physics/Collision";
import {World} from "../World/World";
import {Game} from "../Game";
import {Sprite} from "../Graphics/Sprite";

export class Portal extends Entity {
    selectable: boolean = true;
    color: string = 'orange';
    game: Game;

    constructor(
        private portalTarget: number = null,
        public position: Position,
        public size: Size = null,
    ) {
        super(position, size);
        this.sprite = new Sprite(
            'https://opengameart.org/sites/default/files/styles/medium/public/wood%20tex1.png',
            {width: 30, height: 30}
        );
    }
    collisionHandler(entity: Entity, world: World, collision: Collision) {
        world.game.setCurrentWorld(this.portalTarget)
    }
}