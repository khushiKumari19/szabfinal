const Car = require("../models/car");

exports.createCar = (req, res) => {
  const {
    name,
    model,
    company,
    country,
    color,
    engine,
    feulType,
    totalPrice,
    tokenPrice,
    noOfSeats,
    noOfDoors,
    description,
    createdBy
  } = req.body;
  let carPictures = [];
  if (req.files.length > 0) {
    carPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  const car = new Car({
    name,
    model,
    company,
    country,
    color,
    engine,
    feulType,
    tokenPrice,
    totalPrice,
    carPictures,
    noOfSeats,
    noOfDoors,
    description,
    // createdBy: req.user._id,
  });
  car.save((error, car) => {
    if (error) return res.status(400).json({ error });
    if (car) {
      res.status(201).json({ car });
    }
  });
};

exports.getCarById = (req, res) => {
  const { carId } = req.params;
  if (carId) {
    Car.findOne({ _id: carId }).exec((error, car) => {
      if (error) return res.status(400).json({ error });
      if (car) {
        res.status(200).json({ car });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};
