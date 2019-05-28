const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;


// routes


// middlewares
app.use(morgan("dev"));
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: false,
        parameterLimit: 1000000
    })
);
app.use(bodyParser.json({ limit: "50mb" }));



// manage CORS
app.use((req, res, next) => {
    // we say what we wan to allow , you can whitelist IPs or domains here
    res.header("Access-Control-Allow-Origin", "*");
    // determine the kinds of headers to allow
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, GET, DELETE");
        return res.status(200).json({
            "statusMessage": "ok"
        });
    }
    next();
});

// routes middlewares
// app.use("/products", productRoutes);
// app.use("/orders", orderRoutes);
// app.use("/customers", customerRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// start server
app.listen(PORT, () => {
    console.log("Apptashop RESTFUL server running on Port: " + PORT);
});

module.exports = app;

