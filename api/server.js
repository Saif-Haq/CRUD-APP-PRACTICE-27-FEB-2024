const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3006;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

const connectionString =
  "mongodb+srv://saif_haq_:y*.4ThrFPwSU!g4@hallpass.qowk5zq.mongodb.net/?retryWrites=true&w=majority&appName=hallpass";

const client = new MongoClient(connectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    app.get("/", (req, res) => {
      res.sendFile(__dirname + "/index.html");
    });

    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");

    const teaCollection = db.collection("tea");

    app.post("/submitTea", async (req, res) => {
      try {
        console.log(req.body, ">>>>>>>>");
        const result = await teaCollection.insertOne(req.body);
        console.log(result);
        res.json(result); //.ops);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.post("/quotes", async (req, res) => {
      try {
        const result = await quotesCollection.insertOne(req.body);
        console.log(result);
        res.json(result.ops); // Send the inserted document back as a response
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });

    app.get("/q", async (req, res) => {
      try {
        const results = await quotesCollection.find().toArray();
        console.log(results);
        res.json(results);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    });
  } finally {
    // Ensure that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);
