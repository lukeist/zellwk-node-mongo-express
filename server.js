const PORT = 3000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString =
  "mongodb+srv://louysa:1234Qwerasdf@cluster0.gibbk.mongodb.net/zellwk?retryWrites=true&w=majority";

const MongoClient = require("mongodb").MongoClient;
MongoClient.connect(connectionString, (err, client) => {
  if (err) return console.error(err);
  const db = client.db("zellwk");
  const quotesCollection = db.collection("quotes");
  app.set("view engine", "ejs");
  //   app.get("/", (req, res) => {
  //     res.sendFile(__dirname + "/index.html");
  //   });
  app.get("/", (req, res) => {
    db.collection("quotes")
      .find()
      .toArray()
      .then((result) => res.render("index.ejs", { quotes: result }))
      .catch((err) => console.error(err));
  });

  //////// METHOD 'POST' USING HTML FORM in INDEX.HTML
  app.post("/quotes", (req, res) => {
    quotesCollection
      .insertOne(req.body)
      .then((result) => {
        // console.log(result);
        res.redirect("/");
        // res.json("add succesfully");
      })
      .catch((err) => console.error(err));
    // console.log(`pst req.body ${JSON.stringify(req.body)}`);
  });

  //////// METHOD 'PUT' USING JS in PUBLIC/MAIN.JS
  app.put("/quotes", (req, res) => {
    quotesCollection
      .findOneAndUpdate(
        { name: "yoda" },
        {
          $set: {
            name: req.body.name,
            quote: req.body.quote,
          },
        },
        { upsert: true }
      )
      .then((result) => res.json("success"))
      .catch((err) => console.error(err));

    console.log(req.body);
  });

  //////// METHOD 'DELETE' USING JS in PUBLIC/MAIN.JS
  app.delete("/quotes", (req, res) => {
    quotesCollection
      .deleteOne({ name: req.body.name })
      .then((result) => {
        result.deletedCount === 0
          ? res.json("no quote to delete")
          : res.json("vaders quote deleted");
      })
      .catch((err) => console.error(err));
  });

  app.listen(process.env.PORT || PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });

  //   console.log(
  //     `connected to db ${db
  //       .collection("quotes")
  //       .find()
  //       .toArray()
  //       .then((result) => console.log(result))
  //       .catch((err) => console.error(err))}`
  //   );
});

// USING MONGOOSE
// const url = connectionString;
// mongoose.connect(url, { useNewUrlParser: true });
// const mongooseDB = mongoose.connection;
// mongooseDB.once("open", () => {
//   console.log("database connected", url);
// });
// mongooseDB.on("error", (err) => {
//   console.error(err);
// });
