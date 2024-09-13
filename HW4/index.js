const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/metal', async (req, res) => {
  let url = "https://randomfox.ca/floof/";
  let response = await fetch(url);
  let data = await response.json();
  let image = data.image;
  res.render('metal', {"image":image});
});

app.get('/scenekit', async (req, res) => {
  let url = "https://randomfox.ca/floof/";
  let response = await fetch(url);
  let data = await response.json();
  let image = data.image;
  res.render('scenekit', {"image":image});
});

app.get('/spritekit', async (req, res) => {
  let url = "https://randomfox.ca/floof/";
  let response = await fetch(url);
  let data = await response.json();
  let image = data.image;
  res.render('spritekit', {"image":image});
});

app.get('/swiftui', async (req, res) => {
  let url = "https://randomfox.ca/floof/";
  let response = await fetch(url);
  let data = await response.json();
  let image = data.image;
  res.render('swiftui', {"image":image});
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});