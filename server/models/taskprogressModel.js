// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE INSERT OPERATION FOR TASK PROGRESS
// ##############################################################
module.exports.insertSingle = (data, callback) => 
{
    const SQLSTATEMENT = `
    INSERT INTO TaskProgress (user_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?);
    UPDATE User
    SET total_points = total_points + (SELECT points FROM Task WHERE task_id = ?)
    WHERE user_id = ?;
    `;
    const VALUES = [data.user_id, data.task_id, data.completion_date, data.notes, data.task_id, data.user_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
}

module.exports.chkUser = (data, callback) => 
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;    
    `;
    const VALUES = [data.user_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.chkTask = (data, callback) => 
{
    const SQLSTATMENT = `
    SELECT * FROM Task
    WHERE task_id = ?;
    `;
    const VALUES = [data.task_id];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// // ##############################################################
// // DEFINE SELECT BY ID OPERATIONS FOR TASK PROGRESS
// // ##############################################################
// module.exports.selectById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     SELECT * FROM TaskProgress
//     WHERE progress_id = ?;
//     `;
// const VALUES = [data.progress_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }

// // ##############################################################
// // DEFINE UPDATE BY ID OPERATIONS FOR TASK PROGRESS
// // ##############################################################
// module.exports.updateById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     UPDATE TaskProgress 
//     SET notes = ?
//     WHERE progress_id = ?;
//     `;
// const VALUES = [data.notes, data.progress_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }

// module.exports.getData = (data, callback) => 
// {
//     const SQLSTATEMENT = `
//     SELECT * FROM TaskProgress
//     WHERE user_id = ? AND task_id = ? OR progress_id = ?
//     `;
// const VALUES = [data.user_id, data.task_id, data.progress_id];

// pool.query(SQLSTATEMENT, VALUES, callback);
// }

// // ##############################################################
// // DEFINE DELETE BY ID OPERATIONS FOR TASK PROGRESS
// // ##############################################################
// module.exports.deleteById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     DELETE FROM TaskProgress 
//     WHERE progress_id = ?;

//     ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
//     `;
// const VALUES = [data.progress_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }