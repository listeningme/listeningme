
//桃園
function yqlparseTAO(req,res,next){
	// var query = models.Taoyqlparse.find({});
	// 	 query.exec(function(error, results){
	//        if(results != ''){
	//        		for(var tt in results){
	//        			//console.log(results[tt].title)
	//     			(new models.Lawdetails({
	// 					title:results[tt].title,
	// 					content:results[tt].content,
	// 					location:results[tt].location,
	// 					unit:results[tt].unit,
	// 					url:results[tt].url,
	// 				})).save(utils.checkError(next, function () {
	// 					res.end('success');
	// 					console.log('done!');
	// 				}));
	//        		}
	//        		//res.send(results)
	//        }
	//     });
	console.log(req.body.url);
	new YQL.exec('select * from data.html.cssselect where url="'+req.body.url+'" and css=".mainform"', function(response) {
	  	console.log(response.query.results.results.div[2].table[0].tr[3].td[1].p)
		var _c =''
		for (var k in response.query.results.results.div[2].table[0].tr[3].td[1].p ){
			if(response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong){
				if(!response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong.content){
					_c += '\n##'+response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong;
				}else{
					_c += '\n##'+response.query.results.results.div[2].table[0].tr[3].td[1].p[k].strong.content;
				}
			}
			_c += '\n'+response.query.results.results.div[2].table[0].tr[3].td[1].p[k].content;
		}
		req.body.url = req.body.url.replace("http://","");
		(new models.Taoyqlparse({
			title : req.body.title,
			content : _c,
			location : req.body.location,
			unit : req.body.unit,
			url:req.body.url
		})).save(utils.checkError(next, function () {
			res.end('success');
		}));
	});
}