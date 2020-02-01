import {World} from "../World";
import {Input} from "../Game";
import {Polygon, Point} from "../Geometry/index";
import {Collision} from "../Physics/index";
import {Sprite} from "../Graphics/index";

export class Entity {
  
  color:string = 'black';
  selectable: boolean = false;
  collision: Polygon;
  rotation: number = 0;
  collidesWith: Entity[] = [];
  public isColliding: boolean = true;
  private sprite: Sprite;

  weight: number = 1000 * 0.017;

  constructor(
    public position: Position,
    public size: Size = null,
    public acceleration: Vector2D = null,
    public velocity: Vector2D = {x: 0, y: 0}
  ) {
    const halfWidth: number = this.size.width/2;
    const halfHeight: number = this.size.height/2;

    this.sprite = new Sprite(
      'https://i.ibb.co/CKKVtdY/Pin-Clipart-com-videogames-clipart-576226.png',
      {width: 30, height: 30}
    );

    if(this.isColliding) {
      this.collision = new Polygon(
        [
          new Point(this.position.x - halfWidth, this.position.y - halfHeight),
          new Point(this.position.x + halfWidth, this.position.y - halfHeight ),
          new Point(this.position.x + halfWidth, this.position.y + halfHeight),
          new Point(this.position.x - halfWidth, this.position.y + halfHeight),
        ]
      );
    }
  }

  update(input: Input, world: World) {
    this.velocity.x *= world.friction / this.weight;
    this.velocity.y *= world.friction / this.weight;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.updateCollisionBox();
  };

  updateCollisionBox() {
    if(!this.collision) return;

    this.collision.points.forEach((
      point: Point
    ) => {
      point.x += this.velocity.x;
      point.y += this.velocity.y;
    });
  }

  renderCollisionBox(context: CanvasRenderingContext2D) {
    if(!this.collision) return;
    context.globalAlpha = 0.5;
    context.fillStyle = this.color;
    if(this.isColliding) {
      context.fillStyle = 'red';
    }

    context.beginPath();
    context.moveTo(this.collision.points[0].x, this.collision.points[0].y);
    this.collision.points.forEach(
      (point: Point) => {
        context.lineTo(point.x, point.y);
      }
    )
    context.fill();
    context.globalAlpha = 1;
  }

  public collisionCheck(entity: Entity, world: World) {
    if(!this.collision || !entity.collision) return false;
    
    const collided = this.collision.collisionCheck(entity.collision);
    
    if(collided) {
      const collision = new Collision(this, entity);
      this.isColliding = true;
      entity.isColliding = true;
      this.collisionHandler(entity, world, collision)
    }
    return collided;
  }

  public moveTo(target: Point) {
    if(!this.position.isEqual(target)) {
      const distance = this.position.distance(target);
      this.position.x += distance.x/2;
      this.position.y += distance.y/2;
    } else {
      this.position.x = target.x;
      this.position.y = target.y
    }
  }

  public collisionHandler(entity: Entity, world: World, collision: Collision) {
    const force = collision.getCollisionForce();

    this.velocity.x = -Math.cos(collision.getCollisionAngle()) * force.x;
    this.velocity.y = -Math.sin(collision.getCollisionAngle()) * force.y;
  }

  render(context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) {
    if(this.sprite.isReady) {
      context.drawImage(
        this.sprite.image,
        this.position.x - (this.sprite.size.width/2),
        this.position.y - (this.sprite.size.height/2),
        this.sprite.size.width,
        this.sprite.size.height
      );
    }
    // this.renderCollisionBox(context);
  }

  renderLight(context: CanvasRenderingContext2D) {
    context.globalCompositeOperation = 'lighter';
        // Radii of the white glow.
    const radius = 40;

    context.fillStyle = "#111"; //blue
    context.beginPath();
    context.arc(this.position.x,this.position.y,radius,0,Math.PI*2,true);
    context.closePath();
    context.fill();
        context.beginPath();
    context.arc(this.position.x,this.position.y,radius*.8,0,Math.PI*2,true);
    context.closePath();
    context.fill();
    // context.fill();
  }
}

export interface Position extends Point{
}

export interface Size {
  width: number;
  height: number;
}

export interface Vector2D  {
  x: number;
  y: number;
}