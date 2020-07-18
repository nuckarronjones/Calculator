let calculator = {
	display: document.getElementById("number"),
	operationToBePerformed: "no",
	xnum: "0",//number to be operated on (prior to operation)
	operation: "",//operation to be applied to xnum
	firstNumber :true,//changes initial 0 if first time calculating

	reset: function(){//reset screen values back to original config
		//this.operationToBePerformed = false
		this.operationToBePerformed = "no"
		this.xnum = "0"
		this.operation = ""
		this.firstNumber = true
	},
	wipeScreen: function(){
		calculator.display.innerHTML = ""
	},
	evaluate: function(x,operation,y){
		let answer = eval(x + operation + y)
		console.log(x + " : X")
		console.log(operation + " : operation")
		console.log(y+ " : Y")
		calculator.display.innerHTML = `${answer}`
		calculator.xnum = `${answer}`//the start is now the end result. Can be operated on
		console.log(answer + " ANSWER")
	}
}

alert(calculator.display.innerHTML.length)

function formatNegative(value){
	if(value.indexOf('-') == -1){//value is not a negative

		calculator.display.innerHTML = `-${value}`
	}
	else{//value is a negative
		
		calculator.display.innerHTML = `${value}`.substring(1)//the value being fed back has a negative. substring removed first '-'
	}
}

function buttonAnimate(e,classVals){
	if(classVals.contains("num")){
		
		e.target.style.animationName = "greyBttn"

	}else if(classVals.contains("function")){
		
		e.target.style.animationName = "lightGreyBttn"

	}else if(classVals.contains("equals") || classVals.contains("operations")){
			try{//find id=active, and remove all styles previously applied. If no previous id with "active" status exists, then catch the error and do nothing
				//only one button must be active and animation played at one time
				document.getElementById("active").removeAttribute("style")
				document.getElementById("active").id = ""
			}catch(e){}

			e.target.id = "active"
			e.target.style.animationFillMode = "forwards"
	 	 	e.target.style.animationName = "orangeBttn"
	 	 	e.target.style.color = "#FF9500"

	}

	if(classVals.contains("greyBttn") || classVals.contains("lightGreyBttn")){//only reset non operations/equal button animations
		
		setTimeout(()=>{//clear animation styles so button can be pressed again with animation
			e.target.style.animationName = ""
		},1201)//additional second to let animation finish out
	}
}


document.addEventListener("click",(e)=>{//listens for a button press. Only those with certian classes will execute animations/functionality
	let value = e.target.innerHTML
	let classVals = e.target.classList

	buttonAnimate(e,classVals)

	if(classVals.contains("num")){

		console.log("number yes")

		if(calculator.firstNumber){//checks for removal of starter 0, when someone first opens webapp/reloads. Changes initial 0 value
			calculator.wipeScreen()
			calculator.firstNumber = false
		}
		if(calculator.operationToBePerformed == "yes"){
			console.log("operation to be performed")
			calculator.wipeScreen()
		}

		calculator.display.innerHTML += e.target.innerHTML

	}

	else if(classVals.contains("function")){

		console.log("functions yes")

		if(value == "AC"){
			console.log("AC Chosen")//debug
			calculator.display.innerHTML = "0"
			calculator.firstNumber = true
			calculator.reset()

			try{//if an id of active exists, remove it as AC resets the calculator
				document.getElementById("active").removeAttribute("style")
				document.getElementById("active").id = ""
			}catch(e){}
		}
		else if(value == "+/-"){
			console.log("+/- chosen")//debug
			formatNegative(calculator.display.innerHTML)
			//calculator.display.innerHTML += "-"
		}
		else if(value == "%"){
			console.log("% chosen")//debug
		}
	}

	else if(classVals.contains("operations")){

		console.log("operations yes")

		calculator.operationToBePerformed = "yes"
			
		calculator.xnum = calculator.display.innerHTML

		if(value == "÷"){
			//console.log("percent Chosen")//debug
			calculator.operation = "/"
		}
		else if(value == "×"){
			//console.log("times chosen")//debug
			calculator.operation = "*"
		}
		else if(value == "-"){
			//console.log("- chosen")//debug
			calculator.operation = "-"
		}
		else if(value == "+"){
			//console.log("+ Chosen")//debug
			calculator.operation = "+"
		}
	}

	else if(classVals.contains("equals")){

		console.log("equals yes")

		console.log(calculator)

		//calculator.operationToBePerformed = "completed"
		calculator.evaluate(calculator.xnum,calculator.operation,calculator.display.innerHTML)
	}
})