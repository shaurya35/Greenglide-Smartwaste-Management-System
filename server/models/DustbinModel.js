const mongoose = require('mongoose');

const dustbinSchema = new mongoose.Schema({
    dustbinId: { type: String, required: true, unique: true }, 
    location: {
        type: { type: String, enum: ['Point'], required: true }, 
        coordinates: { type: [Number], required: true }, 
    },
    color: { type: String, required: true }, 
    workerId: { type: String, required: true }, 
});

dustbinSchema.index({ location: '2dsphere' }); 

const Dustbin = mongoose.model('Dustbin', dustbinSchema);

module.exports = Dustbin;
