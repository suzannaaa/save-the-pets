// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/tasksModel.js");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE TASK
// ##############################################################
module.exports.createNewTask = (req, res, next) =>
{
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error createNewTask:", error);
            res.status(500).json(error);
        } else {
            // console.log(results);
            res.status(201).json({
                task_id: results.insertId,
                title: data.title,
                description: data.description,
                points: data.points
            });
        }
    }

    model.insertSingle(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL TASKS
// ##############################################################
module.exports.readAllTasks = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllTasks:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ TASK BY ID
// ##############################################################
module.exports.readTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(200).json(results[0]);
        }
    }

    model.selectById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR UPDATE TASK BY ID
// ##############################################################
module.exports.updateTaskById = (req, res, next) =>
{
    if (req.body.title == undefined || req.body.description == undefined || req.body.points == undefined) {
        res.status(400).json({
            message: "Missing required data."
        });
        return;
    }

    const data = {
        task_id: req.params.task_id,
        title: req.body.title,
        description: req.body.description,
        points: req.body.points
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error updateTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results.affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else {
                console.log(data);
                res.status(200).json({
                    task_id: data.task_id,
                    title: data.title,
                    description: data.description,
                    points: data.points
                });
            }
        }
    }

    model.updateById(data, callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR DELETE TASK BY ID
// ##############################################################
module.exports.deleteTaskById = (req, res, next) =>
{
    const data = {
        task_id: req.params.task_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error deleteTaskById:", error);
            res.status(500).json(error);
        } else {
            if(results[0].affectedRows == 0) 
            {
                res.status(404).json({
                    message: "Task not found"
                });
            }
            else res.status(204).send(); // 204 No Content            
        }
    }

    model.deleteById(data, callback);
}