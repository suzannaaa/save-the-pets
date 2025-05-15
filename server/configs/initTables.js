const pool = require("../services/db");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error creating tables:", error);
    } else {
        console.log("Tables created successfully");
    }
    process.exit();
}

bcrypt.hash('1234', saltRounds, (error, hash) => {
    if (error) {
        console.error("Error hashing password:", error);
    } else {
        console.log("Hashed password:", hash);

        const SQLSTATEMENT = `
            DROP TABLE IF EXISTS User, Task, TaskProgress, Messages, Pet, Box, PetShop;

            CREATE TABLE User (
                user_id INT PRIMARY KEY AUTO_INCREMENT,
                username TEXT,
                email TEXT,
                password TEXT NOT NULL,
                total_points INT DEFAULT 0,
                pet_name TEXT
            );

            INSERT INTO User (username, email, password) VALUES
            ('admin', 'a@a.com', '${hash}');
            
            CREATE TABLE Task (
                task_id INT PRIMARY KEY AUTO_INCREMENT,
                title TEXT,
                description TEXT,
                points INT
            );

            INSERT INTO Task VALUES
            (1,'Plant a Tree','Plant a tree in your neighbourhood or a designated green area.', 50),
            (2,'Use Public Transportation','Use public transportation or carpool instead of driving alone.', 30),
            (3,'Reduce Plastic Usage ','Commit to using reusable bags and containers.', 40),
            (4,'Energy Conservation','Turn off lights and appliances when not in use.', 25),
            (5,'Composting ','Start composting kitchen scraps to create natural fertilizer.', 35);

            CREATE TABLE TaskProgress (
                progress_id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                task_id INT NOT NULL,
                completion_date TIMESTAMP,
                notes TEXT,
                FOREIGN KEY (user_id) REFERENCES User(user_id) ON DELETE CASCADE,
                FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE
                );

            CREATE TABLE Messages (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username TEXT,
                message_text TEXT NOT NULL,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES User(user_id)
            );

            CREATE TABLE Pet (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name TEXT NOT NULL,
                owner_id INT NOT NULL,
                pet_num INT NOT NULL,
                rarity TEXT NOT NULL,
                FOREIGN KEY (owner_id) REFERENCES User(user_id)
            );

            CREATE TABLE PetShop (
                box_id INT PRIMARY KEY AUTO_INCREMENT,
                name TEXT NOT NULL,
                price INT NOT NULL
            );

            CREATE TABLE Box (
                pet_num INT PRIMARY KEY AUTO_INCREMENT,
                box_id INT NOT NULL,
                pet_name TEXT NOT NULL,
                pet_rarity TEXT NOT NULL,
                FOREIGN KEY (box_id) REFERENCES PetShop(box_id)
            );

            INSERT INTO PetShop VALUES
                (1, 'Common Box', 300),
                (2, 'Rare Box', 500),
                (3, 'Epic Box', 1000);

            INSERT INTO Box VALUES
                (6, 1, 'Bloom Bird', 'Common'),
                (7, 1, 'Starfish Saviour', 'Epic'),
                (8, 1, 'Bio Bunny', 'Rare'),
                (9, 1, 'Climate Cow', 'Common'),
                (10, 1, 'Clean Chick', 'Rare'),
                (1, 2, 'Penguin Protector', 'Legendary'),
                (2, 2, 'Caretaker Clownfish', 'Rare'),
                (3, 2, 'Turtle Guardian', 'Epic'),
                (4, 2, 'Litter-less Lizard', 'Rare'),
                (5, 2, 'Eco-friendly Fox', 'Common'),
                (11, 3, 'Sustainable Snake', 'Rare'),
                (12, 3, 'Dragon Defender', 'Legendary'),
                (13, 3, 'Earth-Worm', 'Legendary'),
                (14, 3, 'Conservation Cat', 'Epic'),
                (15, 3, 'Diversity Dog', 'Epic');
        `;

        pool.query(SQLSTATEMENT, callback);
    }
});