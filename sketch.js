//Create variables here

var  dog, happyDog, database, foodS, foodStock,dogIMG,happyDogIMG,database,food;
var fedTime,lastFed,feed,addFood;
var foodOBJ;
function preload()
{
	//load images here

  dogIMG=loadImage("dogImg.png");
  happyDogIMG=loadImage("dogImg1.png");
}

function setup() {
	createCanvas(1000, 400);
 
  foodOBJ= new Food ();
 database=firebase.database();
 foodStock=database.ref('Food');
 foodStock.on=("value",readStock); 
 foodStock.set(20);

  dog =createSprite(250,360,10,60);
  dog.addImage(dogIMG);
  dog.scale=0.2;

  feed=createButton("Feed The Dog")
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton("Add Food");
addFood.position(800,95);
addFood.mousePressed(addFood);
}


function draw() {  

  background("pink");
  foodOBJ.display();

  fedTime=database.ref('FeedTime');
  feedTime.on("value",function(data){
    lastFed=data.val();
  })
  }

  
 
  if(lastFed>=12){
    
    textSize(15);
    fill("white")
  text("Last Fed:"+lastFed%12+PM,350,30)
}else if(lastFed==0){
  text("Last Feed:12AM",350,30)
} else{ text(" Last Fed"+lastFed+"AM",50,50);}

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogIMG);

      

    if(foodS===0){
      foodS=20;
    }
  }
  drawSprites();
  if(foodS!==undefined){
    textSize(20);
    fill("black");
    text("Note: Press Up Arrow to feed your pet  milk",50,50);
    text("Food Remaining:"+foodS,150,150);

}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;}
    database.ref('/').update({
      food:x
    });
    

  }

function readStock(data){
foodS=data.val();
}

function feedDog(){
  dog.addImage(happyDog);
  foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1)
  database.ref('/').update({
   Food: foodOBJ.getFoodStock(),
   FeedTime:hour()
 })
}

function addFood(){
  FodS++;
  database.ref('/').update({
    Food: FoodS
})}







