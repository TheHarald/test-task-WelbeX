const application = require("./express/app");
const database = require("./db/db");
const PORT = 3001;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		database.query("SELECT 1");
		console.log(`Database connection OK!`);
	} catch (err) {
		console.error(`Error connecting to database:`, err);
		process.exit(1);
	}
}




async function init() {
	await assertDatabaseConnectionOk();

	application.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as http://localhost:${PORT}/api/items/ `);
	});
}

init()