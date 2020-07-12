
let calculator = {
	display: document.getElementById("number"),
	operationToBePerformed: false,
	xnum: "",//number to be operated on (prior to operation)
	operation: "",//operation to be applied to xnum
	firstNumber :true,//changes initial 0 if first time calculating

	reset: function(){//reset screen values back to original config
		//this.operationToBePerformed = false
		this.operationToBePerformed = false
		this.xnum = ""
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
		calculator.xnum = `${answer}`
		console.log(answer + " ANSWER")
	}
}


document.addEventListener("click",(e)=>{//listens for a button press
	//console.log(e.target.id)//debug

	let click = e.target.id
	let value = e.target.innerHTML

	switch(click){
		case "num":

			if(calculator.firstNumber){//checks for removal of starter 0
				calculator.wipeScreen()
				calculator.firstNumber = false
			}
			if(calculator.operationToBePerformed){
				calculator.wipeScreen()
			}
			calculator.display.innerHTML += e.target.innerHTML

			//console.log(calculator.display.innerHTML.length)

		break

		case "function":
			if(value == "AC"){
				console.log("AC Chosen")//debug
				calculator.display.innerHTML = "0"
				calculator.firstNumber = true
				calculator.reset()
			}
			else if(value == "+/-"){
				console.log("+/- chosen")//debug
			}
			else if(value == "%"){
				console.log("% chosen")//debug
			}

		break

		case "operations":
			calculator.xnum = calculator.display.innerHTML//set xnum

			//screen.operationToBePerformed = true

			calculator.operationToBePerformed = true

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
			else if(value == "="){
				//console.log("= chosen")//debug
				//console.log("TEST " + calculator.display.innerHTML)
				console.log(calculator)
				calculator.evaluate(calculator.xnum,calculator.operation,calculator.display.innerHTML)
			}

		break
	}
})