const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

app.use(express.static(__dirname + '/views/styles'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css')) ;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
const SampleModel = require('./models/schema');
const NoteModel = require('./models/noteschema');

// Connect to your MongoDB server with the 'notes' database
mongoose.connect('mongodb+srv://surya-007:abcd1234@cluster0.e95bgae.mongodb.net/notes', { useNewUrlParser: true });

const db = mongoose.connection;
db.on("connected", () => {
  console.log("MongoDB is connected to the 'notes' database");
});
db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});


app.use(
  session({
    secret: 'your-secret-key', // Replace with a secure secret key for session management
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await SampleModel.findOne({ email, password });

    if (user) {
      req.session.email = email;
      res.redirect('/notes-home');
    } else {
      res.redirect('/register');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error during login.");
  }
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await SampleModel.findOne({ email });

    if (existingUser) {
      res.status(400).send("Account already registered.");
    } else {
      const newUser = new SampleModel({ email, password });
      await newUser.save();

      req.session.email = email;
      res.redirect('/notes-home');
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Error during registration.");
  }
});







app.get('/notes-home', async (req, res) => {
    const email = req.session.email; // Assuming you're using session for authentication
  
    if (!email) {
      res.redirect('/login');
      return;
    }
  
    try {
      const userRecord = await NoteModel.findOne({ email });
  
      if (userRecord) {
        const userNotes = userRecord.notes;
        res.render('notes-home', { notes: userNotes, email });
      } else {
        // Handle case where the user has no notes yet
        res.render('notes-home', { notes: [], email });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Error fetching notes.");
    }
  });

  



  app.post('/notes-home', async (req, res) => {
    const email = req.session.email;
    const content = req.body.content;
  
    if (!email) {
      res.redirect('/login');
      return;
    }
  
    try {
      const existingRecord = await NoteModel.findOne({ email });
  
      if (existingRecord) {
        existingRecord.notes.push({ content });
        await existingRecord.save();
      } else {
        const newRecord = new NoteModel({ email, notes: [{ content }] });
        await newRecord.save();
      }
  
      res.redirect('/notes-home');
    } catch (err) {
      console.log(err);
      res.status(500).send("Error saving note.");
    }
  });

  





app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
