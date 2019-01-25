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
  var deck = [];
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
  return deck;
}
function checkVal(arr) {
  var val = 0;
  var ace = 0;
  arr.forEach(function(ar)
{
  if(ar.charAt(0) === "J" || ar.charAt(0) === "Q" || ar.charAt(0) === "K"  ){
val+=10;
}else if(ar.charAt(0) === "A")
{
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
  while(A.length > 0) {
      A.pop();
  }
}

var losses = 0;
var wins = 0;
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
    $(".deal").click(function(event){
      //initialize everything
      var deck = createDeck();
      shuffle(deck);
      var myVal = 0;
      var dVal = 0;
      $(".deal").hide();
      $(".hit").show();
      $(".stand").show();
      $(".mycards").empty();
      $(".dcards").empty();
      $(".pval").empty();
      $(".wins").text("Wins: " + wins);
      $(".losses").text("Losses: " + losses);
      dCards = deck.slice(0,2);
      myCards = deck.slice(2,4);
      myCards.forEach(function(i){
        $(".mycards").append("<li>" + i +"</li>");
      });
      dCards.forEach(function(i){
        $(".dcards").append("<li>" + i +"</li>");
      });
      myVal = checkVal(myCards);
      if(myVal === 21)
      {
        //blackjack, player wins
        wins++;
        $(".pval").text("Blackjack");
        $(".deal").show();
        $(".hit").hide();
        $(".stand").hide();

      }
      //Put the used cards in the bottom of the deck
      deck = deck.slice(4,deck.length).concat(deck.slice(0,4));
      $(".hit").click(function(event){
        $(".mycards").empty();
        console.log(myCards);
        myCards.push(deck[0]);
        myCards.forEach(function(i){
          $(".mycards").append("<li>" + i +"</li>");
        });
        deck = deck.slice(1,deck.length).concat(deck.slice(0,1));
        myVal = checkVal(myCards);
        if(myVal > 21)
        {
          //player has lost
          $(".pval").text("Busted");
          gameOver(dCards, myCards);
          clearArr(myCards);
          console.log(myCards);
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
