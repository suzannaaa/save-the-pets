// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// SELECT OPERATION FOR USER
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User;
    `;

pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// SELECT PET USER REL OPERATIONS FOR USER
// ##############################################################
// module.exports.selectPlayerUserRel = (data, callback) =>
// {
//     const SQLSTATMENT = `
//         SELECT
//             PlayerUserRel.user_id,
//             PlayerUserRel.player_id,
//             User.username,
//             Player.name AS "character_name",
//             Player.level AS "character_level",
//             Player.created_on AS "char_created_on",
//             User.created_on AS "user_created_on"
//         FROM
//             PlayerUserRel
//             INNER JOIN User ON (PlayerUserRel.user_id = User.id)
//             INNER JOIN Player ON (PlayerUserRel.user_id = User.id)
//         WHERE
//             (PlayerUserRel.user_id = ? AND PlayerUserRel.player_id = ?);
//     `;
//     const VALUES = [data.user_id, data.player_id];
//     pool.query(SQLSTATMENT, VALUES, callback);
// }

// ##############################################################
// SELECT BY ID OPERATIONS FOR USER
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM User
    WHERE user_id = ?;
    `;
const VALUES = [data.user_id];

pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// SELECT BY USERNAME AND PASSWORD OPERATIONS FOR USER
// ##############################################################
module.exports.selectUserByUsernameAndPassword = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id, username, password FROM User
        WHERE username = ?;
    `;
    const VALUES = [data.username];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// SELECT BY USERNAME OR EMAIL OPERATIONS FOR USER
// ##############################################################
module.exports.chkExist = (data, callback) =>
{
    const SQLSTATMENT = `
        SELECT user_id FROM User
        WHERE username = ? OR email = ?;
    `;
    const VALUES = [data.username, data.email];
    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// INSERT OPERATION FOR USER
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO User (username, email, password)
    VALUES (?, ?, ?);
    `;
const VALUES = [data.username, data.email, data.password];

pool.query(SQLSTATMENT, VALUES, callback);
}

// // ##############################################################
// // UPDATE BY ID OPERATIONS FOR USER
// // ##############################################################
// module.exports.updateById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     UPDATE User 
//     SET username = ?, email = ?, password = ?
//     WHERE user_id = ?;
//     `;
// const VALUES = [data.username, data.email, data.password, data.user_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }

// // ##############################################################
// // DELETE BY ID OPERATIONS FOR USER
// // ##############################################################
// module.exports.deleteById = (data, callback) =>
// {
//     const SQLSTATMENT = `
//     DELETE FROM User 
//     WHERE user_id = ?;

//     ALTER TABLE User AUTO_INCREMENT = 1;
//     `;
// const VALUES = [data.user_id];

// pool.query(SQLSTATMENT, VALUES, callback);
// }