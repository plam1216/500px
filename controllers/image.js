// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const imageRouter = express.Router()
// Image schema is nested inside Gallery schema
const Gallery = require('../models/gallery.js')

// DELETE
imageRouter.delete('/gallery/:id/image/:imgId', (req, res) => {
    galId = mongoose.Types.ObjectId(`${req.params.id}`)
    imgId = mongoose.Types.ObjectId(`${req.params.imgId}`)

    Gallery.findOneAndUpdate({'galleryImages._id': imgId}, {$pull: {galleryImages:{_id:imgId}}}, () => {
        res.redirect(`/gallery/${req.params.id}`)
    })
})


// UPDATE
imageRouter.put('/gallery/:id/image/:imgId', (req, res) => {
    galId = mongoose.Types.ObjectId(`${req.params.id}`)
    imgId = mongoose.Types.ObjectId(`${req.params.imgId}`)

    let updateImg = {$set: {}}
    for(param in req.body) {
        updateImg.$set['galleryImages.$.'+param] = req.body[param]
    }

    Gallery.findOneAndUpdate({'_id': galId, 'galleryImages._id':imgId}, updateImg, () => {
        res.redirect(`/gallery/${req.params.id}/`)
    })
})

// CREATE
imageRouter.post('/gallery/:id/image', (req, res) => {
    // find the gallery we clicked on
    Gallery.findById(req.params.id, (err, foundGallery) => {
        // push the req.body into the galleryImages array which has the Image schema
        // this fills the values for the Image schema
        foundGallery.galleryImages.push(req.body);
        // need to save when we are targetting specific keys
        foundGallery.save((err) => {
            // redirect back to the page of the selected gallery we were trying to add images to
            res.redirect(`/gallery/${foundGallery._id}`)
        })        
    })
})

// EDIT
imageRouter.get('/gallery/:id/image/:imgid/edit', (req, res) => {
    Gallery.findById(req.params.id, (err, foundGallery) => {
        for(let i = 0; i < foundGallery.galleryImages.length; i++) {
        // .toString() to convert the Mongodb Object ID to a string
            if(foundGallery.galleryImages[i]._id.toString() === req.params.imgid) {
                res.render(`image/edit.ejs`, {
                    gallery: foundGallery,
                    galleryImage: foundGallery.galleryImages[i]
                })
            }
        }
    })
})
// SHOW

module.exports = imageRouter