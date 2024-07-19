// routes/route.js
import { Router } from "express";
import { dropQuestions, dropresults, getQuestions, getresults, postQuestions, storeResults } from '../controllers/controller.js';

const router = Router();

router.route('/questions')
    .get(getQuestions)      // Get request
    .post(postQuestions)    // Post request
    .delete(dropQuestions)  // Delete request

router.route('/results')
    .get(getresults)        // Get request
    .post(storeResults)     // Store request
    .delete(dropresults)    // Delete request

export default router;
