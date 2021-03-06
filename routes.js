let router = new require('express').Router(); 

// Require Controllers
const gpio_controller = require('./controllers/gpioController'); 
const pwm_controller = require('./controllers/pwmController'); 
const readall_controller = require('./controllers/readallController'); 


function setupRoutes(App){

    log = App.log.child({module:'raspberry'});
    log.debug("Iniciando las rutas del modulo tb-raspberryBLABLA"); 

    router.use(function (req, res, next){

        req._ctx['service'] = "raspberry"; 
        req._ctx['ressource'] = req.query.service;
        next();

    });

    router.get("/test", (req, res, next) => {
        res.send("Testing routes "); 
    });

    /**
     * ReadAll Routes 
     */
    router.get("/", readall_controller.readAllGpio); 
    router.get('/readall', readall_controller.readall);

    /**
     * GPIO Read and Write routes 
     */
    router.get('/gpio', gpio_controller.gpio); 
    router.get('/gpio/write/:port/:state', gpio_controller.gpioWrite);
    router.get('/gpio/read/:port', gpio_controller.gpioRead);
    router.post('/gpio', gpio_controller.gpioPost);

    /**
     * PWM routes 
     */
    router.get('/pwm', (req, res) => {
        res.end('Software PWM are available on all pins.\n'+
            'Hardware PWM are available only on BCM pins 12, 13, 18, 19'+
            'Frequency muste be between 0 and 125 000 000');
    });
    
    router.post("/pwm/soft", pwm_controller.pwmSoftPost);
    router.post("/pwm/hard", pwm_controller.pwmHardPost); 
     
    router.get('/pwm/soft/:port/:dutyCycle', pwm_controller.pwmSoftware); 
    router.get('/pwm/hard/:port/:freq/:dutyCycle', pwm_controller.pwmHardware);

    // Allow cross domain post 
    App.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Acces-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next(); 
      });

     App.app.use(`${App.baseRoute}/srv/raspberry`, router);      // ?

}

module.exports = setupRoutes; 
