
const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
  console.log("Requested URL:", req.method, req.url);
  next();
});

// Form route
app.get("/", (req, res) => {
  res.send(`
    <h2>Simple Login Form</h2>
    <form method="POST" action="/login">
      <label>Name:</label>
      <input type="text" name="name" />

      <br/><br/>

      <label>Password:</label>
      <input type="password" name="password" />

      <br/><br/>

      <button type="submit">Submit</button>
    </form>
  `);
});

// POST route: No data shown
app.post("/login", (req, res) => {
  // Just print internally (optional)
  console.log("Received:", req.body);

  // Only show success message on browser
  res.send(`<h2>Form Submitted Successfully </h2>
            <a href="/">Go Back</a>`);
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
