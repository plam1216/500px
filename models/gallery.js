const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
        imageName: String,
        imageURL: {type: String, required: true},
        // imageDescription: String
    }, {
        // timestamps: true -> Mongoose creates createdAt and updatedAt properties with type Date for when the document was created and last updated
        timestamps: true
    }
)

const gallerySchema = new Schema({
    galleryName: String,
    coverImage: {type: String, require: true},
    galleryDescription: String,
    galleryImages: [imageSchema]
    }, {
    timestamps: true
    }
)

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery