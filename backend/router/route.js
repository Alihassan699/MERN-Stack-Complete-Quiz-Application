import { Router } from "express";
const router = Router();

import { 
    getResults, 
    storeResults, 
    updateResult,
    getQuestions,
    postQuestions,
    updateQuestion,
    dropQuestions 
} from '../controllers/controller.js';

// Results routes
router.route('/results')
    .post(storeResults);  // Store new results

router.route('/results/:quizId')  // Fetch and update results by quizId
    .get(getResults)  // Fetch results
    .put(updateResult);  // Update results

// Questions routes
router.route('/questions')
    .get(getQuestions)
    .post(postQuestions)
    .delete(dropQuestions);

router.route('/questions/:id')
    .put(updateQuestion);

export default router;