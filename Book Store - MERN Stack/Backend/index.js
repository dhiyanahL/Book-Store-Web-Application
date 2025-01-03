import express from "express";
import { PORT, MONGODB_URL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

//Middleware for parsing request body
app.use(express.json());


//Middleware for handling CORS policy

//Option1 : Allow all origins with default of cors(*)

app.use(cors());

//Option 2 - Allowing Custom Origins
/*app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"],
    })
);*/

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("Welcome to MERN stack tutorial");
})

app.use("/books", booksRoute);

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


