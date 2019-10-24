const path = require('path');
var bodyParser = require('body-parser');

module.exports = (app) => {

    const product   = require('../controllers/product.controller.js');
    

    
    /* ============== ROUTES WEB ============== */
    app.get('/', function(req, res){
        return res.render('index');
    });
    
    app.post('/saveLink', product.saveLink);

    app.get('/detail_product/:id', product.detail_product);

    app.get('/list_product', product.list_product);


     /* ============ DEFAULT ROUTE =========*/

	app.post('*', function(req, res){
		res.json({"error" : true, "error_code" : 404, "status" : "Page Not Found"});
	});

	app.get('*', function(req, res){
		res.json({"error" : true, "error_code" : 404, "status" : "Page Not Found"});
	});

	app.put('*', function(req, res){
		res.json({"error" : true, "error_code" : 404, "status" : "Page Not Found"});
	});

	app.delete('*', function(req, res){
		res.json({"error" : true, "error_code" : 404, "status" : "Page Not Found"});
	});

}