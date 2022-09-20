const Comment = require("../models/Comment");

module.exports = {
 
  createComment: async (req, res) => {
    try {
        await Comment.create({
        comment: req.body.comment,
        user: req.user.id,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },

  likeComment: async (req, res) => {
    try {
      await Comment.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Comment.remove({ _id: req.params.id });
      console.log("Deleted comment");
      res.redirect('back');
    } catch (err) {
      res.redirect('back');
    }
  },
};