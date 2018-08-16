const Gpio = require('pigpio').Gpio; 

let App;
let log;

/**
 * Helps you : 
 * - Configure several inputs and outputs 
 * - Digital Read and Write 
 */
class Rpi {

    /**
     * 
     * @param {Object} options                  allows to create several input and output pins 
     * @param {Object} options.nb               object with the number of inputs and outputs 
     * @param {Integer} options.nb.in           number of inputs 
     * @param {Integer} options.nb.out          number of outputs 
     * @param {Array} options.outputs           array with the number of the differents outputs pins 
     * @param {Array} options.inputs            array with the numbers of the different inputs pins 
     */

    constructor(options){

        this.outputs = [];
        this.inputs = [];

        // Outputs configuration
        for (let i = 0; i< options.nb.out ; i++){
            this.outputs[i] = new Gpio(options.outputs[i], {mode:Gpio.OUTPUT});
        }

        // Inputs configuration
        for (let i = 0; i< options.nb.in ; i++){
            this.inputs[i] = new Gpio(options.inputs[i], {mode:Gpio.INPUT});
        }
    }
    
    /**
     * 
     * @param {integer} pin     Pin number where we want to do the digitalRead 
     * @return                  returns a promise with the result value 
     */
    read(pin){

        return new Promise( (resolve, reject) => {

            const gpio = new Gpio(pin)

            resolve(gpio.digitalRead()); 
        });
    }

    /**
     * 
     * @param {Integer} pin   Pin number where we want write 
     * @param {Integer} value 0 or 1 
     */
    write(pin, value){
        this.outputs[pin].digitalWrite(value); 
    }

    /**
     * 
     * @param {*} app 
     */
    static setup(app){
        return new Promise((resolve, reject) => {
            App = app; 
            log = App.log.child({module:'raspberry'});

            log.debug("Iniciando Modulo raspberry"); 

            require("./routes")(app);
            resolve(); 
        });
    }
    /*
    static init(){
    }
    */

}

/*
// Need-it ? 
function loadConfigOptions(){
    return nex Promise((resolve, reject) => {

    });
}
*/

module.exports = Rpi; 