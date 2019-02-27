'use strict';

const fs = require("fs");
const path = require('path');
const cmd= require('node-cmd');
const PdfReader = require('pdfreader').PdfReader;

module.exports = {
	handler: function pdfReader(req, res) {
		let file = req.files[0];

		// TODO: need to add a promise that returns something to show that pdf did not contain hidden JSON
		let pdfData = "";

		fs.readFile(file.path, (err, pdfBuffer) => {
			new PdfReader().parseBuffer(pdfBuffer, function(err, item) {
				if (item.text) {
					pdfData += item.text;

					let startIndex = pdfData.indexOf('start:');
					let endIndex = pdfData.indexOf(':end');
					if (startIndex > 0 && endIndex > 0) {
						let pdfJSON = pdfData.slice(startIndex+6, endIndex);
						
						res.send(JSON.parse(pdfJSON));

						cmd.run('rm -rf ./tmp/*');
						return;
					}
				}
			});
		})
	}
}
