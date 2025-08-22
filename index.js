const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let globalMessage = "Welcome to the game 🚂🔥";

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Global Message Sender</title></head>
      <body style="font-family:sans-serif; padding:2rem;">
        <h1>Send Global Message</h1>
        <input id="msgInput" type="text" placeholder="Type your message..." style="width:100%; padding:8px;" />
        <button onclick="sendMsg()" style="margin-top:10px; padding:10px;">Send</button>
        <p id="status"></p>

        <script>
          async function sendMsg() {
            const message = document.getElementById("msgInput").value;
            const res = await fetch("/message", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ message })
            });
            const data = await res.json();
            document.getElementById("status").innerText = "Sent: " + data.message;
          }
        </script>
      </body>
    </html>
  `);
});

app.get("/message", (req, res) => {
  res.json({ message: globalMessage });
});

app.post("/message", (req, res) => {
  if (!req.body.message) return res.status(400).json({ error: "Message required" });
  globalMessage = req.body.message;
  console.log("New message:", globalMessage);
  res.json({ message: globalMessage });
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
