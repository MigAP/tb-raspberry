const Gpio = require('pigpio').Gpio

exports.gpio = function (req, res){
    res.send('Testing Routes Gpio'); 
};

exports.gpioWrite = function (req, res){
	const port = new Gpio(req.params.port, {mode:Gpio.OUTPUT});
	port.digitalWrite(req.params.state);
	res.end('The state of th GPIO ' + req.params.port +' is : '+req.params.state);
};

exports.gpioRead = function (req, res) {
	const port = new Gpio(req.params.port);
	res.end('The state of th GPIO ' + req.params.port + ' is : ' +  port.digitalRead());
}
