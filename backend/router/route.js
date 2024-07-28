import { Router } from "express";
const router = Router();

import { 
    getResults, 
    storeResults, 
    updateResult, 
    deleteResults,
    getQuestions,
    postQuestions,
    updateQuestion,
    dropQuestions 
} from '../controllers/controller.js';


// Results routes
router.route('/results')
    .get(getResults)        
    .post(storeResults)     
    .delete(deleteResults); 

router.route('/results/:id')
    .put(updateResult);

// Questions routes
router.route('/questions')
    .get(getQuestions)
    .post(postQuestions)
    .delete(dropQuestions);

router.route('/questions/:id')
    .put(updateQuestion);

export default router;