// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR TASK
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Task (title, description, points)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.title, data.description, data.points];

pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR TASK
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task;
    `;

pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR TASK
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
const VALUES = [data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE UPDATE BY ID OPERATIONS FOR TASK
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Task 
    SET title = ?, description = ?, points = ?
    WHERE task_id = ?;
    `;
const VALUES = [data.title, data.description, data.points, data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE BY ID OPERATIONS FOR TASK
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Task 
    WHERE task_id = ?;

    ALTER TABLE Task AUTO_INCREMENT = 1;
    `;
const VALUES = [data.task_id];

pool.query(SQLSTATMENT, VALUES, callback);
}