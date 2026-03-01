const User = require("../models/User");
const Post = require("../models/Post")

//Upload Blog (Create)
const createBlog = async ( req, res ) => {
    const { userId, post,title,content } = req.body;

    const user = await User.findById(req.user_Id);
    user.content = user.post + content(posts)
    await user.save()

    await Post.create({
        Author: req.user._Id,
        blog,
        type: "UPLOAD"
    })

    res.status(201).json ({
        message: "Blog uploaded sucessfully",
        blog: user.blog
    })

    //Populate Blog-display
    const getBlog = async (req, res) => {
        const {authorUserId, readerUserId, blog} = req.body

        const author = await User.findById(UploadUserId)
        const reader = await User.findById(PopulateUserId)

        if(!populate){
            return res.status(404).json({
                error: 'Blog not found'
            })
        }

        if(upload.blog < populate){
            return res.status(400).json({error: "Blog Unavailable"})
        }

    
        await author.save()
        await populate.save()

        await post.create({
            Upload: UploadUserId,
            populate: populateUserIs,
            blog,
            type: "UPLOAD"
        })

        res.status(200).json({message: "Blog upload sucessfull"})
        
    }

    //Post-read
    const Post = async(req, res) => {
      const post = await Post.find({
            $or: [
                {upload: req.user._Id},
                {populate: req.user._Id},
            ]
        }).sort({createAt: -1})

        res.status(200).json({posts})
    }

    const updatePost = async (req, res) =>{
    try{
        const postId = new mongoose.Types.ObjectId(req.params.id)

        const updatePost = await Posts.findByIdAndUpdate(userId, req.body,{new :true})

        if(!updatePost) return res.status(404).json({error: "Post not found"});

        res.status(200).json(updatesPost)

        if(post.author.toString() !==req.user) {
            return res.status(401).json({error: 'Not authorized'});
        }

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.tags = req.body.tags || post.tags;
        post.status = req.bosy.status || post.status;

        const updatedPost = await post.save();
        res.status(200).json(updatedPost);

    }
    catch(error){
         res.status(400).json({error: 'Failed to update post'})
    }
}

exports.deletePost = async (req, res) => {
    try{
        const post = new mongoose.SchemaTypeOptions.ObjectId(req.params.id)
        const deletedPost = await Users.findByIdAndDelete(req.params.id)

        if(!deletedUser) return res.status(404).json({error: "Post not found"});
        res.status(200).json({message: "User deleted successfully"})
           }
           catch(error){
            res.status(400).json({error: error.message})
           }
        }

}

module.exports = { uploadBlog, populateBlog, updatePost,deletePost};