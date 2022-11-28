const express = require("express");

const PORT = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors({ credentials: true, origin: true }));
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const spaceController = require("./controllers/space");

app.use("/", spaceController);


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
