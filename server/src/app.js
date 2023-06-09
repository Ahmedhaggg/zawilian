let app = require("./index")

let { SERVER_PORT } = require("./config");

app.listen(SERVER_PORT, () => console.log("server is running"))
