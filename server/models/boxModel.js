//////////////////////////////////////////////////////
// REQUIRE MODULES
//////////////////////////////////////////////////////
const pool = require('../services/db');

//////////////////////////////////////////////////////
// SELECT ALL PETSHOP
//////////////////////////////////////////////////////
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Box;
    `;

pool.query(SQLSTATMENT, callback);
}

//////////////////////////////////////////////////////
// SELECT 1 ROW BOX
//////////////////////////////////////////////////////
// generates a random pet (gives a random no.)
// select from box by id
// order by random
// only get 1 row of data
module.exports.selectRandomPet = (data, callback) => 
{
    const SQLSTATEMENT = `
        SELECT * FROM Box
        WHERE box_id = ?
        ORDER BY RAND()
        LIMIT 1;    
    `;
    const VALUES = [data.box_id];

    pool.query(SQLSTATEMENT, VALUES, callback);
};

// ##############################################################
// DEFINE INSERT OPERATION FOR BOX
// ##############################################################
module.exports.checkPoints = (data, callback) => {
    const SQLSTATMENT = `
    SELECT total_points - (SELECT price FROM PetShop WHERE box_id = ?) AS new_points
    FROM User
    WHERE user_id = ?;
    `;
    const VALUES = [data.box_id, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

module.exports.updatePoints = (data, callback) => {
    const SQLSTATMENT = `
    UPDATE User
    SET total_points = ?
    WHERE user_id = ?;
    `;
    const VALUES = [data.new_points, data.user_id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// // ##############################################################
// // DEFINE INSERT OPERATION FOR BOX
// // ##############################################################
// module.exports.insertSingle = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     INSERT INTO Task (title, description, points)
//     VALUES (?, ?, ?);
//     `;
// const VALUES = [data.title, data.description, data.points];

// pool.query(SQLSTATMENT, VALUES, callback);
// }

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR BOX
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Box
    WHERE box_id = ?;
    `;
const VALUES = [data.box_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// // ##############################################################
// // DEFINE UPDATE BY ID OPERATIONS FOR BOX
// // ##############################################################
// module.exports.updateById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     UPDATE Task 
//     SET title = ?, description = ?, points = ?
//     WHERE task_id = ?;
//     `;
// const VALUES = [data.title, data.description, data.points, data.task_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }

// // ##############################################################
// // DEFINE DELETE BY ID OPERATIONS FOR BOX
// // ##############################################################
// module.exports.deleteById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     DELETE FROM Task 
//     WHERE task_id = ?;

//     ALTER TABLE Task AUTO_INCREMENT = 1;
//     `;
// const VALUES = [data.task_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }