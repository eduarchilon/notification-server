const webpush = require("web-push");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

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

const enviarNotificacion = (req, res) => {
  console.log(req.body.data);
  const pushSubscription = req.body.data;

  const payload = {
    notification: {
      title: "😄😄 Saludos",
      body: "Subscribete a mi canal de YOUTUBE",
      vibrate: [100, 50, 100],
      image:
        "https://avatars2.githubusercontent.com/u/15802366?s=460&u=ac6cc646599f2ed6c4699a74b15192a29177f85a&v=4",
      actions: [
        {
          action: "explore",
          title: "Go to the site",
        },
      ],
    },
  };

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
};

app.route("/api/enviar-notificacion").post(enviarNotificacion);

const httpServer = app.listen(3000, () => {
  console.log(
    "HTTP Server running at http://localhost:" + httpServer.address().port
  );
});
