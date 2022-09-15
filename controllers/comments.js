// DEPENDENCIES
const express = require('express')
const mongoose = require('mongoose')
const commentsRouter = express.Router()
// Image schema is nested inside Album schema
const Album = require('../models/album.js')


// DELETE COMMENT FROM IMAGE
commentsRouter.delete('/album/:id/image/:imgId/comments', (req, res) => {
    albumId = mongoose.Types.ObjectId(`${req.params.id}`)
    imgId = mongoose.Types.ObjectId(`${req.params.imgId}`)

    Album.findById(req.params.id, (err, foundAlbum) => {
        for(let i = 0; i < foundAlbum.images.length; i++) {
                for (let j = 0; j < foundAlbum.images[i].comments.length; j++) {
                    // delete from index of comment using .splice
                    foundAlbum.images[i].comments.splice(j, 1)
                    foundAlbum.save((err) => {
                        res.redirect(`/album/${foundAlbum._id}/image/${foundAlbum.images[i]._id}`)
                    })
                }
        }
    })
})

// CREATE/ADD COMMENT
commentsRouter.post('/album/:id/image/:imgid', (req, res) => {
    // console.log(req.body)
    Album.findById(req.params.id, (err, foundAlbum) => {
        for(let i = 0; i < foundAlbum.images.length; i++) {
        // .toString() to convert the Mongodb Object ID to a string
            if(foundAlbum.images[i]._id.toString() === req.params.imgid) {
                foundAlbum.images[i].comments.push(req.body.comment)
                // console.log(foundAlbum.images[i].comments[i])
                foundAlbum.save((err) => {
                    res.redirect(`/album/${foundAlbum._id}/image/${foundAlbum.images[i]._id}`)
                })
            }
        }
    })
})

module.exports = commentsRouter