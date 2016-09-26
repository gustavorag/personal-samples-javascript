
var memory = [];

function saveToMemory(key, value, onCompletion){

  var newValue = key+':'+value;
  memory.push(newValue);
  onCompletion('New value pushed into memory:'+newValue+'. Memory now : '+memory);
}

function getValueFromField(){
	var textValue = document.getElementsByName('textValue')[0].value;
	saveToMemory('textValue', textValue, showResultOnLog); //showResultOnLog is the callback function. Here, the functions is passed as parameter.
}

function getValueFromRadio(){
	var radioValue;

	var radioOptions = document.getElementsByName('radioOptions');
	for(var index = 0; index < radioOptions.length; index++){
		if(radioOptions[index].checked){
			radioValue = radioOptions[index].value;
			break;
		}
	}
	saveToMemory('radioValue', radioValue, function(msg){ //Here, the callback function is directly declared and passed as parameter.
		alert(msg);
	}); 
}

function showResultOnLog(msg){
	console.log('INFO: '+msg);
}
