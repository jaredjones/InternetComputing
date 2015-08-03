var initalizeWorkDescriptionWordLimiter = function(){
	var descBox = document.getElementById("work-desc");
	var wordCounter = document.getElementById("remaining-word-counter");
	var remainingWords = 300;
	
	wordCounter.innerHTML = "Remaining Words: " + remainingWords;
	
	var checkLength = function(event){
		var words = this.value.split(' ');
		var currentWordLength = words.length;
		wordCounter.innerHTML = "Remaining Words: " + (remainingWords - currentWordLength);
	}
	
	descBox.addEventListener('keydown', checkLength);
	descBox.addEventListener('keyup', checkLength);
}