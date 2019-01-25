function parNum(num){
  arr = [];
  for(var i = 0;i<num;i++)
  {
    var j = i.toString().split('');
    console.log(j);
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
  arr=arr.sort();
  var val = 0;
  var ace = 0;
  arr.forEach(function(ar)
{
  console.log(ar.charAt(0));
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
$(document).ready(function(){
  var deck = createDeck();
  shuffle(deck);
  console.log(deck);
  function toList(arr){
    arr.forEach(function(ar){
      $(".bbout").append("<li>" + ar +"</li>");
    });
  }
  $("form#numshift").submit(function(event){
    $('.bbout').empty();
    var input = $("#num").val();
    input = parNum(parseInt(input));
    console.log(input);
    toList(input);
    event.preventDefault();
    });
    $(".deal").click(function(event){
      var myVal;
      var dVal;
      var dCards;
      var myCards;
      $(".deal").hide();
      $(".hit").show();
      $(".stand").show();
      dCards = [deck[0],deck[1]];
      myCards = [deck[2],deck[3]];
      $(".dcards").append("<li>" + dCards[0] + "</li><li>" + dCards[1] +"</li>");
      $(".mycards").append("<li>" + myCards[0] +"</li><li>" + myCards[1] +"</li>");
      myVal = checkVal(myCards);
      console.log(myVal);
      //Put the used cards in the bottom of the deck
      deck = deck.slice(4,deck.length).concat(deck.slice(0,4));
      console.log(deck);
      $(".hit").click(function(event){
        myCards.push(deck[0]);
        $(".mycards").append("<li>" + deck[0] +"</li>");
        deck = deck.slice(1,deck.length).concat(deck.slice(0,1));
        myVal = checkVal(myCards);
        console.log(myVal);
      })

    });
  });
