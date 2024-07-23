import { Router } from "express";
const router = Router();

import { 
    dropQuestions, 
    dropresults, 
    getQuestions, 
    getresults, 
    postQuestions, 
    storeResults, 
    updateQuestion, 
    updateResult 
} from '../controllers/controller.js';

router.route('/questions')
    .get(getQuestions)      // Get request
    .post(postQuestions)    // Post request
    .delete(dropQuestions);  // Delete request

router.route('/questions/:id')
    .put(updateQuestion);   // Update request

router.route('/result')
    .get(getresults)        // Get request
    .post(storeResults)     // Store request
    .delete(dropresults);   // Delete request

router.route('/result/:id')
    .put(updateResult);     // Update request

export default router;
