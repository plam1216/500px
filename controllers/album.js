// DEPENDENCIES
const express = require('express')
const albumRouter = express.Router()
const Album = require('../models/album.js')

// INDEX SHOW ALL MY ALBUMS
albumRouter.get('/', (req, res) => {
    Album.find({}, (err, foundAlbums) => {
        res.render('album/index.ejs', {
            albums: foundAlbums
        })
    })
})

// NEW PAGE TO FILL OUT FORM
albumRouter.get('/new', (req, res) => {
    res.render('album/new.ejs')
})

// DELETE ENTIRE ALBUM
albumRouter.delete('/:id', (req, res) => {
    Album.findByIdAndDelete(req.params.id, () => {
        res.redirect('/album')
    })
})

// UPDATE ALBUM INFO
albumRouter.put('/:id', (req, res) => {
    Album.findByIdAndUpdate(req.params.id, req.body, {new: true}, () => (
        res.redirect(`/album/${req.params.id}`)
    ))
})

// CREATE A NEW ALBUM
albumRouter.post('/', (req, res) => {
    Album.create(req.body, (err, createdAlbum) => {
        res.redirect('/album')
    })
})

// EDIT ALBUM INFO
albumRouter.get('/:id/edit', (req, res) => {
    Album.findById(req.params.id, (err, foundAlbum) => {
        res.render('album/edit.ejs', {
            album: foundAlbum
        })
    })
})

// SHOW ONE ALBUM
albumRouter.get('/:id', (req, res) => {
    Album.findById(req.params.id, (err, foundAlbum) => {
        res.render('album/show.ejs', {
            album: foundAlbum,
        })
    })
})

module.exports = albumRouter