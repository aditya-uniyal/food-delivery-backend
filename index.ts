import "dotenv/config";

import express from "express";
import bodyParser from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";


import { AdminRoute, VendorRoute } from "./routes";
import { MONGO_URI } from "./config";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // to parse files and multi-part form data

app.use('/admin', AdminRoute);
app.use('/vendor', VendorRoute);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions).then(result => {
    // console.log(result);
    console.log("connected to db");
}).catch(err => {
    console.log("error "+err);
})

app.listen(5001, () => {
    console.clear();
    console.log("app is running on 5001");
});