'use strict';

const fs = require("fs");
const path = require('path');
const cmd= require('node-cmd');
const PdfReader = require('pdfreader').PdfReader;

module.exports = {
	handler: function pdfReader(req, res) {
		let file = req.files[0];

		fs.readFile(file.path, (err, pdfBuffer) => {
			new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
				if (item.text && item.text.length >= 6) {
					if (item.text.substring(0, 6) == "start:" && item.text.substr(-4) == ":end") {
						console.log(item.text);
						console.log("sending: " + item.text.slice(6, -4))
						res.send(JSON.parse(item.text.slice(6, -4)));
					}
				}
			});
		});
	}
}
