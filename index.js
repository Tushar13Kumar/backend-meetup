const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};


const express = require("express");
require("dotenv").config()
const app = express()
app.use(cors());



const {initializeDatabase} = require("./db/db.connect")
//const fs = require("fs")
const Detail = require("./models/eventDetails.model")
const Event = require("./models/eventListing.models")
app.use(express.json())
initializeDatabase();


// const jsonData = fs.readFileSync("events.json" , "utf-8")
// const jsonDetailData = fs.readFileSync("details.json" , "utf-8")
// const eventsData = JSON.parse(jsonData);
// const detailsData = JSON.parse(jsonDetailData)

// function seedData() {
//     try{
//         for(const eventData of eventsData){
//             const newEvent = new Event({
//                 title: eventData.title,
//                 dateTime: eventData.dateTime,
//                 eventType: eventData.eventType,
//                 thumbnail: eventData.thumbnail
//             })
//            newEvent.save();
//         }

//     } catch(error){
//       console.log("Error sending the Data" , error)
//     }
// }

//seedData()

// async function seedDetailData() {
//   try {
//     for (const detailData of detailsData) {
//       const newDetail = new Detail({
//         title: detailData.title,
//         host: detailData.host,
//         image: detailData.image,
//         details: detailData.details,
//         dressCode: detailData.dressCode,
//         ageRestrictions: detailData.ageRestrictions,
//         tags: detailData.tags,
//         duration: detailData.duration,
//         location: detailData.location,
//         price: detailData.price,
//         speakers: detailData.speakers
//       });

//       await newDetail.save(); // ensure each document is saved
//     }

//     console.log("All details have been seeded successfully!");
//   } catch (error) {
//     console.error("Error inserting details data:", error);
//   }
// }

// Run the seeder
//seedDetailData();

async function readAllMeetups() {
  try {
    const allMeetups = await Event.find()
    return (allMeetups)
  } catch (error) {
    console.log("not find Meetup")
  }
  
};

app.get("/meetups" , async (req, res) => {
  try {
    const meetups = await readAllMeetups()
    if(meetups.length != 0){
      res.json(meetups)
    }else{
      res.status(404).json({error: "not found meetup"})
    }
    
  } catch (error) {
    res.status(500).json({error: "not fetching error occur"})
  }
})

//  Get event details by title
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

async function updateMeetup(meetupId , dataToUpdate){
  try {
    const updatedMeetup = await Event.findByIdAndUpdate(meetupId , dataToUpdate, {new: true})
    return(updatedMeetup)
    
  } catch (error) {
    console.log("error in updating image" , error)
    
  }
}

app.post("/meetups/:meetupId" , async (req, res) =>{
  try {
    const updatedMeetup = await updateMeetup(req.params.id , req.body)
    if(updateMeetup){
      res.status(200).json({message: "update is successful"})
    }else{
      res.status(404).json({error: "failed to find meetups"})
    }
    
  } catch (error) {
    res.status(500).json({error: "failed to update meetup"})
  }
})



const PORT = process.env.PORT || 3000
app.listen(PORT , () => {
  console.log("server is running a port" , PORT)
})
