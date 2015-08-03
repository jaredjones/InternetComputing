var wordLengthCounter = function(str){
	var words = str.split(' ');
	var currentWordLength;
	if (str.length == 0){
		currentWordLength = 0;
	}else{
		currentWordLength = words.length;
	}
	return currentWordLength;
}

var initalizeWorkDescriptionWordLimiter = function(){
	var descBox = document.getElementById("work-desc");
	var wordCounter = document.getElementById("remaining-word-counter");
	var maxNumberOfWords = 300;
	
	wordCounter.innerHTML = "Remaining Words: " + maxNumberOfWords;
	
	var checkLength = function(event){
		var wordLength = wordLengthCounter(this.value);
		wordCounter.innerHTML = "Remaining Words: " + (maxNumberOfWords - wordLength);
	}
	
	descBox.addEventListener('keydown', checkLength);
	descBox.addEventListener('keyup', checkLength);
}