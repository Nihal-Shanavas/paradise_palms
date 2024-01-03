require("dotenv").config();

const express = require("express"); 
const cors = require("cors");
const routes = require("./Routes/routes");
require("./db/connection");

const siteServer = express();
siteServer.use(cors());
siteServer.use(express.json());

siteServer.use(routes);
siteServer.use('/uploads',express.static('./uploads'))


const PORT = 4001 || process.env.PORT;
siteServer.listen(PORT, () => {
  console.log(`_____Auction Server Started At Port Number ${PORT}____`);
});

siteServer.get("/", (req, res) => {
  res.send("<h1>Project Server Started.....</h1>");
});
