import {Entity, Vector2D} from './Entity';
import {Input} from '../Game';
import {Keyboard} from '../Input/Keyboard';
import {World} from "../World";

export class Player extends Entity {
  selectable: boolean = true;
  color:string = 'orange';
  acceleration: Vector2D = {
    x: .4,
    y: .4
  };

  weight: number = 60 * 0.017;

  velocity: Vector2D ={
    x: 0,
    y: 0
  };

  update(input: Input, world: World) {
    super.update(input, world);


    if(input.keyboard.isDown(Keyboard.KEYCODES.right_arrow)) {
      this.velocity.x += this.acceleration.x;
    } 
    if(input.keyboard.isDown(Keyboard.KEYCODES.left_arrow)) {
      this.velocity.x -= this.acceleration.x;
    } 
    if(input.keyboard.isDown(Keyboard.KEYCODES.up_arrow)) {
      this.velocity.y -= this.acceleration.x;
    }  
    if(input.keyboard.isDown(Keyboard.KEYCODES.down_arrow)) {
      this.velocity.y += this.acceleration.x;
    }
  }
}