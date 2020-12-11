var dog,dogImg;
var happyDog,happyDogImg;

var database;
var foodS, foodObj;

var lastFed;

var feedButton, addFoodButton;

function preload()
{
    dogImg=loadImage("images/dogImg.png");
    happyDogImg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500,500);
  database=firebase.database();

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;

  var feedTime = database.ref('lastFed');
  feedTime.on("value",function(data){
    lastFed = data.val();
  });
  
  var feedButton=createInput("Feed the dog");
  feedButton.position(50,100);
  var addFoodButton=createButton("Add food");
  addFoodButton.position(50,200);

  foodObj = new Food();
  foodObj.getFoodStock();
}


function draw() {  
   background(46,139,87);
   
   if (lastFed !== undefined){
    fill(255,255,254);
    textSize(15);
    if(lastFed>=12)
    {
      text("Last fed: "+lastFed%12+"PM",350,30);
    }else if(lastFed==0)
    {
      text("Last fed : 12AM",350,30);
    }else{
      text("Last fed: "+lastFed+"AM",350,30);
    }
  }

    drawSprites();
    foodObj.display();


    feedButton.mousePressed(()=>{
      dog.addImage(happyDogImg);
      foodS = foodS - 1;
      foodObj.updateFoodStock(foodS);
      lastFed = hour();
      database.ref('/').update({
        lastFed: feedTime
      });

    });


    addFoodButton.mousePressed(()=>{
      food = foodS + 1;
      foodObj.updateFoodStock(foodS);
    });
  
}

