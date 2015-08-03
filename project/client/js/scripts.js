var wordLengthCounter = function(str){
	if (str === undefined)
		return 0;
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
	var maxNumberOfWords = 10;
	
	wordCounter.innerHTML = "Remaining Words: " + maxNumberOfWords;
	
	var checkAndLimitLength = function(event){
		var wordLength = wordLengthCounter(this.value);
		if (wordLength > maxNumberOfWords){
			var finalString = this.value;
			var words = this.value.split(' ');
			
			words.splice(maxNumberOfWords, wordLength - maxNumberOfWords);
			
			descBox.value = words.join(' ');
			wordLength = maxNumberOfWords;
		}
		wordCounter.innerHTML = "Remaining Words: " + (maxNumberOfWords - wordLength);
	}
	
	descBox.addEventListener('keydown', checkAndLimitLength);
	descBox.addEventListener('keyup', checkAndLimitLength);
}