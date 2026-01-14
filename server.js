require("dotenv").config();

let express = require("express");
let mongoose = require("mongoose");
let methodOverride = require("method-override");
let Dish = require("./models/Dish");

let app = express();


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


    app.get("/test", (req, res) => {
        res.send("Food CRUD is coooking!");
    });

    app.get("/", (req, res) => {
        res.redirect("/dishes");
    });



    app.get("/dishes", async (req, res) => {
        let dishes = await Dish.find();
        res.render("dishes/index", { dishes });
    });

    app.get("/dishes/new", (req, res) => {
        res.render("dishes/new");
    });

    app.post("/dishes", async (req, res) => {
        req.body.isAvailable = req.body.isAvailable === "on";
        await Dish.create(req.body);
        res.redirect("/dishes");
    });

    app.get("/dishes/:id", async (req, res) => {
        let dish = await Dish.findById(req.params.id);
        res.render("dishes/show", { dish });
    });

    app.get("/dishes/:id/edit", async (req, res) => {
        let dish = await Dish.findById(req.params.id);
        res.render("dishes/edit", { dish });
    });

    app.put("/dishes/:id", async (req, res) => {
        req.body.isAvailable = req.body.isAvailable === "on";
        await Dish.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.redirect(`/dishes/${req.params.id}`);
    });

    app.delete("/dishes/:id", async (req, res) => {
        await Dish.findByIdAndDelete(req.params.id);
        res.redirect("/dishes");
    });

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });