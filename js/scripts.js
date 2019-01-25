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
    console.log(input);
    toList(input);
    event.preventDefault();
    });
    $(".deal").click(function(event){
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

        console.log(toPush);
        deck.push(toPush);
      }
      console.log(deck);
    });
  });
