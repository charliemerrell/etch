require("dotenv").config();
const express = require("express");
const session = require("express-session");
const redis = require("redis");

const redisClient = redis.createClient();
const RedisStore = require("connect-redis")(session);

const router = require("./routers/index");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false,
        name: "sid",
        store: new RedisStore({ client: redisClient }),
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            sameSite: true,
        },
    })
);

app.listen(process.env.PORT, () => {
    console.log(`Api listening at http://localhost:${process.env.PORT}`);
});

app.use(express.static("public"));

app.use("/api", router);
