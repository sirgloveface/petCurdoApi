/***
 * Procedimientos Api Rest 
 */

/***
 * Metodo para obtener listas
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con datos de la consulta
 */
function getList(request, response) { 
    var data = [];
    for (i = 0; i <= 50; i++) {
      data.push(Math.floor(Math.random() * 500))
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
