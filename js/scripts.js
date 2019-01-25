function romanIn(input){
  var numerals = [];
  if(input >= 1000)
  {
    while(input >= 1000)
    {
      numerals.push("M");
      input -= 1000;
    }
  }
  if(input >=500){
    if(input >= 900){
    numerals.push("C");
    numerals.push("M");
    input -= 900;
  }else{
    while(input >= 500){
      numerals.push("D");
      input -= 500;
    }
  }
  }
  if(input >=100)
  {
    if(input >= 400){
    numerals.push("D");
    numerals.push("C");
    input -= 400;
    }else{
      while(input >= 100)
      {
        numerals.push("C");
        input -= 100;
      }

    }
  }
  if(input >=50)
  {
    if(input >= 90){
    numerals.push("X");
    numerals.push("C");
    input -= 90;
    }else{
      while(input >= 50)
      {
        numerals.push("L");
        input -= 50;
      }

    }
  }
  if(input >=10)
  {
    if(input >= 40){
    numerals.push("X");
    numerals.push("L");
    input -= 40;
    }else{
      while(input >= 10)
      {
        numerals.push("X");
        input -= 10;
      }

    }
  }
  if(input >=5)
  {
    if(input >= 9){
    numerals.push("I");
    numerals.push("X");
    input -= 9;
    }else{
      while(input >= 5)
      {
        numerals.push("V");
        input -= 5;
      }

    }
  }

  if(input >=1)
  {
    if(input >= 4){
    numerals.push("I");
    numerals.push("V");
    input -= 4;
    }else{
      while(input >= 1)
      {
        numerals.push("I");
        input -= 1;
      }

    }
  }
  numerals = numerals.join('');
  console.log(numerals);
  return numerals;
};

$(document).ready(function(){
  $("form#transportation_survey").submit(function(event){
      var input = $("#phrase").val();
      var input = romanIn(parseInt(input));
    console.log(input);
    event.preventDefault();
    });
  });
