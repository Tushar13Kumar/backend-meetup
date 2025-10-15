const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        required: true,

    },
    // time: {
    //     type: Date,
    //     required: true,
    // },
    eventType: {
        type: String,
        enum: ["Online" , "Offline"],
        required: true
    }, 
    thumbnail: {
        type: String,
        required: true,
    }
}, {timestamps: true,});

const EventListing = mongoose.model("EventListing", eventSchema);

module.exports = EventListing;