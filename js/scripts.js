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
      $(".deal").hide();
      $(".hit").show();
      $(".stand").show();
      $(".dcards").append("<li>" + deck[0] + deck[1] +"</li>");
      $(".mycards").append("<li>" + deck[2] + deck[3] +"</li>");
      //Put the used cards in the bottom of the deck
      deck = deck.slice(4,deck.length).concat(deck.slice(0,3));
      
    });
  });
