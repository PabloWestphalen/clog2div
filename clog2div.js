class ConsoleLogToDiv {
	constructor() {
		if (document.readyState === "complete" || document.readyState === "loaded") {
     		this.init();
		} else {
			document.addEventListener("DOMContentLoaded", () => { this.init(); });
		}
	}

	init() {
		this._privateLog = console.log;
		this.write = this.write.bind(this);
		this.overwriteDefaultConsoleLog = this.overwriteDefaultConsoleLog.bind(this);
		this.initializeStyles();
		this.createDiv();
		this.overwriteDefaultConsoleLog();
	}

	initializeStyles() {
		let styles = `
			#clog2div {
				box-sizing: border-box;
				width: 400px;
				height: 300px;
				border: 1px solid black;
				padding: 0 1rem 1rem 1rem;
				overflow-y: scroll;
				font-family: monospace;
			}

			#clog2div span {
				display: inline-block;
				margin-right: 1rem;
			}
		`;

		let styleElement = document.createElement("style");
		styleElement.innerHTML = styles;
		document.body.prepend(styleElement);

	}

	overwriteDefaultConsoleLog() {
		let me = this;
		console.log = function (message) {
			me.write(arguments);
			me._privateLog.apply(console, arguments);
		}
	}

	createDiv() {
		this.div = document.createElement("div"); 
		this.div.id = "clog2div";
		this.div.style = this.divStyle;
		document.body.appendChild(this.div);
	}

	write(args) {
		let messageElement = document.createElement("p");

		for(let arg of args) {
			let messageArg = document.createElement("span");
			messageArg.textContent = arg;
			messageElement.appendChild(messageArg);
		}

		this.div.appendChild(messageElement);
	}
}