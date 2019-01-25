function parNum(num){
  arr = [];
  for(var i = 0;i<num;i++)
  {
    if([3].includes(i))
    {
      arr.push("I'm sorry, Dave. I'm Afraid I can't do that");
    }else if([2].includes(i)){
      arr.push("Boop");
    }else if([1].includes(i)){
      arr.push("Beep!");
    }else{
      arr.push(i);
    }
  }
  return arr;
}
$(document).ready(function(){
  /*function toList(arr){
    arr.forEach(function(ar){
      $("ul").append("<li>" + ar +"</li>");
    });*/
  $("form#transportation_survey").submit(function(event){
      var input = $("#num").val();
      var input = parNum(parseInt(input));
      debugger;
      input = parNum(input);
      console.log(input);
    //  toList(input);
    console.log(input);
    event.preventDefault();
    });
  });
