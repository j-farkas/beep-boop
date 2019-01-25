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

var losses = 0;
var wins = 0;
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
  console.log(myCards);
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
      $(".wins").text("Wins: " + wins);
      $(".losses").text("Losses: " + losses);
      myCards.forEach(function(i){
        $(".mycards").append("<li>" + i +"</li>");
      });
      dCards.forEach(function(i){
        $(".dcards").append("<li>" + i +"</li>");
      });
      if(checkVal(myCards) === 21)
      {
        //blackjack, player wins
        wins++;
        $(".pval").text("Blackjack");
        $(".deal").show();
        $(".hit").hide();
        $(".stand").hide();
        clearArr(myCards);
      }
      $(".hit").off().on('click', function() {
        $(".mycards").empty();
        hit();
        myCards.forEach(function(i){
          $(".mycards").append("<li>" + i +"</li>");
        });
        if(checkVal(myCards) > 21)
        {
          //player has lost
          $(".pval").text("Busted");
          gameOver(dCards, myCards);
          losses++;
        }
      })
      $(".stand").click(function(event){
        $(".dcards").empty();
        dCards.forEach(function(i){
        $(".dcards").append("<li>" + i +"</li>");});
        dVal = checkVal(dCards);
        while(dVal < 16 && dVal < myVal)
        {
          dCards.push(deck[0]);
          $(".dcards").append("<li>" + deck[0] +"</li>");
          deck = deck.slice(1,deck.length).concat(deck.slice(0,1));
          dVal = checkVal(dCards);
        }
        if(dVal > 21)
        {
          //player has won
          $(".pval").text("Dealer Busts");
          $(".deal").show();
          $(".hit").hide();
          $(".stand").hide();
          wins++;
          myCards.length = 0;
          dCards.length = 0;
        }else if(myVal > dVal)
        {
          //player has a higher value
          $(".pval").text("You win");
          $(".deal").show();
          $(".hit").hide();
          $(".stand").hide();
          wins++;
          myCards.length = 0;
          dCards.length = 0;
        }else{
          //player has a lower value
          $(".pval").text("You lose");
          losses++;
          dCards.length = 0;
          myCards.length = 0;
          gameOver(dCards,myCards);

        }
      })

    });
  });
