import {World} from "./World";
import {Camera} from "../Camera/index";
import {Player} from "../Entities/Player";
import {Point} from "../Geometry/Point";
import {Portal} from "../Entities/Portal";
import {Ground} from "../Entities/Ground";
import {Obstacle} from "../Entities/Obstacle";
import {Entity} from "../Entities/Entity";

export class JacksRoom extends World{

    protected stillEntity: Entity;


    reinitialize() {
        this.player.moveTo(new Point(440, 440));
    }

    initialize(): void {

        // this.addEntity(new Ground(
        //     new Point(0, 0),
        //     {width: 800, height: 600}
        // ));

        for (let i = 0; i < 12; i++) {
            //bottom
            this.addEntity(new Obstacle(
                new Point(30*i, 300),
                {width: 30, height: 30}
            ));
            //top
            this.addEntity(new Obstacle(
                new Point(30*i, 0),
                {width: 30, height: 30}
            ));
            //left
            this.addEntity(new Obstacle(
                new Point(0, 30*i),
                {width: 30, height: 30}
            ));
            //right
            this.addEntity(new Obstacle(
                new Point(300, 30*i),
                {width: 30, height: 30}
            ));
        }

        this.player = this.addEntity(new Player(
            new Point(200, 100),
            {width: 30, height: 30}
        ));

        this.addEntity(new Portal(
            0,
            new Point(100, 100),
            {width: 20, height: 20}
        ));

        this.stillEntity = this.addEntity(new Portal(
            2,
            new Point(100, 200),
            {width: 20, height: 20}
        ));

        // const backgroundImage = new Image()
        // backgroundImage.crossOrigin="anonymous";
        // backgroundImage.src = 'https://cdna.artstation.com/p/assets/images/images/009/291/482/medium/oliver-hitchen-tileable-grass-x4.jpg?1518144203';
        // backgroundImage.onload = () => {
        //     this.background = this.context.createPattern(backgroundImage, 'repeat');
        // };
        this.camera.setTarget(this.stillEntity);
        //this.camera.position = new Point(-0,0);
    }
}