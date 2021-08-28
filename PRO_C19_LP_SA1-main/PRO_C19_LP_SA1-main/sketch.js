var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg, ghostImg2
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostImg2= loadImage("ghost-jumping.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup= new Group()
  climbersGroup=new Group()
  ghost=createSprite(300,400)
  ghost.addImage(ghostImg)
  ghost.scale=0.3
}

function draw() {
  background(200);
  spookySound.play()
if (gameState=='play'){
  if(tower.y > 400){
      tower.y = 300
    }
  if (frameCount%150==0){
    doorCreate()
  }
  if (keyDown("space")){
    ghost.velocityY=-7
    ghost.addImage(ghostImg2)
  }
  ghost.velocityY=ghost.velocityY+1
  if (keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-5
  }
  if (keyDown("RIGHT_ARROW")){
    ghost.x=ghost.x+5
  }
  if (ghost.isTouching(doorsGroup)&&ghost.isTouching(climbersGroup)){
    ghost.velocityY=0
    ghost.velocityX=0
  }
  if (ghost.y>600 || ghost.isTouching(climbersGroup)){
    gameState='end'
    ghost.destroy()
    climbersGroup.destroyEach()
    doorsGroup.destroyEach( )
  }
}

  drawSprites()
if (gameState=='end'){
  textSize(20)
  fill('white')
  text ("Game Over", 270, 300)
  tower.velocityY=0
  doorsGroup.velocityY=0
  climbersGroup.velocityY=0
  spookySound.stop()
  }
}

function doorCreate(){
  door=createSprite(300,0)
  door.addImage(doorImg)
  door.scale=0.75
  door.velocityY=1
  doorsGroup.add(door)
  door.x=Math.round(random(70,530))
  climber=createSprite(300,50)
  climber.addImage(climberImg)
  climber.velocityY=1
  climber.scale=0.75
  climbersGroup.add(climber)
  climber.x=door.x
  ghost.depth=door.depth
  ghost.depth+=1
}

