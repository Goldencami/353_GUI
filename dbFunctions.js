const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect((err)=> {
    if(err) {
        throw err
    }
    console.log("MySQL connected successfully.")
});

// query person insert
async function insertPerson(attributes) {
    console.log(`here are the attributes: ${attributes}`)
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `INSERT INTO person(first_name, last_name, date_of_birth, medic_no, phone_no, address, postal_code, email, SSN)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);`;

            db.query(query, attributes, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        return {
            id: response.insertId,
            first_name: attributes[0],
            last_name: attributes[1],
            date_of_birth: attributes[2],
            medic_no: attributes[3],
            phone_no: attributes[4],
            address: attributes[5],
            postal_code: attributes[6],
            email: attributes[7],
            SSN: attributes[8]
        };
    } catch (err) {
        console.log(err)
        throw err;
    }
}

// query person
async function getAllPersons() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT id, first_name, last_name, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth, medic_no, 
                            phone_no, address, postal_code, email, SSN FROM person`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 1 insert
async function insertLocation(attributes) {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `INSERT INTO location(name, address, postal_code, phone_no, web_address, location_type, capacity)
                            VALUES (?, ?, ?, ?, ?, ?, ?);`;

            db.query(query, attributes, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        return {
            location_id: response.insertId,
            name: attributes[0],
            address: attributes[1],
            postal_code: attributes[2],
            phone_no: attributes[3],
            web_address: attributes[4],
            location_type: attributes[5],
            capacity: attributes[6]
        };
    } catch (err) {
        console.log(err)
        throw err;
    }
}

// query 1 delete
async function deleteLocation(locationId) {
    let location_id = parseInt(locationId);
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `DELETE FROM location WHERE location_id = ?`;
            
            db.query(query, [location_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 1 update
async function updateLocation(newValue, locationId, columnName) {
    let location_id = parseInt(locationId);
    if(columnName === 'location_id' || columnName === 'capacity') {
        newValue = parseInt(newValue);
    }
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `UPDATE location SET ?? = ? WHERE location_id = ?`;
            
            db.query(query, [columnName, newValue, location_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 1
async function getAllLocations() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT * FROM location`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 2 insert
async function insertPersonnel(attributes) {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `INSERT INTO personnel(personnel_id, work_role, mandate, is_president, is_manager)
                            VALUES (?, ?, ?, ?, ?);`;

            db.query(query, attributes, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        return {
            personnel_id: attributes[0],
            work_role: attributes[1],
            mandage: attributes[2],
            is_president: attributes[3],
            is_manager: attributes[4]
        };
    } catch (err) {
        console.log(err)
        throw err;
    }
}

