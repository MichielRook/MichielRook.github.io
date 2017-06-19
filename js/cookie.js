var cookieObject = {	
	/************************Progress cookies*************************/
	setProgressCookie : function (progress, lesson, expmonths) {
		var date = new Date();
		date.setTime(date.getTime() + (expmonths * 30 * 24 * 60 * 60 * 1000));
		var expires = "expires=" + date.toGMTString();
		document.cookie = progress + "=" + lesson + ";" + expires + ";path=/";
	},

	getProgressCookie : function (progress) {
		var name = progress + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	
	checkProgressCookie : function () {
		var progress = this.getProgressCookie("progress");
		if (progress != "") {
			if (progress != "done") {
				window.location.href = "progress" + parseInt(progress) + ".html";
			} else {
				window.location.href = "done.html";
			}
		} else {
			this.setProgressCookie('progress', '1', 30);
			window.location.href = "progress1.html";
		}
	},

	/**************************Input cookies***************************/

	setInputCookie : function (input, currentPage, expmonths) {
		var date = new Date();
		date.setTime(date.getTime() + (expmonths * 30 * 24 * 60 * 60 * 1000));
		var expires = "expires=" + date.toGMTString();
		var inputValue = editor.getValue().replace(/;/g, "SEMICOLON").replace(/,/g, "COMMA").split("\n");
		document.cookie = input + currentPage + "=" + inputValue + ";" + expires + ";path=/";
	},

	getInputCookie : function (input, currentPage) {
		var name = input + currentPage + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},

	checkInputCookie : function (currentPage) {
		var savedInput = this.getInputCookie("input", currentPage);
		if (savedInput != "") {
			editor.getSession().setValue(savedInput.replace(/,/g, "\n").replace(/SEMICOLON/g, ";").replace(/COMMA/g, ","));
		}
	},

	/***********************Navigation functions***********************/

	runCode : function (currentPage) {
		var complete = document.getElementById('popupComplete');
		var wrong = document.getElementById('popupWrong');
		var correctAnswer = [
			"i.am(\'coding\');i.likeIt();i.understandSyntax();",
			
			"i.see(\'John\');john.says(\'Hi!\');i.greetBack();", 
			
			"i.moveTo(\'John\');i.say(\'HiJohn!\');",
			
			"Correct",
			
			"varx=1;while(x<11){i.say(x);x++;}",
			
			"varx;vary;for(x=1;x<6;x++){for(y=1;y<11;y++){i.say(x*y);}}",
			
			"Correct",
			
			"varcarBrands=[\'BMW\',\'Volvo\',\'Saab\',\'Ford\',\'Fiat\',\'Audi\'];carBrands[carBrands.length]=\'Opel\';",
			
			"varsarah={name:\'Sarah\',age:23,gender:\'female\'};sarah.nationality=\'British\';i.say(sarah.name+\'isa\'+sarah.age+\'yearold\'+sarah.nationality+\'\'+sarah.gender+\'.\');",
			"varalmostThere=[1,2,3,4,5,\'Youaredone!\',6,7,8,9,10];functionfinishCourse(almostThere){for(varx=0;x<almostThere.length;x++){if(almostThere[x]==\'Youaredone!\'){i.say(\'Iamfinallydone!\');break;}}}finishCourse(almostThere);"
		];
		
		var code = editor.getValue();//.replace(/"/g, "\'").split("\n");
		var quotationCount = 0;
		
		for (var i = 0; i < code.length; i++) {
			if (code[i] == "'") {
				quotationCount++;
			}
		}
		
		if (quotationCount % 2 != 0) {
			wrong.style.display = "block";
			return;
		}
		
		var newQuotCode = code.replace(/"/g, "\'").split("\n");		
		var lines = [];
		var error = false;
		var progress = this.getProgressCookie("progress");
		
		for (var i = 0; i < newQuotCode.length; i++) {
			if (newQuotCode[i].replace(/\s/g,'').substring(0, 2) != "//") {
				lines.push(newQuotCode[i]);
			}
		}
		
		for (var j = 0; j < lines.length; j++) {
			if (/\S/.test(lines[j])) {
				if (lines[j].charAt(lines[j].length - 1) != ";") {
					error = true;
				}
			}
		}
		
		var answer = lines.join("").replace(/\s/g,'');
		
		if (currentPage == 4) {
			if (!this.checkName(answer, currentPage)) {
				wrong.style.display = "block";
				return;
			} else {
				answer = "Correct";
			}
		} else if (currentPage == 7) {
			if (!this.checkName(answer, currentPage)) {
				wrong.style.display = "block";
				return;
			} else {
				answer = "Correct";
			}
		}
		
		if (answer == correctAnswer[currentPage - 1]) {
			if (progress != "10") {
				if (currentPage == parseInt(progress)) {
					this.setProgressCookie("progress", parseInt(progress) + 1, 30);
				}
			} else {
				this.setProgressCookie("progress", "done", 30);
			}			
			complete.style.display = "block";
		} else {
			wrong.style.display = "block";
		}
	},

	goNext : function (currentPage) {
		var progress = this.getProgressCookie("progress");
		
		if (currentPage != 10) {
			if (parseInt(progress) == currentPage + 1) {
				window.location.href = "progress" + (parseInt(progress)) + ".html";
			} else if (parseInt(progress) > currentPage) {
				window.location.href = "progress" + parseInt(currentPage + 1) + ".html";
			} else if (parseInt(progress) <= currentPage) {
				alert("You have to complete this course first to go to the next one!");
			} else if (progress == "done") {
				window.location.href = "progress" + parseInt(currentPage + 1) + ".html";
			}
		} else if (currentPage == 10) {
			if (progress == "done") {
				window.location.href = "done.html";
			} else {
				alert("You have to complete this course first to finish the tutorial!");
			}
		}
	},

	goPrevious : function (currentPage) {	
		window.location.href = "progress" + (currentPage - 1) + ".html";
	},

	goProg : function (clicked, event) {
		var progress = this.getProgressCookie("progress");
		
		if (parseInt(progress) >= clicked) {
			return true;
		} else if (progress == "done") {
			return true;
		} else {
			event.preventDefault();
			alert("You haven't completed the required subjects to go there!");
		}
	},

	/*************************Other functions**************************/

	checkAccount : function () {
		var progress = this.getProgressCookie("progress");
		
		var welcome = document.getElementById("welcome");
		var name = document.getElementById("name");
		
		var course = document.getElementById("courseName");
		var percent = document.getElementById("percent");
		
		var begin = document.getElementById("message");
		
		var cont = document.getElementById("continue");
		
		name.innerHTML = "Michiel";
		
		switch(progress) {
			case "1":
				course.innerHTML = "Syntax";
				percent.innerHTML = "0";
				break;
				
			case "2":
				course.innerHTML = "Actions";
				percent.innerHTML = "10";
				break;
					
			case "3":
				course.innerHTML = "Strings";
				percent.innerHTML = "20";
				break;
					
			case "4":
				course.innerHTML = "While-loops";
				percent.innerHTML = "30";
				break;
					
			case "5":
				course.innerHTML = "For-loops";
				percent.innerHTML = "40";
				break;
					
			case "6":
				course.innerHTML = "Variables";
				percent.innerHTML = "50";
				break;
					
			case "7":
				course.innerHTML = "If-statements";
				percent.innerHTML = "60";
				break;
					
			case "8":
				course.innerHTML = "Coördinates";
				percent.innerHTML = "70";
				break;
					
			case "9":
				course.innerHTML = "Attributes";
				percent.innerHTML = "80";
				break;
					
			case "10":
				course.innerHTML = "Functions";
				percent.innerHTML = "90";
				break;
					
			case "done":
				welcome.innerHTML = "Well done, " + name.innerHTML + "!";
				begin.innerHTML = "You have finished all courses!";
				course.innerHTML = "Feel free to go back to a course anytime. The lesson supplements and course guides might be interesting for you!";
				percent.innerHTML = "100";
				break;
			
			default:
				begin.innerHTML = "This is the Teacher Platform! Here you can find the answer to all your questions regarding CodeCombat lessons!";
				cont.innerHTML = "Continue";
				break;			
		}
	},
	
	checkName : function (answer, currentPage) {
		var firstQuote = answer.indexOf("\'");
		var lastQuote = answer.indexOf("\'", firstQuote + 1);
		var equals = answer.indexOf("=");
		var semicolon = answer.indexOf(";");
		var equalsSecond = answer.indexOf("=", semicolon);
		var semicolonSecond = answer.indexOf(";", equalsSecond);
		
		var mustInclude;

		if (currentPage == 4) {
			mustInclude = "i.say(\'Iam\'+myName+\'andIam\'+age+\'yearsold.\');";
		} else if (currentPage == 7) {
			mustInclude = "if(myName==\'John\'){i.say(\'IamJohn!\');}else{i.say(\'IamnotJohn!\');}";
		}
		
		if (answer.substring(0, equals) !== "varmyName") {
			return false;
		}
		
		if (currentPage == 4 && answer.substring(semicolon + 1, equalsSecond) !== "varage") {
			return false;
		}
		
		if (lastQuote - firstQuote > 1 && semicolonSecond - equalsSecond > 1 && answer.indexOf(mustInclude) !== -1 && currentPage == 4) {
			if (answer.indexOf(mustInclude) - semicolonSecond > 1) {
				return false;
			} else if (answer.substr(answer.indexOf(mustInclude) + mustInclude.length).length > 0) {
				return false;
			} else {
				return true;
			}
		} else if (lastQuote - firstQuote > 1 && answer.indexOf(mustInclude) !== -1 && currentPage == 7) {
			if (answer.indexOf(mustInclude) - semicolon > 1) {
				return false;
			} else if (answer.substr(answer.indexOf(mustInclude) + mustInclude.length).length > 0) {
				return false;
			} else {
				return true;
			}
		} else {
			return false;
		}
	}
};

window.onload = function(){	
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var pageNumber;
	
	if (page.length == 14) {
		pageNumber = page.slice(8,9);
	} else if (page.length == 15) {
		pageNumber = page.slice(8,10);
	}
	
	var complete = document.getElementById('popupComplete');
	var wrong = document.getElementById('popupWrong');
	var spanComplete = document.getElementsByClassName("close")[0];
	var spanWrong = document.getElementsByClassName("close")[1];

	window.onclick = function(event) {
		if (event.target == complete || event.target == wrong) {
			complete.style.display = "none";
			wrong.style.display = "none";
		}
	}
	
	document.addEventListener('keyup', function(e) {
			complete.style.display = "none";
			wrong.style.display = "none";
	});
	
	cookieObject.checkInputCookie(pageNumber);
	
	if (page != "done.html") {		
		spanComplete.onclick = function() {
			complete.style.display = "none";
		}
		
		spanWrong.onclick = function() {
			wrong.style.display = "none";
		}
		
		editor.focus();
		editor.navigateFileEnd();
	}
	
};

window.onbeforeunload = function (e) {
	var path = window.location.pathname;
	var page = path.split("/").pop();
	var pageNumber;
	
	if (page.length == 14) {
		pageNumber = page.slice(8,9);
	} else if (page.length == 15) {
		pageNumber = page.slice(8,10);
	}
	
	cookieObject.setInputCookie("input", pageNumber, 30);
};