const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Create Schema
const ShowBookingsSchema = new Schema({
  booking_id: String,
  booking_user: String,
  booking_show: String,
  booking_seats: [ String ],
  booking_status: String,
  booking_time: Date
});

const ShowBookings = mongoose.model("ShowBookings", ShowBookingsSchema);

module.exports = ShowBookings;