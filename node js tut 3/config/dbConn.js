let mongoose;

try {
    mongoose = require('mongoose');
} catch (err) {
    mongoose = null;
}

const connectDB = async () => {
    if (!mongoose) {
        console.log('Mongoose is not installed. Skipping MongoDB connection.');
        return;
    }

    if (!process.env.DATABASE_URI) {
        console.log('DATABASE_URI is not set. Skipping MongoDB connection.');
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    }
};

module.exports = connectDB