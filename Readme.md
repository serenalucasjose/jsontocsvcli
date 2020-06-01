# Installation

1. Clone this repository
2. Run `npm install` to get dependencies
3. Run `npm install g .` to install the CLI tool itself as a console command
4. Now you can use the CLK JsonToCsv tool!

## Usage

Run `jsontocsv` with the following args:
```
    -u (URL Endpoint)
    -k (The key used to extract data from JSON response)
    -o (Use double quotes. Output path to drop the CSV file (defaults to current directory - Im not being lazy))
    -f (CSV file name (No .ext. Defaults to csvFromJson.csv))
```

Example
`jsontocsv -f mi_file -k data -u "https://jsonplaceholder.typicode.com/todos/1"`