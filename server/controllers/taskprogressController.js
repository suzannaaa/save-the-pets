// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/taskprogressModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE PROGRESS
// ##############################################################
module.exports.createNewProgress = (req, res, next) =>
{
    const data = {
        user_id: res.locals.user_id,
        task_id: req.body.task_id,
        completion_date: req.body.completion_date,
        notes: req.body.notes
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewProgress:", error);
            res.status(500).json(error);
        } else {
            // console.log(results);
            res.status(201).json({
                progress_id: results.insertId,
                user_id: data.user_id,
                task_id: data.task_id,
                completion_date: data.completion_date,
                notes: data.notes
            });
        }
    }

    model.insertSingle(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CHECK USER EXISTENCE
// ##############################################################
module.exports.checkUserExistence = (req, res, next) => {
    if (res.locals.user_id  == undefined || req.body.task_id == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        user_id: res.locals.user_id
    };
   
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "user_id does not exist." });
            return;
        }
        next();
    }
    model.chkUser(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CHECK TASK EXISTENCE
// ##############################################################
module.exports.checkTaskExistence = (req, res, next) => {
    const data = {
        task_id: req.body.task_id
    };
    if (!data.task_id) {
        return res.status(400).json({
            message: "Missing required data."
        })

    }
    const callback = (error, results, fields) => {
        if (error) {
            res.status(500).json(error);
            return;
        }
        if (results.length === 0) {
            res.status(404).json({ message: "task_id does not exits." });
            return;
        }
        next();
    }
    model.chkTask(data, callback);
}

// // ##############################################################
// // DEFINE CONTROLLER FUNCTION FOR READ PROGRESS BY ID
// // ##############################################################
// module.exports.readProgressById = (req, res, next) =>
// {
//     const data = {
//         progress_id: req.params.progress_id
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error readProgressById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results.length == 0) 
//             {
//                 res.status(404).json({
//                     message: "Task not found"
//                 });
//             }
//             else res.status(200).json(results[0]);
//         }
//     }

//     model.selectById(data, callback);
// }

// // ##############################################################
// // DEFINE CONTROLLER FUNCTION FOR UPDATE PROGRESS BY ID
// // ##############################################################
// module.exports.updateProgressById = (req, res, next) => {
//     if (req.body.notes == undefined) {
//         res.status(400).json({
//             message: "Missing required data."
//         });
//         return;
//     }

//     const data = {
//         notes: req.body.notes,
//         progress_id: req.params.progress_id
//     }

//     const callback = (error, results, fields) => {
//         console.log(results);
//         if (error) {
//             console.error("Error updateProgressById", error);
//             res.status(500).json(error);
//         }
//         else {
//             if (results.affectedRows == 0) {
//                 res.status(404).json({
//                     message: "progress_id does not exist."
//                 });
//             }
//             else {
//                 const getProgressData = (error, results) => {
//                     if (error) {
//                         console.error("Error getProgressData", error);
//                         res.status(500).json(error);
//                     }
//                     else {
//                         res.status(200).json(results[0]);
//                     }
//                 }
//                 model.getData(data, getProgressData);
//             } 
//         }
//     }
//     model.updateById(data, callback);
// }

// // ##############################################################
// // DEFINE CONTROLLER FUNCTION FOR DELETE PROGRESS BY ID
// // ##############################################################
// module.exports.deleteProgressById = (req, res, next) =>
// {
//     const data = {
//         progress_id: req.params.progress_id
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error deleteProgressById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results[0].affectedRows == 0) 
//             {
//                 res.status(404).json({
//                     message: "Task progress not found"
//                 });
//             }
//             else res.status(204).send(); // 204 No Content            
//         }
//     }

//     model.deleteById(data, callback);
// }