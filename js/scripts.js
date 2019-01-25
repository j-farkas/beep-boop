function parNum(num){
  arr = [];
  for(var i = 0;i<num;i++)
  {
    var j = i.toString().split('');
    if(j.includes("3"))
    {
      arr.push("I'm sorry, Dave. I'm Afraid I can't do that");
    }else if(j.includes("2")){
      arr.push("Boop");
    }else if(j.includes("1")){
      arr.push("Beep!");
    }else{
      arr.push(j.join(''));
    }
  }
  return arr;
}

var myVal = 0;
var dVal = 0;
var myCards = [];
var dCards = [];
var deck = [];

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function createDeck(){
  for(i=1;i<=52;i++)
  {
    var toPush = "";
    if(i%13 === 1)
    {
      toPush+="Ace"
    }else if(i%13 === 11)
    {
      toPush+="Jack"
    }else if(i%13 === 12)
    {
      toPush+="Queen"
    }else if(i%13 === 0)
    {
      toPush+="King"
    }else{
    toPush += i%13;
    }
    toPush += " of ";
    if(i/13 <= 1)
    {
      toPush+="Spades";
    }else if(i/13 <= 2)
    {
      toPush+="Hearts"
    }else if(i/13 <=3 )
    {
      toPush+="Clubs";
    }else{
    toPush += "Diamonds";
    }

    deck.push(toPush);
  }
}
function checkVal(arr) {
  var val = 0;
  var ace = 0;
  arr.forEach(function(ar){
  if(ar.charAt(0) === "J" || ar.charAt(0) === "Q" || ar.charAt(0) === "K"  ){
    val+=10;
  }else if(ar.charAt(0) === "A"){
  val += 11;
  ace += 1;
  }else{
  //To handle 10s
  val += parseInt(ar.split(" ")[0]);
  }

})

while(val > 21 && ace > 0)
{
  val -= 10;
  ace -= 1;
}
  return val;
}

function gameOver(arr, arr2){
  $(".deal").show();
  $(".hit").hide();
  $(".stand").hide();
  clearArr(arr);
  clearArr(arr2);
}

function clearArr(A){
  A = [];
}


function init()
{
  myCards.length = 0;
  shuffle(deck);
  var topTwo = [deck.shift(), deck.shift()];
  var nextTwo = [deck.shift(), deck.shift()];
  dCards = topTwo;
  myCards = nextTwo;
  topTwo.forEach(function(a){
    deck.push(a);
  })
  nextTwo.forEach(function(a){
    deck.push(a);
  })
}

function hit(){
  var topCard = deck.shift();
  myCards.push(topCard);
  deck.push(topCard);
}
function stand(){
  dVal = checkVal(dCards);
  while(dVal < 16 && dVal < checkVal(myCards))
  {
    dCards.push(deck[0]);
    deck = deck.slice(1,deck.length).concat(deck.slice(0,1));
    dVal = checkVal(dCards);
  }
}
function randomBack(){
  var j = Math.floor(Math.random() * 6);
  switch(j){
  case 0:
    j = "Red";
    break;
  case 1:
    j = "Gray";
    break;
  case 2:
    j = "Green";
    break;
  case 3:
    j = "Yellow";
    break;
  case 4:
    j = "blue";
    break;
  case 5:
    j = "purple";
    break;
}
  return j;
}
$(document).ready(function(){
  function toList(arr){
    arr.forEach(function(ar){
      $(".bbout").append("<li>" + ar +"</li>");
    });
  }
  $("form#numshift").submit(function(event){
    $('.bbout').empty();
    var input = $("#num").val();
    input = parNum(parseInt(input));
    toList(input);
    event.preventDefault();
    });
    createDeck();
    $(".deal").click(function(event){
      //initialize everything
      init();
      $(".deal").hide();
      $(".hit").show();
      $(".stand").show();
      $(".mycards").empty();
      $(".dcards").empty();
      $(".pval").empty();
      myCards.forEach(function(i){
        var j = i.split(" ");
        $(".mycards").append("<li> <img src=img/" +j[0].charAt(0) + j[2].charAt(0)  +".jpg></li>");
      });
      $(".dcards").append("<li> <img src=img/" + dCards[0].split(" ")[0].charAt(0) + dCards[0].split(" ")[2].charAt(0)  +".jpg></li>");
      var backColor = randomBack();
      $(".dcards").append("<li> <img src=img/" + backColor +"_back.jpg></li>");
      $(".pscore").text(checkVal(myCards));
      $(".dscore").text("????");
      if(checkVal(myCards) === 21)
      {
        //blackjack, player wins
        $(".pval").text("Blackjack");
        gameOver(myCards,dCards);
      }
      $(".hit").off().on('click', function() {
        $(".mycards").empty();
        hit();
        $(".pscore").text(checkVal(myCards));
        myCards.forEach(function(i){
          var j = i.split(" ");
          $(".mycards").append("<li> <img src=img/" +j[0].charAt(0) + j[2].charAt(0)  +".jpg></li>");
        });
        if(checkVal(myCards) > 21)
        {
          //player has lost
          $(".pval").text("Busted");
          gameOver(dCards, myCards);
        }
      })
      $(".stand").click(function(event){
        stand();
        $(".dscore").text(checkVal(dCards));
        $(".dcards").empty();
        dCards.forEach(function(i){
        $(".dcards").append($(".dcards").append("<li> <img src=img/" + i.split(" ")[0].charAt(0) + i.split(" ")[2].charAt(0)  +".jpg></li>"));
      });
        var dVal=checkVal(dCards);
        if(dVal > 21)
        {
          //player has won
          $(".pval").text("Dealer Busts");
          gameOver(dCards, myCards);
        }else if(checkVal(myCards) > dVal)
        {
          //player has a higher value
          $(".pval").text("You win");
          gameOver(dCards, myCards);
        }else if(checkVal(myCards) === dVal)
        {
          //tie
          $(".pval").text("Push");
          gameOver(dCards, myCards);
        }else{
          //player has a lower value
          $(".pval").text("You lose");
          gameOver(dCards,myCards);
        }
      })

    });
  });
