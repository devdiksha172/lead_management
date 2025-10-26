require("dotenv").config();
const app = require("./app"); // import configured app

app.listen(process.env.PORT, process.env.HOSTNAME, () => {
	console.log(`App running on port: ${process.env.PORT}`);
});
