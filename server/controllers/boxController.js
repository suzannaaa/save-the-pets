//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const model = require("../models/boxModel.js");

//////////////////////////////////////////////////////
// GET ALL BOX
//////////////////////////////////////////////////////
module.exports.readAllBox = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllBox:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR GET RANDOM PET
// ##############################################################
// req, res, next callback used for petController
module.exports.getRandomPet = (req, res, next) => {
    const data = {
        box_id: req.body.box_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error getting random pet:", error);
            res.status(500).send("Error getting random pet:", error);
        } else {
            console.log(results);
            res.locals.pet = results[0];
            next();
        }
    };

    model.selectRandomPet(data, callback);
};


// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR BUY BOX
// ##############################################################
module.exports.checkPointsByBox = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id,
        box_id: req.body.box_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error checking points:", error);
            res.status(500).json(error);
        } else {
            const new_points = results[0].new_points;
            if (new_points < 0) {
                res.status(400).json({ error: "Insufficient points" });
            } else {
                res.locals.new_points = new_points;
                next();
            }
        }
    };

    model.checkPoints(data, callback);
}

module.exports.updatePointsByBox = (req, res, next) => {
    const data = {
        new_points: res.locals.new_points,
        user_id: res.locals.user_id
    };

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updating points:", error);
            res.status(500).json(error);
        } else {
            // Points were updated successfully
            next();
        }
    };

    model.updatePoints(data, callback);
}

// // ##############################################################
// // DEFINE CONTROLLER FUNCTION FOR CREATE BOX
// // ##############################################################
// module.exports.createNewBox = (req, res, next) =>
// {
//     if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
//         res.status(400).json({
//             message: "Missing required data."
//         });
//         return;
//     }

//     const data = {
//         title: req.body.title,
//         description: req.body.description,
//         points: req.body.points
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error createNewTask:", error);
//             res.status(500).json(error);
//         } else {
//             // console.log(results);
//             res.status(201).json({
//                 box_id: results.insertId,
//                 title: data.title,
//                 description: data.description,
//                 points: data.points
//             });
//         }
//     };

//     model.insertSingle(data, callback);
// }

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TASK BY ID
// ##############################################################
module.exports.readBoxById = (req, res, next) =>
{
    const data = {
        box_id: req.params.box_id
    }

    const callback = (error, results, fields) => {
        console.log(results);
        if (error) {
            console.error("Error readBoxById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Box not found"
                });
            }
            else res.status(200).json(results);
        }
    }

    model.selectById(data, callback);
}

// // ##############################################################
// // DEFINE CONTROLLER FUNCTION FOR UPDATE TASK BY ID
// // ##############################################################
// module.exports.updateBoxById = (req, res, next) =>
// {
//     if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
//         res.status(400).json({
//             message: "Missing required data."
//         });
//         return;
//     }

//     const data = {
//         box_id: req.params.box_id,
//         title: req.body.title,
//         description: req.body.description,
//         points: req.body.points
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error updateTaskById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results.affectedRows == 0) 
//             {
//                 res.status(404).json({
//                     message: "Task not found"
//                 });
//             }
//             else {
//                 // console.log(results);
//                 res.status(200).json({
//                     box_id: data.box_id,
//                     title: data.title,
//                     description: data.description,
//                     points: data.points
//                 });
//             }
//         }
//     }

//     model.updateById(data, callback);
// }

// // ##############################################################
// // DEFINE CONTROLLER FUNCTION FOR DELETE BOX BY ID
// // ##############################################################
// module.exports.deleteBoxById = (req, res, next) =>
// {
//     const data = {
//         box_id: req.params.box_id
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error deleteTaskById:", error);
//             res.status(500).json(error);
//         } else {
//             if(results[0].affectedRows == 0) 
//             {
//                 res.status(404).json({
//                     message: "Task not found"
//                 });
//             }
//             else res.status(204).send(); // 204 No Content            
//         }
//     }

//     model.deleteById(data, callback);
// }