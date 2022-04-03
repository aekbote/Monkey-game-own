class Fruit{

    constructor(x,y,r){

        var options ={

            density: 1,
            airFriction: 2,
            isStatic: false
        }

        this.body = Matter.Bodies.circle(x, y, r, options);
        this.r = r;
        this.x = x;
        this.y = y;

        Matter.World.add(world, this.body);
        this.image = loadImage("./assets/mango.png");

    }

    display(){

        var fruitPos = this.body.position;
        push();
        translate(fruitPos.x, fruitPos.y);
        imageMode(CENTER);
        image(this.image, 0, 0, this.r, this.r);
        pop();
    }

    
}          