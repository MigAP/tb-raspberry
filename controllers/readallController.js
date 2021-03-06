const {spawn} = require('child_process'); 
const pinTransformer = require("./pinTransformer").transformer;
const Gpio = require('pigpio').Gpio; 

// Read all using the shell function 
exports.readall = function (req, res) {
	const gpioReadAll = spawn('gpio', ['readall']); // call in the Rpi's shell : gpio read all 
	gpioReadAll.stdout.pipe(res); // use stream's pipe function to create the server response
};

// Reall All using the pigpio module 

exports.readAllGpio = function(req, res){
	const gpioValues = []; 
	for (let gpioNo = Gpio.MIN_GPIO; gpioNo <=28 ; gpioNo += 1) {

		const gpio = new Gpio(gpioNo); // Declaring the gpio this way doesn't affect the GPIO mode, the gpio is not chaged

		gpioValues.push({
			gpioNumber:gpioNo, 
			gpioMode:gpio.getMode(), 
			gpioValue:gpio.digitalRead()
		});
	  }
          
	res.json(gpioValues); 
};
