// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/usersModel.js");

// // ##############################################################
// // CONTROLLER FUNCTION FOR READ ALL USERS
// // ##############################################################
// module.exports.readAllUser = (req, res, next) => {
//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error readAllUser:", error);
//             res.status(500).json(error);
//         }
//         else res.status(200).json(results);
//     }

//     model.selectAll(callback);
// }

// ##############################################################
// CONTROLLER FUNCTION FOR READ PET BY USER
// ##############################################################
// module.exports.readPetByUser = (req, res, next) => {
//     const data = {
//         user_id: req.params.user_id,
//         pet_id: req.params.playerId
//     }
//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error readPetByUser:", error);
//             res.status(500).json(error);
//         } else if (results.length == 0) {
//             res.status(404).json({
//                 message: "User - Pet record not found"
//             });
//         } else {
//             res.status(200).json(results[0]);
//         }
//     }
//     model.selectPlayerUserRel(data, callback);
// }

// ##############################################################
// CONTROLLER FUNCTION FOR READ USER BY ID
// ##############################################################
module.exports.readUserById = (req, res, next) => {
    const data = {
        user_id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        console.log(results);
        console.log(fields);
        if (error) {
            console.error("Error readUserById:", error);
            res.status(500).json(error);
        } else {
            if (results.length === 0) {
                res.status(404).json({
                    message: "User not found"
                });
            } else {
                const user = {
                    user_id: results[0].user_id,
                    username: results[0].username,
                    email: results[0].email,
                    total_points: parseFloat(results[0].total_points)
                };
                res.status(200).json(user);
            }
        }
    }  
    model.selectById(data, callback);
}

// ##############################################################
// CONTROLLER FUNCTION FOR LOGIN
// ##############################################################
module.exports.login = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error login:", error);
            res.status(500).json(error);
        } else if (results.length == 1) {
            console.log(results);
            res.locals.user_id = results[0].user_id;
            res.locals.username = results[0].username;
            res.locals.hash = results[0].password;
            next();
        } else if (results.length > 1) {
            res.status(409).json({
                message: "Username already exists"
            });
        } else {
            res.status(404).json({
                message: "User not found"
            });
        }
    }
    model.selectUserByUsernameAndPassword(data, callback);
}

// ##############################################################
// CONTROLLER FUNCTION FOR REGISTER
// ##############################################################
module.exports.register = (req, res, next) => {
    if (!req.body.username || !req.body.email || !req.body.password) {
        res.status(400).json({ Error: "Missing required data." });
        return;
    }

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: res.locals.hash
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error register:", error);
            res.status(500).json(error);
        } else {
            // Assuming the user ID is present in the results
            res.locals.user_id = results.insertId; // Modify this line based on your database structure
            res.locals.username = data.username;
            res.locals.message = "User " + data.username + " created successfully.";
            next();
        }
    }
    model.insertSingle(data, callback);
}

// ##############################################################
// MIDDLEWARE FUNCTION FOR CHECK IF USERNAME OR EMAIL EXISTS
// ##############################################################
module.exports.checkUsernameOrEmailExist = (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.email
    }

    if (!req.body.username || !req.body.email) {
        res.status(400).json({ Error: "Missing required data." });
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error selectByUsernameOrEmail:", error);
            res.status(500).json(error);
        } else {
            if (results.length > 0) {
                res.status(409).json({
                    message: "Username or email already exists"
                });
            } else {
                next();
            }
        }
    }

    model.chkExist(data, callback);
}

// // ##############################################################
// // CONTROLLER FUNCTION FOR UPDATE USER BY ID
// // ##############################################################
// module.exports.updateUserById = (req, res, next) => {
//     if (req.body.username == undefined) {
//         res.status(400).json({
//             message: "Error: username is undefined"
//         });
//         return;
//     }

//     const data = {
//         user_id: req.params.user_id,
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error updateUserById:", error);
//             res.status(500).json(error);
//         } else {
//             if (results.affectedRows == 0) {
//                 res.status(404).json({
//                     message: "User not found"
//                 });
//             }
//             else res.status(204).send(); // 204 No Content
//         }
//     }

//     model.updateById(data, callback);
// }

// // ##############################################################
// // CONTROLLER FUNCTION FOR DELETE USER BY ID
// // ##############################################################
// module.exports.deleteUserById = (req, res, next) => {
//     const data = {
//         user_id: req.params.user_id
//     }

//     const callback = (error, results, fields) => {
//         if (error) {
//             console.error("Error deleteUserById:", error);
//             res.status(500).json(error);
//         } else {
//             if (results.affectedRows == 0) {
//                 res.status(404).json({
//                     message: "User not found"
//                 });
//             }
//             else res.status(204).send(); // 204 No Content            
//         }
//     }

//     model.deleteById(data, callback);
// }