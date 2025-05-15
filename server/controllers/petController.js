// Name: Tan Shu Er, Suzanna
// Class: DIT/FT/1B/03
// Admission number: P2323415


// ##############################################################
// REQUIRE MODULES
// ##############################################################
const model = require("../models/petModel");

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ ALL PET
// ##############################################################
module.exports.readAllPet = (req, res, next) =>
{
    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readAllPet:", error);
            res.status(500).json(error);
        } 
        else res.status(200).json(results);
    }

    model.selectAll(callback);
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR CREATE PET
// ##############################################################
module.exports.createPet = (req, res, next) =>
{
    console.log("res.locals.user_id:", res.locals.user_id);
    if(res.locals.user_id == undefined)
    {
        res.status(400).json({
            message: "Error: owner_id is undefined"
        });
        return;
    }
    else
    {
        console.log("res.locals.pet.pet_num:", res.locals.pet.pet_num);
        const data = {
            owner_id: res.locals.user_id,
            pet_num: res.locals.pet.pet_num,
            name: res.locals.pet.pet_name,
            rarity: res.locals.pet.pet_rarity
        }
        console.log(data);
        const callback = (error, results, fields) => {
            if (error) {
                console.error("Error createNewPet:", error);
                res.status(500).send(error);
            } else {
                console.log(results);
                req.params.id = results.insertId;
                next();
            }
        }

        model.insertSingle(data, callback);
    }
}

// ##############################################################
// DEFINE CONTROLLER FUNCTION FOR READ PET BY ID
// ##############################################################
module.exports.readPetById = (req, res, next) =>
{
    const data = {
        id: res.locals.user_id
    }

    const callback = (error, results, fields) => {
        if (error) {
            console.error("Error readPetById:", error);
            res.status(500).json(error);
        } else {
            if(results.length == 0) 
            {
                res.status(404).json({
                    message: "Pet not found"
                });
            }
            else {
                console.log(results);
                res.status(200).json(results);
            }
        }
    }

    model.selectById(data, callback);
}