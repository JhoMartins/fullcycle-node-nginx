const mysql = require('mysql2');
const express = require('express')

const app = express()
const port = 3000

const connection = mysql.createConnection({
	host: 'db',
	user: 'root',
	database: 'nodedb'
});


const fetchName = async () => {
	const response = await fetch('https://randomuser.me/api/');
	const data = await response.json();

	if(data.results.length) {
		person = data.results[0];
		return `${person.name.first} ${person.name.last}`;
	} else {
		return 'Jhonatan Martins';
	}
} 

const insertPeople = async (callback) => {
	try {
		const sql = `INSERT INTO people(name) VALUES(?)`
		const values = [await fetchName()];

		return connection.execute(sql, values, callback);
	} catch (err) {
		console.log(err);
		throw err
	}
}

const selectPeople = (callback) => {
	try {
		const sql = 'SELECT * FROM people';

		return connection.execute(sql, callback);
	} catch (err) {
		console.log(err);
	}
}

app.get('/', async (req, res) => {
	await insertPeople((err, result) => {
		if (err) {
			return res.status(500).send('Internal Server Error');
		}

		selectPeople((err, results) => {
			if (err) {
				return res.status(500).send('Internal Server Error');
			}
	
			let table = '<table><tr><th>ID</th><th>Name</th></tr>';
	
			results.forEach(row => {
				table += `<tr><td>${row.id}</td><td>${row.name}</td></tr>`;
			});
	
			table += '</table>';
	
			res.send('<h1>Lista de usuários:</h1>' + table);   
		});	
	});
})  

app.listen(port, () => {
	console.log('Rodando na porta ' + port)
})