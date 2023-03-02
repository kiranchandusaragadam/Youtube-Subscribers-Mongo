const express = require("express");
const app = express();
const subscriberModel = require("./models/subscribers");
const { ObjectId } = require("mongodb");

// Your code goes here
app.get("/", (req, res) => {
  res.json(
    "Hello, This is Get Youtube Subscribers Capstone Project using MongoDB Node.js made by Kiranchandu Saragadam"
  );
});

// to get all subscribers
app.get("/subscribers", async (req, res) => {
  try {
    const allSubscribers = await subscriberModel.find();
    res.status(200).send(allSubscribers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// to get particular fields of all subscribers
app.get("/subscribers/names", async (req, res) => {
  try {
    const subscribers = await subscriberModel
      .find()
      .select("name subscribedChannel -_id");
    res.status(200).send(subscribers);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// to get individual subscriber by id
app.get("/subscribers/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const subscriber = await subscriberModel.findOne({
        _id: new ObjectId(req.params.id),
      });
      res.status(200).send(subscriber);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ error: "Invalid Id" });
  }
});

// to add subscriber details
app.post("/subscribers/add", async (req, res) => {
  const body = req.body;
  const newSubscriber = new subscriberModel(body);
  try {
    await newSubscriber.save();
    res.status(200).send(newSubscriber);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// to update document by id
app.patch("/subscribers/update/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    try {
      const updateSubscriber = await subscriberModel.findOne({
        _id: new ObjectId(req.params.id),
      });
      if (req.body.name) {
        updateSubscriber.name = req.body.name;
      }
      if (req.body.subscribedChannel) {
        updateSubscriber.subscribedChannel = req.body.subscribedChannel;
      }
      await updateSubscriber.save();
      res.status(200).send(updateSubscriber);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else {
    res.status(400).send({ error: "Invalid Id" });
  }
});

// to delete document by id
app.delete("/subscribers/delete/:id", async (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    const subscriber = await subscriberModel
      .deleteOne({
        _id: new ObjectId(req.params.id),
      })
      .then(() => {
        res.status(200).send(`Subscriber Removed successfully`);
      })
      .catch((error) => {
        res.status(500).send(`Error while deleting ${error}`);
      });
  } else {
    res.status(400).send({ error: "Invalid Id" });
  }
});

module.exports = app;
