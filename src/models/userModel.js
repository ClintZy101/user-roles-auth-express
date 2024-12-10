const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ // Use `Schema` here
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'user', 'manager'], // Restrict values to specific roles
    },
}, {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('User', userSchema); // Export the model based on the schema
