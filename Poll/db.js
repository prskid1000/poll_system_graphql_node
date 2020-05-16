const Mongoose = require("mongoose");
exports.init = (req, res, next) => {
  Mongoose.connect('mongodb+srv://prskid1000:nIELmPiB3vZ4YkWQ@cluster0-qxsqv.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true });
  next();
};
