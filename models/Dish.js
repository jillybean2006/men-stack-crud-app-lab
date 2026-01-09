let mongoose = require('mongoose');

let dishSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cuisine: { type: String, default: "unknown" },
    spicyLevlel: { type: Number, min: 0, max: 5, default: 0 },
    price: { type: Number, min: 0, required: true },
    isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('Dish', dishSchema);