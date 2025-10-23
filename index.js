// index.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const { initializeDatabase } = require("./db/db.connect");
const Detail = require("./models/eventDetails.model");
const Event = require("./models/eventListing.models");

const app = express();

// ✅ Proper CORS setup
app.use(
  cors({
   origin: "*",
 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
initializeDatabase();

// ✅ Safely read JSON files (for local testing only)
let eventsData = [];
let detailsData = [];

try {
  const eventsPath = path.join(__dirname, "events.json");
  const detailsPath = path.join(__dirname, "details.json");

  if (fs.existsSync(eventsPath) && fs.existsSync(detailsPath)) {
    const jsonData = fs.readFileSync(eventsPath, "utf-8");
    const jsonDetailData = fs.readFileSync(detailsPath, "utf-8");
    eventsData = JSON.parse(jsonData);
    detailsData = JSON.parse(jsonDetailData);
  } else {
    console.warn("⚠️ JSON files not found — skipping seed step");
  }
} catch (error) {
  console.error("Error reading JSON files:", error);
}

// ✅ Read all meetups
async function readAllMeetups() {
  try {
    const allMeetups = await Event.find();
    return allMeetups;
  } catch (error) {
    console.log("Error finding Meetups:", error);
  }
}

// ✅ Route: Get all meetups
app.get("/meetups", async (req, res) => {
  try {
    const meetups = await readAllMeetups();
    if (meetups && meetups.length !== 0) {
      res.json(meetups);
    } else {
      res.status(404).json({ error: "No meetups found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching meetups" });
  }
});

// ✅ Route: Get event details by title
app.get("/meetups/:title", async (req, res) => {
  try {
    const eventTitle = req.params.title;
    const detail = await Detail.findOne({ title: eventTitle });
    if (!detail) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json(detail);
  } catch (error) {
    console.error("Error fetching event details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update meetup
async function updateMeetup(meetupId, dataToUpdate) {
  try {
    const updatedMeetup = await Event.findByIdAndUpdate(meetupId, dataToUpdate, { new: true });
    return updatedMeetup;
  } catch (error) {
    console.log("Error updating meetup:", error);
  }
}

app.post("/meetups/:meetupId", async (req, res) => {
  try {
    const updatedMeetup = await updateMeetup(req.params.meetupId, req.body);
    if (updatedMeetup) {
      res.status(200).json({ message: "Update successful" });
    } else {
      res.status(404).json({ error: "Meetup not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update meetup" });
  }
});
// ✅ Update event details by title
// ✅ Update event details by title
app.post("/meetups/details/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const dataToUpdate = req.body;

    const updatedDetail = await Detail.findOneAndUpdate(
      { title },
      dataToUpdate,
      { new: true }
    );

    if (updatedDetail) {
      res.status(200).json({
        message: "Details updated successfully",
        updatedDetail,
      });
    } else {
      res.status(404).json({ error: "Event details not found" });
    }
  } catch (error) {
    console.error("Error updating details:", error);
    res.status(500).json({ error: "Failed to update details" });
  }
});


module.exports = app;
