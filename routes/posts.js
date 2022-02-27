import express from 'express';

import { getPosts, createPost, deletePost, getPostsByUser } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts)
router.get('/user/:id', getPostsByUser)
router.post('/', createPost)
router.delete('/:id', deletePost)

export default router