#!/usr/bin/env node

const converter = require('json-2-csv');
const yargs = require("yargs");
const axios = require("axios");
const fs = require('fs');

const options = yargs
	.usage("Usage: -u <url>")
	.option("u", {
		alias: "url",
		describe: "URL Endpoint",
		type: "string"
	})
	.option("k", {
		alias: "key",
		describe: "The key used to extract data from JSON response",
		type: "string"
	})
	.option("o", {
		alias: "output",
		describe: "Output path to drop the CSV file (defaults to current directory - Im not being lazy)",
		type: "string"
	})
	.option("f", {
		alias: "filename",
		describe: "CSV file name (No .ext. Defaults to csvFromJson.csv)",
		type: "string"
	})
	.argv;

const url = options.u;
const fileName = (options.f) ? `${options.f}.csv` : 'csvFromJson.csv';
const output = (options.o) ? options.o : './';
axios.get(url, {headers: {Accept: "application/json"}})
.then(res => {
	if (options.k) {
		const { k: key } = options;

		try {
			parseResponse(res[key], {fileName, output});
		} catch (e) {
			console.error(e);
		}
	}
})
.catch(e => {
	console.error(e);
});

// Local Functions
const parseResponse = (data, {fileName, output}) => {
	converter.json2csv(data, (err, csv) => {
		if (err) throw err;

		fs.writeFileSync(`${output}/${fileName}`,csv);
	});
}

