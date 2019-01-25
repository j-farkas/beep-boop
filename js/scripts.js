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
      $("ul").append("<li>" + ar +"</li>");
    });
  }
  $("form#numshift").submit(function(event){
    $('ul').empty();
    var input = $("#num").val();
    input = parNum(parseInt(input));
    toList(input);
    event.preventDefault();
    });
  });
