const webpush = require("web-push");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
app.use(cors());

app.use(bodyParser.json());

const vapidKeys = {
  publicKey:
    "BCpfOVBWK3YLN5aJ-t5iZkPaPJO5nKIupLV9MSQ6vTArc0cTqOicE3RJAPicSH3hqXlVJFZ8iLlxJJs1STtb4Ik",
  privateKey: "H7bPZkhA73DmajYy5c0exBc2gaYy6uzjpQHDNWoeTIk",
};

webpush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

app.post("/api/enviar-notificacion", (req, res) => {
  const pushSubscription = req.body.data.data;

  const payload = req.body.data.payload;

  webpush
    .sendNotification(pushSubscription, JSON.stringify(payload))
    .then((res) => {
      console.log("Enviado !!");
    })
    .catch((err) => {
      console.log("Error", err);
    });

  res.send({
    data: "Se envio subscribete!!",
    pushSubscription: pushSubscription,
  });
});

const httpServer = app.listen(port, () => {
  console.log(
    "HTTP Server running at http://localhost:" + httpServer.address().port
  );
});
