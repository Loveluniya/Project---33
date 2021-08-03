const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var con1;
var con;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn,button2;

var rope1;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var bubbleImg,bubble; 
var ground2;

function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
  bubbleImg = loadImage('bubble.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  
 blink.playing = true;
   eat.playing = true;
   sad.playing = true;
   sad.looping = false;
   eat.looping = false; 
}

function setup() {
  createCanvas(490,690);
 
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,365);
  button.size(50,50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(190,250);
  button2.size(50,50);

  mute_btn = createImg('mute.png');
  mute_btn.position(width-50,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  

  ground = new Ground(200,690,600,20);
  ground2 = new Ground(300,150,100,10);

  

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(250,80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  bubble = createSprite(270,400,50,50);
  bubble.addImage(bubbleImg);
  bubble.scale = 0.1;

var fruit_options = {

restitution:0.8

}

  fruit = Bodies.circle(170,400,20,fruit_options);
  World.add(world,fruit);
  

  rope = new Rope(3,{x:20,y:365});
  rope1 = new Rope(4,{x:210,y:250});
  con = new Link(rope,fruit);
  con1 = new Link(rope1,fruit);

  ellipseMode(RADIUS);

}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);
  Engine.update(engine);
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  pop();

  rope.show();
  rope1.show();
  ground.show();
  ground2.show();

  if(collide(fruit,bunny,80)==true)
  {
    remove_rope();
    bubble.visible = false;
    World.remove(engine.world,fruit);
    fruit = null;
    bunny.changeAnimation('eating');
    eating_sound.play();
    
  }

  if(collide(fruit,bubble,40)==true)
  {
   engine.world.gravity.y=-1;
   bubble.position.x = fruit.position.x;
   bubble.position.y = fruit.position.y;

  }
    drawSprites(); 
}

function drop()
{
  cut_sound.play();
  rope.break();
  con.detach();
  con = null;
} 
 
function collide(body,sprite,x) 
{ 
  if(body!=null) 
        { 
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
         
          if(d<=x)
            {
             
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}

function remove_rope(){

rope1.break();
con1.detach();
con1= null;

}