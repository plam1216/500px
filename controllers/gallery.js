// DEPENDENCIES
const express = require('express')
const galleryRouter = express.Router()
const Gallery = require('../models/gallery.js')

// INDEX
galleryRouter.get('/', (req, res) => {
    Gallery.find({}, (err, foundGalleries) => {
        res.render('gallery/index.ejs', {
            galleries: foundGalleries
        })
    })
})

// NEW
galleryRouter.get('/new', (req, res) => {
    res.render('gallery/new.ejs')
})

// DELETE
galleryRouter.delete('/:id', (req, res) => {
    Gallery.findByIdAndDelete(req.params.id, () => {
        res.redirect('/gallery')
    })
})

// UPDATE
galleryRouter.put('/:id', (req, res) => {
    Gallery.findByIdAndUpdate(req.params.id, req.body, {new: true}, () => (
        res.redirect(`/gallery/${req.params.id}`)
    ))
})

// CREATE
galleryRouter.post('/', (req, res) => {
    Gallery.create(req.body, (err, createdGallery) => {
        res.redirect('/gallery')
    })
})

// EDIT
galleryRouter.get('/:id/edit', (req, res) => {
    Gallery.findById(req.params.id, (err, foundGallery) => {
        res.render('gallery/edit.ejs', {
            gallery: foundGallery
        })
    })
})

// SHOW
galleryRouter.get('/:id', (req, res) => {
    Gallery.findById(req.params.id, (err, foundGallery) => {
        res.render('gallery/show.ejs', {
            gallery: foundGallery,
        })
    })
})

module.exports = galleryRouter