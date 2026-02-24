const express=require("express")
const {createBlog,getAllBlogs,getBlogBySearch, getBlogById,updateBlog,deleteBlog}=require("../controller/blog1")

const router=express.Router()

router.post('/',createBlog)
router.get('/search',getBlogBySearch)
router.get('/',getAllBlogs)
router.get('/:id',getBlogById)
router.post('/:id',updateBlog)
router.delete('/:id', deleteBlog)

module.exports=router
