const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 100) + 10;
    const camp = new Campground({
      // AUthor is hardcoded to YOUR USER ID
      author: "6487db88229b7847cafbea09",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci recusandae iure mollitia qui dolorum. Sequi ab optio inventore eum enim architecto atque eius, eaque rem. Adipisci quidem necessitatibus quas doloribus?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dli6p3yfs/image/upload/v1692847409/YelpCamp/xvqihlobqbibxobyawcn.jpg",
          filename: "YelpCamp/xvqihlobqbibxobyawcn",
        },
        {
          url: "https://res.cloudinary.com/dli6p3yfs/image/upload/v1692847410/YelpCamp/a2fu4brysllvephxw7vb.jpg",
          filename: "YelpCamp/a2fu4brysllvephxw7vb",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
