var monkey, monkey_running
var ground
var banana, bananas
var obstacle, obstacleIMG
var fdGroup, obGroup
var score = 0

function preload() {

  monkey_running = loadAnimation("monkey_0.png", "monkey_1.png", "monkey_2.png", "monkey_3.png", "monkey_4.png", "monkey_5.png", "monkey_6.png", "monkey_7.png", "monkey_8.png")
  bananas = loadImage("banana.png")
  obstacleIMG = loadImage("obstacle.png")
}

function setup() {
  createCanvas(500, 400);

  //creating monkey
  monkey = createSprite(100, 300, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1
  ground = createSprite(400, 350, 900, 10)
  ground.velocityX = -5
  fdGroup = new Group()
  obGroup = new Group()
}

function draw() {

  background(255);
  spawnFood();
  spawnObstacles()
  drawSprites();
  if (ground.x < 0) {
    ground.x = ground.width / 2
  }
  if (keyDown("space")) {
    monkey.velocityY = -8
  }
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground)
  if (monkey.isTouching(obGroup)) {
    monkey.velocityY = 0
    ground.velocityX = 0
    fdGroup.setVelocityXEach(0)
    obGroup.setVelocityXEach(0)
  }
  text("Survival time" + score, 100, 50)
  score = score + Math.round(getFrameRate() / 60)
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600, Math.round(random(120, 200)), 40, 40)
    banana.velocityX = -5
    banana.addImage('b', bananas)
    banana.scale = 0.09
    fdGroup.add(banana)
  }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(800, 320, 10, 40)
    obstacle.velocityX = -5
    obstacle.addImage('o', obstacleIMG)
    obstacle.scale = 0.15
    obGroup.add(obstacle)
  }
}