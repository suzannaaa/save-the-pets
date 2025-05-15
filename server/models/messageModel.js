// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR MESSAGE
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages;
    `;

    pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR MESSAGE
// ##############################################################
module.exports.selectById = (data, callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Messages
    WHERE user_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE INSERT OPERATION FOR MESSAGE
// ##############################################################
module.exports.insertSingle = (data, callback) =>
{
    const SQLSTATMENT = `
    INSERT INTO Messages (message_text, user_id, username)
    VALUES (?, ?, ?);
    `;
    const VALUES = [data.message_text, data.user_id, data.username];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE UPDATE BY ID OPERATIONS FOR MESSAGE
// ##############################################################
module.exports.updateById = (data, callback) =>
{
    const SQLSTATMENT = `
    UPDATE Messages 
    SET message_text = ?, user_id = ?
    WHERE id = ?;
    `;
    const VALUES = [data.message_text, data.user_id, data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE DELETE BY ID OPERATIONS FOR MESSAGE
// ##############################################################
module.exports.deleteById = (data, callback) =>
{
    const SQLSTATMENT = `
    DELETE FROM Messages 
    WHERE id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}
