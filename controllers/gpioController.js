const Gpio = require('pigpio').Gpio;
const pinTransformer = require("./pinTransformer").transformer;

exports.gpio = function (req, res){
    res.send('Testing Routes Gpio'); 
};

exports.gpioWrite = function (req, res){
	const port = new Gpio(req.params.port, {mode:Gpio.OUTPUT});
	port.digitalWrite(req.params.state);
	res.end('The state of the GPIO ' + req.params.port +' is : '+req.params.state);
};

exports.gpioRead = function (req, res) {
	const port = new Gpio(req.params.port);
	res.end('The state of the GPIO ' + req.params.port + ' is : ' +  port.digitalRead());
}

exports.gpioPost = function( req, res ) {
	let gpios = req.body; 
	for (let gpioNo = Gpio.MIN_GPIO; gpioNo <= Gpio.MAX_GPIO; gpioNo += 1) {
		let gpio = new Gpio(gpioNo);

		if(gpio.getMode() === Gpio.OUTPUT){
			gpio.digitalWrite(0);
		}
	  }

	for(let i = 0; i<gpios.length ; i++){
		let pin = new Gpio( pinTransformer(parseInt(gpios[i])), {mode:Gpio.OUTPUT}); 
		pin.digitalWrite(1); 
	}
        res.send("GPIO Request has been treated");
}
