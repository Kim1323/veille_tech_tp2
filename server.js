const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8081;

APP.listen(PORT, () => {
	console.log("APP commencé");
})

APP.get("/", (req,res) => {
	res.send("hello");
})