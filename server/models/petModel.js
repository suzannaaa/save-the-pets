// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const pool = require('../services/db');

// ##############################################################
// DEFINE SELECT ALL OPERATIONS FOR PET
// ##############################################################
module.exports.selectAll = (callback) =>
{
    const SQLSTATMENT = `
    SELECT * FROM Pet;
    `;

pool.query(SQLSTATMENT, callback);
}

// ##############################################################
// DEFINE INSERT OPERATION FOR PET
// ##############################################################
module.exports.insertSingle = (data, callback) => 
{
    const SQLSTATMENT = `
    INSERT INTO Pet (owner_id, pet_num, name, rarity)
    VALUES (?, ?, ?, ?);
    `;
    const VALUES = [data.owner_id, data.pet_num, data.name, data.rarity];

    pool.query(SQLSTATMENT, VALUES, callback);
}

// ##############################################################
// DEFINE SELECT BY ID OPERATIONS FOR PET
// ##############################################################
module.exports.selectById = (data, callback) => 
{
    const SQLSTATMENT = `
    SELECT * FROM Pet
    WHERE owner_id = ?;
    `;
    const VALUES = [data.id];

    pool.query(SQLSTATMENT, VALUES, callback);
}