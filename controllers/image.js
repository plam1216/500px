// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const imageRouter = express.Router()
// Image schema is nested inside Album schema
const Album = require('../models/album.js')

// DELETE IMAGE FROM GALLERY
imageRouter.delete('/album/:id/image/:imgId', (req, res) => {
    albumId = mongoose.Types.ObjectId(`${req.params.id}`)
    imgId = mongoose.Types.ObjectId(`${req.params.imgId}`)

    Album.findOneAndUpdate({'images._id': imgId}, {$pull: {images:{_id:imgId}}}, () => {
        res.redirect(`/album/${req.params.id}`)
    })
})

// UPDATE IMAGE IN GALLERY
imageRouter.put('/album/:id/image/:imgId', (req, res) => {
    // convert .id and .imgId to type ObjectId('') to use for comparison later
    albumId = mongoose.Types.ObjectId(`${req.params.id}`)
    imgId = mongoose.Types.ObjectId(`${req.params.imgId}`)
    
    // updateImg contains key value pairs to update an album
    let updateImg = {$set: {}}
    for(param in req.body) {
        updateImg.$set['images.$.'+param] = req.body[param]
    }

    // _id and images._id are type ObjectId('')
    // find Album with matching _id AND images._id then reassign values with updateImg
    Album.findOneAndUpdate({'_id': albumId, 'images._id':imgId}, updateImg, () => {
        res.redirect(`/album/${req.params.id}/image/${req.params.imgId}`)
    })
})

// CREATE/ADD IMAGE IN GALLERY
imageRouter.post('/album/:id/image', (req, res) => {
    // find the album we clicked on
    Album.findById(req.params.id, (err, foundAlbum) => {

        // push the req.body into the images array which has the Image schema
        // this fills the values for the Image schema
        foundAlbum.images.push(req.body);

        // need to save when we are targetting specific keys
        foundAlbum.save((err) => {
            // redirect back to the page of the selected album we were trying to add images to
            res.redirect(`/album/${foundAlbum._id}`)
        })        
    })
})

// EDIT IMAGE IN GALLERY
imageRouter.get('/album/:id/image/:imgid/edit', (req, res) => {
    Album.findById(req.params.id, (err, foundAlbum) => {
        for(let i = 0; i < foundAlbum.images.length; i++) {
        // .toString() to converts the Mongodb ObjectId to a string
            if(foundAlbum.images[i]._id.toString() === req.params.imgid) {
                res.render(`image/edit.ejs`, {
                    album: foundAlbum,
                    image: foundAlbum.images[i]
                })
            }
        }
    })
})

// SHOW IMAGE IN GALLERY
imageRouter.get('/album/:id/image/:imgid', (req, res) => {
    Album.findById(req.params.id, (err, foundAlbum) => {
        for(let i = 0; i < foundAlbum.images.length; i++) {
            // .toString() to convert the Mongodb Object ID to a string
            if(foundAlbum.images[i]._id.toString() === req.params.imgid) {
                res.render(`image/show.ejs`, {
                    album: foundAlbum,
                    image: foundAlbum.images[i]
                })
            }
        }
    })
})

module.exports = imageRouter