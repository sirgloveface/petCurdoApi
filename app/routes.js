var promise = require('bluebird');
var PubNub = require('pubnub');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = process.env.ELEPHANTSQL_URL || 'postgres://postgres:curdo@localhost:5432/apicurdo';
var connectionString = process.env.ELEPHANTSQL_URL || "postgres://mattveso:EoQSBnjPQRmONUw1H4sXK3lQD-YJQKpB@pellefant.db.elephantsql.com:5432/mattveso";
var db = pgp(connectionString);

var pubnub = new PubNub({
    publishKey: 'pub-c-24150dba-a538-4de7-af26-643500dd957d',
    subscribeKey: 'sub-c-af6ff0d2-6a8d-11e7-9bf2-0619f8945a4f',
    uuid: "node-client",
    ssl: true
});

function publishSampleMessage() {
    var publishConfig = {
        channel: "conect-arduino",
        message: {
            "id": 3,
            "content": "contenido nodejs",
            "uuid": "node-client",
            "sender_uuid": "node-client",
            "date": new Date()
        },
        user: "node-client",
        sendByPost: false // true to send via post
    };

     pubnub.publish(publishConfig, function(status, response) {
            console.log(status, response);
        },function(status, response) {
            console.log(status, response);
        });
    
}

pubnub.addListener({
    status: function (statusEvent) {
        console.log(statusEvent);
        if (statusEvent.category === "PNConnectedCategory") {
            publishSampleMessage();
        }   
    },
    message: function (message) {
        console.log("New Message!!", message.message);
    },
    presence: function (presenceEvent) {
        console.log("presenceEvent");
        console.log(presenceEvent.action); // online status events
        console.log(presenceEvent.timestamp); // timestamp on the event is occurred
        console.log(presenceEvent.uuid); // uuid of the user
        console.log(presenceEvent.occupancy); // current number of users online
        // handle presence
    }
});
console.log("Subscribing.");
pubnub.subscribe({
    channels: ['conect-arduino'],
    withPresence: true
});



/*
pubnub.unsubscribe({
    channels: ['conect-arduino']
});*/

/***
 * Metodo para obtener listas
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con datos de la consulta
 */
function getList(request, response) {
    db.any('select * from log')
    .then(function (data) {
      publishSampleMessage();
      // response.json(data); // return all todos in JSON format
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retorno datos de la tabla log'
        });
    })
    .catch(function (err) {
        return next(err);
    }); 
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
}
;

/***
 * Metodo para insertar item
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con los datos de la consulta
 */
function insert(request, response) {
     db.oneOrNone("INSERT INTO log(identifier, fecha, json) VALUES ( $1, now(), $2)",[request.body.sender_uuid, JSON.stringify(request.body)])
     .then(function (data) {
      response.status(200)
        .json({
          status: 'success',
          message: 'Inserted log'
        });
    })
    .catch(function (err) {
         console.log(err);
         console.log("query failed!");
         return;
    }); 
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
}
;

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
}
;



/***
 * Metodo para obtener data de
 * @param {type} request
 * @param {type} response
 * @returns {json} Objeto json con datos de la consulta
 */
function getData(request, response) {
    var data = [];
    for (i = 0; i <= 50; i++) {
        data.push(Math.floor(Math.random() * 500))
    }
    response.json(data[request.params.id]); // return elemento
}
;



module.exports = function (app) {

    // api ---------------------------------------------------------------------     
    app.get('/getList', getList);
    app.get('/get/:id', get);
    app.post('/insert', insert);
    app.put('/update', update);
    app.delete('/delete/:id', eliminar);
    // end api -----------------------------------------------------------------

    // api pubnub --------------------------------------------------------------  
    app.get('/getData/', getData);
    // end api -----------------------------------------------------------------

    // application -------------------------------------------------------------
    app.get('/', function (req, res) {
        // carga un solo archivo de vista ( angular manejara los cambios en el front-end)
        res.sendFile('./public/index.html', {root: __dirname});
    });
};
