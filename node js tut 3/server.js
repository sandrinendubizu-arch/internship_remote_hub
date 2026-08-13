const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const {logger} = require('./middleware/logevents');
const errorHandler= require('./middleware/errorHandler');
const employeesRouter = require('./routes/API/employees');
const root = require('./routes/root');
const subdir = require('./routes/subdir');
const registerRouter = require('./routes/register');
const authRouter = require('./routes/auth');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dbConn');
const PORT = process.env.PORT || 3500;

//middleware for cookies
app.use(cookieParser());
app.use(credentials);

// Enable CORS cross-origin resource sharing
const whitelist = ['https://www.yoursite.com', 'http://localhost:3000'];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200 // For legacy browser support   
}

app.use(cors(corsOptions));

// Custom middleware logger
app.use(logger);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join(__dirname, 'data')));

// Routes
app.use('/', root);
app.use('/register', registerRouter);
app.use('/refresh', require('./routes/refresh'));
app.use('/employees', verifyJWT, employeesRouter);
app.use('/auth', authRouter);
app.use('/subdir', subdir);



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'new-page.html'));
});



// 404 handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

console.log('three');

app.use(errorHandler);

const startServer = async () => {
  if (process.env.DATABASE_URI) {
    await connectDB();
  } else {
    console.log('No DATABASE_URI set. Continuing without MongoDB connection.');
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();