/***
 * Procedimientos Api Rest 
 */
var pubnub = require('pubnub');
/***
 * Metodo para obtener listas
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con datos de la consulta
 */
function getList(request, response) { 
    var data = [];
    for (i = 0; i <= 50; i++) {
      data.push(Math.floor(Math.random() * 500));
    }
     pubnub.init({
    publish_key: 'pub-c-24150dba-a538-4de7-af26-643500dd957d',
    subscribe_key: 'sub-c-af6ff0d2-6a8d-11e7-9bf2-0619f8945a4f'
  });

  var channel = 'conect-arduino';

  pubnub.subscribe({
    channel: channel,
    callback: setLedColor,
    connect: initLedColor,
    error: function(err) {console.log(err);}
  });

  function setLedColor(m) {
    console.log(m);
    console.log( 'color change to...' );
   
  }

  function initLedColor() {
    pubnub.history({
      channel: channel,
      count: 1,
      callback: function(messages) {
        messages[0].forEach(function(m) {
          setLedColor(m);
        });
      }
    });
  }
    
    
    
    response.json(data); // return all todos in JSON format 
};

/***
 * Metodo para obtener el elemento dado un id
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con datos de la consulta
 */
function get(request, response) {    
    var data = [];
    for (i = 0; i <= 50; i++) {
      data.push(Math.floor(Math.random() * 500))
    }
    response.json(data[request.params.id]); // return elemento
};

/***
 * Metodo para insertar item
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con los datos de la consulta
 */
function insert(request, response) { 
    console.log(request.body);
    var data = [];
    response.json(request.body); 
};

/***
 * Metodo para actualizar segun id
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con los datos de la consulta
 */
function update(request, response) {
    console.log(request.body.id);
    var data = [];
    response.json(data); // return all todos in JSON format 
};

/***
 * Metodo para eliminar  proyecto dado un id
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con datos de la consulta
 */
function eliminar(request, response) {
    console.log(request.params.id);
    var data = [];
    response.json(data); // return all todos in JSON format 
};


module.exports = function(app) {

	// api ---------------------------------------------------------------------     
        app.get('/getList', getList);
        app.get('/get/:id', get);
        app.post('/insert', insert);
        app.put('/update', update);
        app.delete('/delete/:id', eliminar); 
        // end api -----------------------------------------------------------------

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
                // carga un solo archivo de vista ( angular manejara los cambios en el front-end)
		res.sendFile('./public/index.html',  { root: __dirname }); 
        });
};