// query 2 delete
async function deletePersonnel(personnelId) {
    let personnel_id = parseInt(personnelId);
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `DELETE FROM personnel WHERE personnel_id = ?`;
            
            db.query(query, [personnel_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 2 update
async function updatePersonnel(newValue, personnelId, columnName) {
    let personnel_id = parseInt(personnelId);
    if(columnName === 'is_president' || columnName === 'is_manager') {
        newValue = parseInt(newValue);
    }

    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `UPDATE personnel SET ?? = ? WHERE personnel_id = ?`;
            
            db.query(query, [columnName, newValue, personnel_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 2
async function getAllPersonnel() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT * FROM personnel`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 3 insert
async function insertFamily(attributes) {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `INSERT INTO family_member(family_id)
                            VALUES (?);`;

            db.query(query, attributes, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        return {
            family_id: attributes[0]
        };
    } catch (err) {
        console.log(err)
        throw err;
    }
}

// query 3 delete
async function deleteFamily(familyId) {
    let family_id = parseInt(familyId);
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `DELETE FROM family_member WHERE family_id = ?`;
            
            db.query(query, [family_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 3 update
async function updateFamily(newValue, familyId, columnName) {
    let family_id = parseInt(familyId);

    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `UPDATE person SET ?? = ? WHERE id = ?`;
            
            db.query(query, [columnName, newValue, family_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 3
async function getAllFamily() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT family_id, first_name, last_name, DATE_FORMAT(date_of_birth, '%Y-%m-%d') AS date_of_birth, 
                            medic_no, phone_no, address, postal_code, email, SSN 
                            FROM family_member
                            JOIN person ON family_member.family_id = person.id`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 4 insert
async function insertClubMember(attributes) {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `INSERT INTO club_member(member_id, family_id1, family_id2, location_id, gender, age, active)
                            VALUES (?, ?, ?, ?, ?, ?, ?);`;

            db.query(query, attributes, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        return {
            member_id: attributes[0],
            family_id1: attributes[1],
            family_id2: attributes[2],
            location_id: attributes[3],
            gender: attributes[4],
            age: attributes[5],
            active: attributes[6]
        };
    } catch (err) {
        console.log(err)
        throw err;
    }
}

// query 4 delete
async function deleteClubMember(memberId) {
    let member_id = parseInt(memberId);
    
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `DELETE FROM club_member WHERE member_id = ?`;
            
            db.query(query, [member_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 4 update
async function updateClubMember(newValue, memberId, columnName) {
    let member_id = parseInt(memberId);
    if(columnName === 'family_id1' || columnName === 'family_id2' || columnName === 'location_id' || columnName === 'member_id') {
        newValue = parseInt(newValue);
    }

    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `UPDATE club_member SET ?? = ? WHERE member_id = ?`;
            
            db.query(query, [columnName, newValue, member_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 4
async function getAllClubMembers() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT * FROM club_member`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 5 insert
async function insertTeamFormation(attributes) {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `INSERT INTO team_formation(formation_type, team_id1, team_id2, team1_score, team2_score, winner)
                            VALUES (?, ?, ?, ?, ?, ?);`;

            db.query(query, attributes, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        return {
            formation_id: response.insertId,
            formation_type: attributes[0],
            team_id1: attributes[1],
            team_id2: attributes[2],
            team1_score: attributes[3],
            team2_score: attributes[4],
            winner: attributes[5]
        };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

// query 5 delete
async function deleteTeamFormation(formationId) {
    let formation_id = parseInt(formationId);
    
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `DELETE FROM team_formation WHERE formation_id = ?`;
            
            db.query(query, [formation_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 5 update
async function updateTeamFormation(newValue, formationId, columnName) {
    let formation_id = parseInt(formationId);
    if(columnName === 'formation_id' || columnName === 'team_id1' || columnName === 'team_id2' || columnName === 'team1_score' || columnName === 'team2_score' || columnName === 'winner') {
        newValue = parseInt(newValue);
    }

    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `UPDATE team_formation SET ?? = ? WHERE formation_id = ?`;
            
            db.query(query, [columnName, newValue, formation_id], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res.affectedRows);
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

// query 5
async function getAllTeamFormation() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT * FROM team_formation`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 6

// query 7
async function query7() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT location.address, location.city, location.province,
                            location.postal_code, location.phone_no, location.web_address,
                            location.location_type, location.capacity,
                            person.first_name, person.last_name,
                            COUNT(member_id) AS no_members
                            FROM operates
                            JOIN location ON location.location_id = operates.location_id 
                            JOIN personnel ON personnel.personnel_id = operates.personnel_id
                            JOIN person ON person.id = operates.personnel_id
                            JOIN registered ON registered.location_id = location.location_id 
                            WHERE registered.end_date is null AND operates.end_date is null AND is_manager = 1 
                            GROUP BY location.location_id
                            ORDER BY location.province, location.city ASC`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 10
async function query10() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT member_id, person.first_name, person.last_name
                            FROM registered 
                            JOIN person ON person.id = registered.member_id
                            GROUP BY member_id
                            HAVING COUNT(register_date) >= 4 AND 
                            DATEDIFF(CURDATE(),MIN(register_date) ) <= 730 AND 
                            COUNT(DISTINCT(location_id)) >= 4
                            ORDER BY member_id ASC`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 12
async function query12() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT registered.member_id, first_name, last_name, club_member.age, 
                            person.phone_no, person.email, location.name
                            FROM registered
                            JOIN person ON person.id = registered.member_id
                            JOIN club_member ON club_member.member_id = registered.member_id
                            JOIN location ON location.location_id = registered.location_id
                            WHERE registered.member_id NOT IN (SELECT member_id FROM plays_in) AND 
                            registered.currently_playing = TRUE`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 13
async function query13() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT plays_in.member_id, first_name, last_name, club_member.age, person.phone_no, email, location.name
                            FROM plays_in
                            JOIN club_member ON club_member.member_id = plays_in.member_id
                            JOIN person ON person.id = plays_in.member_id
                            JOIN registered ON registered.member_id = plays_in.member_id 
                            JOIN location ON location.location_id = registered.location_id
                            WHERE registered.currently_playing = TRUE 
                            GROUP BY member_id
                            HAVING COUNT(DISTINCT(player_role)) = 1 AND MAX(player_role = 'Goalkeeper')
                            ORDER BY location.name, member_id ASC`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 14
async function query14() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT plays_in.member_id, first_name, last_name, club_member.age, person.phone_no, email, location.name
                            FROM plays_in 
                            JOIN club_member ON club_member.member_id = plays_in.member_id
                            JOIN person ON person.id = plays_in.member_id
                            JOIN registered ON registered.member_id = plays_in.member_id 
                            JOIN location ON location.location_id = registered.location_id
                            WHERE registered.currently_playing = TRUE 
                            GROUP BY member_id
                            HAVING COUNT(DISTINCT(player_role)) = 4
                            ORDER BY location.name, member_id ASC`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 15
async function query15(locationId) { // TO CHANGE
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT first_name, last_name, person.phone_no FROM location
                            JOIN registered ON location.location_id = registered.location_id
                            JOIN associated ON registered.member_id = associated.member_id
                            JOIN person ON associated.family_id = person.id
                            JOIN personnel ON person.id = personnel.personnel_id
                            WHERE location.location_id = ? AND registered.end_date IS NULL
                                AND work_role = 'trainer'`;
            
            db.query(query, [locationId], (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 16
async function query16() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT registered.member_id, first_name, last_name, club_member.age, person.phone_no, person.email, location.name
                            FROM registered
                            JOIN club_member ON club_member.member_id = registered.member_id
                            JOIN person ON person.id = registered.member_id
                            JOIN plays_in ON registered.member_id = plays_in.member_id
                            JOIN team_formation ON team_formation.formation_id = plays_in.formation_id 
                            JOIN location ON location.location_id = registered.location_id
                            WHERE registered.currently_playing = TRUE AND registered.team_id in (SELECT winner FROM team_formation)
                            GROUP BY registered.member_id 
                            ORDER BY location.name, plays_in.member_id ASC`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 17
async function query17() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT first_name, last_name, DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date
                            FROM operates 
                            JOIN personnel ON personnel.personnel_id = operates.personnel_id
                            JOIN person ON person.ID = operates.personnel_id
                            WHERE personnel.is_president = TRUE
                            ORDER BY first_name, last_name, operates.start_date`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

// query 18
async function query18() {
    try {
        const response = await new Promise((resolve, reject) => { //if error in query it will reject it and go into catch block
            const query = `SELECT first_name, last_name, person.phone_no, person.email, location.name, work_role
                            FROM personnel 
                            JOIN operates ON operates.personnel_id = personnel.personnel_id
                            JOIN location ON location.location_id = operates.location_id
                            JOIN person ON person.id = personnel.personnel_id
                            WHERE personnel.personnel_id NOT IN (SELECT family_id FROM family_member) AND operates.end_date IS NULL
                                AND work_role = 'Volunteer'
                            ORDER BY location.name, work_role, first_name, last_name ASC`;
            
            db.query(query, (err, res) => {
                if (err) reject(new Error(err.message));
                resolve(res);
            })
        });

        console.log(response);
        return response;
    } catch (error) {
        console.log(error)
        throw err;
    }
}

module.exports = {
    insertPerson,
    getAllPersons,
    insertLocation,
    deleteLocation,
    updateLocation,
    getAllLocations,
    insertPersonnel,
    deletePersonnel,
    updatePersonnel,
    getAllPersonnel,
    insertFamily,
    deleteFamily,
    updateFamily,
    getAllFamily,
    insertClubMember,
    deleteClubMember,
    updateClubMember,
    getAllClubMembers,
    insertTeamFormation,
    deleteTeamFormation,
    updateTeamFormation,
    getAllTeamFormation,
    query7,
    query10,
    query12,
    query13,
    query14,
    query15,
    query16,
    query17,
    query18
};