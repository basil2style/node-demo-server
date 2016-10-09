var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', (process.env.PORT || 5000));

getCounter = 0 
postCounter = 0

values = []

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

//var port = process.env.POT || 8080;


var router = express.Router();


router.get('/sendGet',function(req,res) {
	//res.json({notes: "This is your notebook"})
	console.log("GET method invoked")
	++getCounter
	var temp
	temp = JSON.stringify(values)
	res.send(temp)

	console.log('Processed counter: GET count:'+getCounter+' POST count:'+postCounter)
});

router.post('/sendPost',function(req,res) {
	console.log("POST method invoked")
	if(req.body.id.length != 0 && req.body.product.length != 0 && req.body.price.length != 0 ) {
	var id = req.body.id;
	var product = req.body.product;
	var price = req.body.price;
    //temp = res.json {}
    values.push(req.body)
    console.log("Successfull")
	res.send(id+' '+product+' '+price);
   	
	}
	else {
		res.status(404)
		console.log("Unsuccessful")
	}
	//res.json ( 
	//	{“id”:id, “product”:product, “price”:price}
	//)
	++postCounter
	console.log('Processed counter: GET count '+getCounter+' POST count ' +postCounter)
})

router.delete('/sendDelete',function(req,res) {
	console.log("DELETE method invoked")
	values = []
	console.log('Records cleared Successfully')
	res.send("Cleared Successfully")
})


app.use('/',router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


