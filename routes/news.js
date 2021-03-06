var express = require("express");
var router = express.Router();
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("admin/index.sqlite3");

/* GET home page. */
router.get("/", function(req, res, next) {
	db.serialize(function() {
		db.all("SELECT *, (SELECT COUNT(url) FROM news) AS count FROM news LIMIT 50", function(err, rows){
			if (!err) {
				res.render("news", {
					title: "ニュース",
					news: rows,
					selected: "anb-home"
				});
			}else{
				next(err);
			}
		});
	});
});

module.exports = router;
