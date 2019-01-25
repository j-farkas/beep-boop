function parNum(num){
  arr = [];
  for(var i = 0;i<num;i++)
  {
    if([3].includes(i).toString())
    {
      arr.push("I'm sorry, Dave. I'm Afraid I can't do that");
    }else if([2].includes(i)){
      arr.push("Boop");
    }else if([1].includes(i)){
      arr.push("Beep!");
    }else{
      if(i.length>1){
        arr.push(i);
      }else{
      arr.push(i);
      }
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
    var input = $("#num").val();
    input = parNum(parseInt(input));
    console.log(input);
    toList(input);
    event.preventDefault();
    });
  });
