const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
        imageName: String,
        imageURL: {type: String, required: true},
        comments: [{type: String}]
    }, {
        // timestamps: true -> Mongoose creates createdAt and updatedAt properties with type Date for when the document was created and last updated
        timestamps: true
    }
)

const albumSchema = new Schema({
    albumName: String,
    coverImage: {type: String, require: true},
    albumDescription: String,
    images: [imageSchema]
    }, {
    timestamps: true
    }
)

const Album = mongoose.model('Album', albumSchema)

module.exports = Album