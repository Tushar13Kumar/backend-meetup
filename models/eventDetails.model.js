const mongoose = require("mongoose")

const detailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    host: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    dressCode: {
        type: String,
        required: true,
    },
    ageRestrictions: {
        type: String,
        required: true,
    },
    tags: [{
        type: String,
        enum:  [
  "Digital Marketing",
  "Webinar",
  "Virtual Conference",
  "Online Workshop",
  "Remote Work",
  "E-learning",
  "Tech Talk",
  "Startup Pitch",
  "AI & Machine Learning",
  "Blockchain",
  "Product Management",
  "Social Media Strategy",
  "Content Creation",
  "Cloud Computing",
  "Cybersecurity",
  "Software Development",
  "Data Analytics",
  "UI/UX Design",
  "SEO & SEM",
  "Personal Branding",
  "Digital Transformation",
  "Growth Hacking",
  "Online Networking",
  "Entrepreneurship",
  "Remote Collaboration",
  "Networking Event",
  "Startup Meetup",
  "Business Conference",
  "Tech Expo",
  "Hackathon",
  "Community Gathering",
  "Product Launch",
  "Panel Discussion",
  "Career Fair",
  "Investor Meetup",
  "Marketing Summit",
  "Workshop",
  "Leadership Talk",
  "Team Building",
  "Design Meetup",
  "Photography Walk",
  "Local Business Event",
  "Co-working Meetup",
  "Innovation Summit",
  "Recruitment Drive",
  "Open Mic Night",
  "Art & Culture Meetup",
  "Health & Wellness",
  "Public Speaking",
  "Educational Seminar"
],
        required: true,
    }], 
    duration: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    eventTime: {
        type: String,
        required: true,
    },
    // speaker:{
    //     type: Number,
    //     required: true,
    // },
    speakers: [
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    position: { type: String, required: true },
  },
],


},
{
    timestamps: true,
},
)

const Details = mongoose.model("Details" , detailSchema);

module.exports = Details;