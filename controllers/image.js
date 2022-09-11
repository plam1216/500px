// DEPENDENCIES
const express = require('express')
const { isObjectIdOrHexString } = require('mongoose')
const imageRouter = express.Router()
// Image schema is nested inside Gallery schema
const Gallery = require('../models/gallery.js')

// DELETE

// UPDATE


// CREATE
imageRouter.post('/gallery/:id/image', (req, res) => {
    // find the gallery we clicked on
    Gallery.findById(req.params.id, (err, foundGallery) => {
        // console.log('req.body', req.body)
        // console.log('Found Gallery', foundGallery)
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
        // console.log("GALLERY ID", req.params.id)
        // console.log("IMAGE ID", req.params.imgid)
        // console.log('foundGallery id', foundGallery.galleryImages[0]._id)
        // console.log('[0] to str',foundGallery.galleryImages[0]._id.toString())
        // console.log('[0] length',foundGallery.galleryImages.length)
        for(let i = 0; i < foundGallery.galleryImages.length; i++) {
        // console.log('forloop galleryimageslength', foundGallery.galleryImages.length)
        // console.log('forloop galleryimages', foundGallery.galleryImages[i])
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