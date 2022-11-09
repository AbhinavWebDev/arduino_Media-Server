import express from "express"
import { createStory, getStory } from "../Controllers/StoryController.js";
const router =express.Router()

router.post('/',createStory)
router.get('/:id/story',getStory)

export default router;