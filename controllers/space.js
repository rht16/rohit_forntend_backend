const router = require("express").Router();
require("dotenv").config();
const isAuthenticatedUser = require("../middleware/auth");

router.post("/get-all-capsules", isAuthenticatedUser, async (req, res) => {
  try {
    const modifiedApi = process.env.API + `?limit=${9}&offset=${req.body.skip}`;
    console.log(modifiedApi)
    fetch(modifiedApi)
      .then((response) => response.json())
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (err) {
    console.log(err);
    return res.status(501).send({ msg: err.msg });
  }
});

router.get("/get-all-capsules-count", isAuthenticatedUser, async (req, res) => {
  console.log("runnig");
  try {
    fetch(process.env.API)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.length)
        let count =
          (data.length - 2)/ 9 === 0
            ? data.length
            : Math.floor((data.length - 2)/ 9) + 1;
        return res.status(200).send({ count });
      });
  } catch (error) {
    console.log(err);
    return res.status(501).send({ msg: err.msg });
  }
});

router.post("/get-filtered-capsules", isAuthenticatedUser, async (req, res) => {
  const { selectedStatus, skip, selectedType, selectedDate } = req.body;
  try {
    let modifiedApi = process.env.API + `?limit=${9}&offset=${3}`;
    if (selectedStatus && selectedType) {
        modifiedApi =
        process.env.API +
        `?status=${selectedStatus}&type=${selectedType}&original_launch=${selectedDate}`;
    } else if (selectedStatus) {
      modifiedApi =
        process.env.API +
        `?limit=${9}&offset=${3}&status=${selectedStatus}`;
    } else if (selectedType) {
      modifiedApi =
        process.env.API +
        `?limit=${9}&offset=${3}&type=${selectedType}`;
    } else if (selectedDate) {
      modifiedApi =
      process.env.API +
      `?original_launch=${selectedDate}`;
    }
  console.log(modifiedApi);
    fetch(modifiedApi)
      .then((response) => response.json())
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (err) {
    return res.status(501).send({ msg: err.msg });
  }
});

router.post("/get-next-capsules", isAuthenticatedUser, async (req, res) => {
  const { selectedStatus, skip, selectedType, selectedDate } = req.body;

  try {
    let modifiedApi = process.env.API + `?limit=${9}&offset=${req.body.skip}`;
    if (selectedStatus && selectedType) {
        modifiedApi =
        process.env.API +
        `?status=${selectedStatus}&type=${selectedType}&original_launch=${selectedDate}`;
    } else if (selectedStatus) {
      modifiedApi =
        process.env.API +
        `?limit=${10}&offset=${req.body.skip}&status=${selectedStatus}`;
    } else if (selectedType) {
      modifiedApi =
        process.env.API +
        `?limit=${10}&offset=${req.body.skip}&type=${selectedType}`;
    } else if (selectedDate) {
      modifiedApi =
      process.env.API +
      `?original_launch=${selectedDate}`;
    }
    console.log(modifiedApi);
    fetch(modifiedApi)
      .then((response) => response.json())
      .then((data) => {
        return res.status(200).send(data);
      });
  } catch (err) {
    return res.status(501).send({ msg: err.msg });
  }
});

module.exports = router;
