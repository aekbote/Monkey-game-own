var bgImg, bg;
var monkeyImg, monkey;
var money,  moneyImg;
var blockImg, block;
var score = 0;
var moneyGroup;
var strength = 300;
var fruit;
var gameState = "play";
var life = 3;
var heart1, heart2, heart3;
var heart,ground;



function preload(){

  bgImg = loadImage("./assets/Bg.jpg");
  monkeyImg = loadImage("./assets/monkey.png");
  moneyImg = loadImage("./assets/money.png");
  blockImg = loadImage("./assets/block.png");
  fruit1Img = loadImage("./assets/mango.png");
  fruit2Img = loadImage("./assets/watermelon.png");
  heart1 = loadImage("./assets/heart_1.png");
  heart2 = loadImage("./assets/heart_2.png");
  heart3 = loadImage("./assets/heart_3.png");



}

function setup(){
createCanvas(windowWidth, windowHeight);

engine = Matter.Engine.create();
world = engine.world;

bg = createSprite(width/2, height/2, width, height);
bg.addImage(bgImg);
bg.scale = 1.9;

monkey = createSprite(width/2, height-300, 20, 20);
monkey.addImage(monkeyImg);
monkey.scale = 0.5;
monkey.setCollider("rectangle", 0, 0, monkey.width-120,monkey.height-100);
//monkey.debug=true;

ground = createSprite(width/2,height,width,10);

moneyGroup = createGroup();
fruitGroup = createGroup();
blockGroup = createGroup();

heart = createSprite(120,110,10,10);
heart.addImage("heart3", heart3);
heart.addImage("heart2", heart2);
heart.addImage("heart1", heart1);
heart.scale = 0.3;


}


function draw(){

  Matter.Engine.update(engine);

  background("black");
  
 
  if(gameState === "play"){
    
    createBlocks();
    createCoins();
    createFruits(); 
    
    //if space key is pressed
    if(keyDown("SPACE") || touches.length>0){
      monkey.velocityY =-10;
    }
 
    //adding gravity
    monkey.velocityY = monkey.velocityY + 1.5;

    // if left key is pressed
    if(keyDown("LEFT_ARROW")){
      monkey.x = monkey.x -10;
    }

    // if right key is pressed
    if(keyDown("RIGHT_ARROW")){
      monkey.x = monkey.x +10;
    }

    strength -= 1;

    monkey.overlap(moneyGroup, moneyCollide);
    monkey.collide(blockGroup);
    //monkey.collide(ground);
    monkey.overlap(fruitGroup, fruitCollide);
  
    
    if( strength ===0 ){
      checkEndCondition();
    }
  }    

  else if(gameState === "end"){
    
    fruitGroup.destroyEach();
    moneyGroup.destroyEach();
    blockGroup.destroyEach();
    monkey.destroy();
    score = 0;
    strength = 300;
    sweetAlert();
  }

 // block.debug = true;
 // monkey.debug = true;

 drawSprites();
 showStrength();
 textSize(20);
  fill("white");
  text("score: "+ score, 50,80);

  textSize(20);
  fill("white");
  text("life: " + life, 50, 60);

 
  
}

function checkEndCondition(){
 
    console.log("OLD "+life);
  
    life = life-1;
    console.log("NEW "+life);
    if(life===2){
      heart.changeImage("heart2");
      strength=300;
    }
    if(life===1){
      heart.changeImage("heart1");
      strength=300;
    }
    if(life == 0){
      gameState = "end";
    }

}

function createCoins(){

  if(frameCount % 150 === 0){

    money = createSprite(750, -10, 30, 20);
    money.addImage(moneyImg);
    money.scale = 0.09;

    money.x = Math.round(random(200, 1400));
    money.velocityY = 3.5;
    money.lieftime = 600;

    moneyGroup.add(money);

    //money.debug = true;

  }
}

function createBlocks(){
  
  if(frameCount % 100 === 0){

  block = createSprite(890, -10, 30, 20);
  block.addImage(blockImg);
  block.scale = 0.9;
  block.setCollider("rectangle", 0, 0, 220, 120);
 

  block.x = Math.round(random(200,width-200));
  block.velocityY =3.5;
  block.lifetime = 500;
  block.setCollider("rectangle",0,0,block.width-80,block.height-90);

  blockGroup.add(block);
  //block.debug = true;
  }

}

function createFruits(){

  if(frameCount % 100 === 0){

    fruit = createSprite(random(200, width-200),0,100, 100);
    fruit.velocityY =3;

    var rand = Math.round(random(1,2));
    switch(rand){
      case 1: fruit.addImage(fruit1Img);
      fruit.scale = 0.5;
      break;
      case 2: fruit.addImage(fruit2Img);
      fruit.scale = 0.2;
      break;
    }

    fruitGroup.add(fruit);
    //fruit.debug=true;
    
  }
  if(fruit){
  fruit.display()
  }
  
}

function moneyCollide( monkey, money){

  money.remove();
  score += 1;

}

function fruitCollide(monkey, fruit){

  fruit.remove();
  strength+= 100;
  // how to reset strength when fruit is eaten
  if(strength>=300){

    strength = 300;
  }
}

function sweetAlert(){

  swal({

    title: "Oh No! You lost the game!",
    imageUrl:
    "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  },
  function(isConfirm) {
    if (isConfirm){
      location.reload()
    }
  }
  );
}
  
function showStrength() {
  push();
  //image(fuelImage, width / 2 - 130, height - player.positionY - 350, 20, 20);
  fill("white");
  rect(width-350, 50, 300, 20);
  fill("#ffc400");
  rect(width-350,50, strength, 20);
  noStroke();
  pop();
}


