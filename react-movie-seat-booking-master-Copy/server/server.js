const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const ShowBookings = require("./models/ShowBookings");

dotenv.config()

const paymentRoute = require("./routes/payment")
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const configureRoutes = require("./routes")
// app.use("/payment", paymentRoute)


configureRoutes(app);

// DB Config
const db = require("./config/keys").mongoURI;

//console.log("Hello, " + db );
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

app.listen(8000, error => {
  if (error) throw error;
  console.log("Server running on port " + 8000);
});

app.get('/movies', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


// const port = process.env.PORT || 3000; // 5000 process.env.port is Heroku's port if you choose to deploy the app there
// app.listen(port, () => console.log(`Server up and running port ${port} !`));

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const User = require("./models/ShowBookings");
// dotenv.config()



// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// const configureRoutes = require("./routes")



// configureRoutes(app);

// // // DB Config
// // const db = require("./config/keys").mongoURI;

// // //console.log("Hello, " + db );
// // // Connect to MongoDB
// // mongoose
// //   .connect(
// //     db,
// //     { useNewUrlParser: true }
// //   )
// //   .then(() => console.log("MongoDB successfully connected"))
// //   .catch(err => console.log(err));

// app.listen(5000, error => {
//   if (error) throw error;
//   console.log("Server running on port " + 5000);
// });
