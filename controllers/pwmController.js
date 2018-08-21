const Gpio = require('pigpio').Gpio; 
const pinTransformer = require("./pinTransformer").transformer;

exports.pwmSoftware = (req, res) => {
    const pwm = new Gpio(req.params.port, {mode:Gpio.OUTPUT}); 
    pwm.pwmWrite(req.params.dutyCycle); 
    res.end('Software PWM is set in GPIO '+req.params.port+' with duty cycle value '+ req.params.dutyCycle); 
};

exports.pwmHardware = (req, res) => {
    const pwm = new Gpio(req.params.port, {mode:Gpio.OUTPUT}); 
    const dutyCycle = req.params.dutyCycle *10000;
    pwm.hardwarePwmWrite(req.params.freq, dutyCycle); 
    res.end('Hardware PWM is set in GPIO '+ req.params.port+ ' frequency : '+req.params.freq+ ' duty cycle ' + req.params.dutyCycle); 
};
    
exports.pwmSoftPost = (req,res)=>{

    let pwmCongif =  req.body; //JSON.parse(req.body);

    for(let i = 0; i<pwmCongif.length; i++){

        let pinNumber = pinTransformer( parseInt(pwmCongif[i].id));
        let dutyCycle = parseInt(pwmCongif[i].dutyCycle); 
        let pwm = new Gpio(pinNumber, {mode:Gpio.OUTPUT}); 
        pwm.pwmWrite(dutyCycle); 

    }
    res.send("PWM request has been treated"); 
}

exports.pwmHardPost = (req,res) => {
    
}