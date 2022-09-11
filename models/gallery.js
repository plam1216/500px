const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    imageName: String,
    imageURL: {type: String, required: true},
    imageDescription: String
})

const gallerySchema = new Schema({
    galleryName: String,
    coverImage: String,
    galleryDescription: String,
    galleryImages: [imageSchema]
})

const Gallery = mongoose.model('Gallery', gallerySchema)

module.exports = Gallery