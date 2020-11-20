var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkey_stop 
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup
var survivalTime = 0;


function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  monkey_stop = loadAnimation("sprite_0.png","sprite_1.png");
 
}

function setup() {
  createCanvas(600,350);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,2000,10);
  ground.velocityX = -4;
  ground.x = ground.width/ 2;
  console.log(ground.x);
survivalTime = 0;
  
   obstaclesGroup = createGroup();
   bananaGroup = createGroup();
  
   monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true;
  
}


function draw() {
  background(200);
  drawSprites();
   stroke("black");
  textSize(20);
  fill("black");
   text("SurvivalTime: "+ survivalTime,100,50);
  
  
  if(gameState === PLAY){
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -5;
   
     }
       monkey.velocityY  = monkey.velocityY + 0.3;
     
    spawnObstacles();
  spawnbananas();
     
}
   if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
   }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }
  
  monkey.collide(ground);
  
  if (gameState === END) {
       
     ground.velocityX = 0;
      monkey.velocityX = 0;
    monkey.velocityY = 0;
   
    // to stop the monkey
    monkey.changeAnimation("stop",monkey_stop);
    
     obstaclesGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
 
    obstaclesGroup.lifetime = 900;
    bananaGroup.lifetime = 900;
    
        
  }
 
   
  }

function spawnObstacles(){
 if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,10,40);
   obstacle.velocityX = -(6 + survivalTime/100);
    var rand = Math.round(random(1,6));
   obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 700;
    obstaclesGroup.add(obstacle);
   
 }
}

function spawnbananas() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var banana = createSprite(600,150,10,40);
    banana.y = Math.round(random(80,150));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
        banana.lifetime = 700;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    bananaGroup.add(banana);
  }
}






