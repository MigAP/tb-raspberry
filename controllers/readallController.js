const {spawn} = require('child_process'); 

exports.readall = function (req, res) {
	const gpioReadAll = spawn('gpio', ['readall']); // call in the Rpi's shell : gpio read all 
	gpioReadAll.stdout.pipe(res); // use stream's pipe function to create the server response
};
