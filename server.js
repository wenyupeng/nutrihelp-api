const app = require("./app");
const { exec } = require("child_process");
const cors = require("cors");
const routes = require('./routes');

const port = process.env.PORT || 80;

// CORS
app.options("*", cors({ origin: "http://localhost:3000" }));
app.use(cors({ origin: "http://localhost:3000" }));

// routes
app.use('/api',routes);

// error handler
const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler.clientError);
app.use(errorHandler.serverError);

// JSON & URL parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// Start server
app.listen(port, async () => {
	console.log(`Server is running on port ${port}`);
	exec(`start http://localhost:${port}/api-docs`);
});