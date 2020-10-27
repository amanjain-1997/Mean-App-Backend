const express = require("express");

const Post = require("../models/post");


const router = express.Router();

const checkAuth= require("../middleware/check-auth");

router.post("", checkAuth, (req, res, next) => {
  console.log("Reached");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    email:req.body.email
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});


router.put("/:id", checkAuth, (req, res, next) => {
  console.log("Reached in Saving")
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    res.status(200).json({ message: "Update successful!" });
  });
});

router.get("/all/:email",  (req, res, next) => {
  console.log("reached in het");
  Post.find({email: req.params.email}).then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.get("/:id", checkAuth, (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  });
});

router.get("",  (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    });
  });
});

router.delete("/:id", checkAuth, (req, res, next) => {

  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });
});
module.exports = router;
