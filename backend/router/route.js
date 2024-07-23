import { Router } from "express";
const router = Router();

import { 
    getResults, 
    storeResults, 
    updateResult, 
    deleteResults 
} from '../controllers/controller.js';


router.route('/result')
    .get(getResults)        
    .post(storeResults)     
    .delete(deleteResults); 

router.route('/result/:id')
    .put(updateResult);     

export default router;
