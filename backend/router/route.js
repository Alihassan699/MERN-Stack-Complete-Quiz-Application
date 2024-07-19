import { Router } from "express";
const router = Router();

import { dropQuestions, dropresults, getQuestions, getresults, postQuestions, storeResults } from '../controllers/controller.js';



router.get('/questions', getQuestions);
router.post('/questions', postQuestions);


router.route('/questions')
    .get(getQuestions)      //Get request
    .post(postQuestions)    //Post request
    .delete(dropQuestions)  //Delete request


router.route('/result')
    .get(getresults)      //Get request
    .post(storeResults)    //store request
    .delete(dropresults)  //Delete request




export default router;
