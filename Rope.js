class Rope{

    constructor(pointA, bodyB){
        
        var options ={
        pointA: pointA,
        bodyB: bodyB,
        stiffness: 0.1,
        length: 11
        
        }

        this.link =  Matter.Constraint.create(options);
        Matter.World.add(world, this.link);


    }

    display(){

        if(this.link.bodyB){
            push()
            fill("green")
        
           line(this.link.pointA.x, this.link.pointA.y, this.link.bodyB.position.x, this.link.bodyB.position.y);
           pop();
        }
    }

    dettach(){

        this.link.bodyB = null;
    }

}