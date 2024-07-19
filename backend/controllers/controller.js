// controllers/quizController.js



        // Get all questions 
export async function getQuestions(req, res) {
    res.json("questions api get request");
}

        //Insert all questions  

export async function postQuestions(req, res) {
    res.json("questions api post request");
}


        //Delete all questions  
export async function dropQuestions(req, res) {
    res.json("questions api drop request");
}



  // Get all results
  export async function getresults(req, res) {
    res.json("results api get request");
}

        //Insert all results  

export async function storeResults(req, res) {
    res.json("results api post request");
}


        //Delete all results  
export async function dropresults(req, res) {
    res.json("results api drop request");
}



