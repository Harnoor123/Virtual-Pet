var dog,happydog,database,foodS,foodStock;
var batabase;
var press;
var feed,addFood,fedTime,lastFed,foodObj;
function preload()
{
	//load images here
  dogImg = loadImage("dogImg.png");
  happydog = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(900,500);
  database = firebase.database();

  foodObj = new Food();

  dog = createSprite(800,250);
  dog.scale =0.2;
  dog.addImage(dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);  

}

function draw() {  
background("lightgreen");

foodObj.display();
  
  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(16);
  stroke("black");
  strokeWeight(3);

  if(lastFed>=12){
    text("Last Feed :"+lastFed%12 +"PM",350,35);
  } else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  } else{
    text("Last Feed :"+lastFed +"AM",350,35);
  }
  
 
  drawSprites();
  //add styles here
 
 
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

 function feedDog(){
   dog.addImage(happydog);
   var food_stock_val=foodObj.getFoodStock();
   if(food_stock_val<=0){
      foodObj.updateFoodStock(food_stock_val*0);
   }
   else{
       foodObj.updateFoodStock(food_stock_val-1);
   }
   
   database.ref('/').update({
     Food:foodObj.getFoodStock(),
     FeedTime:hour()
   })
 }

 function addFoods(){
   foodS++;
   database.ref('/').update({
     Food:foodS
   })
 }





