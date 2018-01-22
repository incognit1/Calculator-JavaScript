window.onload = function(){
		var container = get(".container"),
			arrButtons = container.getElementsByTagName("button"),
			historyOutput = get('#output'),
			historySection = get('#history'),
			pressed = get('#pressed'),
			memory = get('#memory');
		var numeric,
			flag = false,
			flagCalc = false,
			firstCalc = true;
		var patDigit = /[0-9|\.]+/,
			patOperations = /[\*\/\+\-]/;

		container.addEventListener('click', function(event){
			if (event.target.nodeName == 'BUTTON'){
				if (~event.target.value.search(patDigit)) {
					if (flagCalc) {
						pressed.value = ''; 
						flagCalc = false;  
					}
					pressed.value += event.target.value;
					flag = true;
				}

				else if (~event.target.value.search(patOperations)) {
					if (flag) {
						pressed.value += event.target.value;
						flag = false;
						flagCalc = false;  
					}
				}

				switch (event.target.value) {
					case '=': 	
						if(!pressed.value == "") {
							if (firstCalc = true) {historySection.classList.add("show"); firstCalc = false}
							numeric = Math.floor(eval(pressed.value) * 100) / 100;
							get('#output').innerHTML += '\n' + pressed.value;
							get('#output').innerHTML += '=' + numeric;	
							pressed.value = numeric;
							flagCalc = true;
							firstCalc = true;
						}
						break;
					case 'CLast':
						var clast = pressed.value.substring(0, pressed.value.length-1);
						pressed.value = clast;
						break;
					case 'C':
						pressed.value = "";
						break;
					case 'M':
						memory.innerHTML = pressed.value;
						break;
				}
			}
		}, false) 
		
		historyOutput.addEventListener('change', function() {
			this.innerHTML = this.value;
		}, false)

		function get(el) {
			return document.querySelector(el);
		}
}