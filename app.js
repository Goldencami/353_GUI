const express = require('express');
const app = express();
const dbFunctions = require('./dbFunctions');
const cors = require('cors');

app.use(cors()); // when we'll have api calls, it won't block it and be able to send data
app.use(express.json()); // be able to send info in json format
app.use(express.urlencoded({ extended : false }));


// CREATE
app.post('/insertPerson', (req, res) => {
    console.log(req.body)
    const { attributes } = req.body;
    const result = dbFunctions.insertPerson(attributes);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.post('/insertLocation', (req, res) => {
    console.log(req.body)
    const { attributes } = req.body;
    attributes[6] = parseInt(attributes[6]);
    if(isNaN(attributes[6])) {
        attributes[6] = null;
    }

    const result = dbFunctions.insertLocation(attributes);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.post('/insertPersonnel', (req, res) => {
    console.log(req.body)
    const { attributes } = req.body;
    attributes[0] = parseInt(attributes[0]);
    attributes[3] = parseInt(attributes[3]);
    attributes[4] = parseInt(attributes[4]);
    if(isNaN(attributes[0])) {
        attributes[0] = null;
    }
    if(isNaN(attributes[3])) {
        attributes[3] = null;
    }
    if(isNaN(attributes[4])) {
        attributes[4] = null;
    }

    const result = dbFunctions.insertPersonnel(attributes);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.post('/insertFamily', (req, res) => {
    console.log(req.body)
    const { attributes } = req.body;
    attributes[0] = parseInt(attributes[0]);
    if(isNaN(attributes[0])) {
        attributes[0] = null;
    }

    const result = dbFunctions.insertFamily(attributes);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.post('/insertClubMember', (req, res) => {
    console.log(req.body)
    const { attributes } = req.body;
    attributes[0] = parseInt(attributes[0]);
    attributes[1] = parseInt(attributes[1]);
    attributes[2] = parseInt(attributes[2]);
    attributes[3] = parseInt(attributes[3]);
    attributes[5] = parseInt(attributes[5]);
    attributes[6] = parseInt(attributes[6]);
    if(isNaN(attributes[0])) {
        attributes[0] = null;
    }
    if(isNaN(attributes[1])) {
        attributes[1] = null;
    }
    if(isNaN(attributes[2])) {
        attributes[2] = null;
    }
    if(isNaN(attributes[3])) {
        attributes[3] = null;
    }
    if(isNaN(attributes[5])) {
        attributes[5] = null;
    }
    if(isNaN(attributes[6])) {
        attributes[6] = null;
    }

    const result = dbFunctions.insertClubMember(attributes);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.post('/insertTeamFormation', (req, res) => {
    console.log(req.body)
    const { attributes } = req.body;
    attributes[1] = parseInt(attributes[1]);
    attributes[2] = parseInt(attributes[2]);
    attributes[3] = parseInt(attributes[3]);
    attributes[4] = parseInt(attributes[4]);
    attributes[5] = parseInt(attributes[5]);
    if(isNaN(attributes[1])) {
        attributes[1] = null;
    }
    if(isNaN(attributes[2])) {
        attributes[2] = null;
    }
    if(isNaN(attributes[3])) {
        attributes[3] = null;
    }
    if(isNaN(attributes[4])) {
        attributes[4] = null;
    }
    if(isNaN(attributes[5])) [
        attributes[5] = null
    ]
    
    const result = dbFunctions.insertTeamFormation(attributes);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

// app.post('/assignTeamFormation', (req, res) => {

// });

// READ
app.get('/getAllPersons', (req, res) => {
    const result = dbFunctions.getAllPersons();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getAllLocations', (req, res) => { //q1
    const result = dbFunctions.getAllLocations();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getAllPersonnel', (req, res) => { //q2
    const result = dbFunctions.getAllPersonnel();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getAllFamily', (req, res) => { //q3
    const result = dbFunctions.getAllFamily();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getAllClubMembers', (req, res) => { //q4
    const result = dbFunctions.getAllClubMembers();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getAllTeamsFormation', (req, res) => { //q5
    const result = dbFunctions.getAllTeamFormation();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ7', (req, res) => { //q7
    const result = dbFunctions.query7();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ8/:FamilyId', (req, res) => { //q8
    const FamilyId = parseInt(req.params.FamilyId);
    console.log(req.params)
    if (isNaN(FamilyId)) {
        return res.status(400).json({ error: 'Invalid family ID' });
    }
    const result = dbFunctions.query8(FamilyId);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ9/:address/:date', (req, res) => { //q9
    console.log(req.params)
    const result = dbFunctions.query9(req.params.address, req.params.date);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ10', (req, res) => { //q10
    const result = dbFunctions.query10();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ11/:date1/:date2', (req, res) => { //q11
    //2023-08-09; 2024-09-05
    console.log(req.params)
    const result = dbFunctions.query11(req.params.date1, req.params.date2);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ12', (req, res) => { //q12
    const result = dbFunctions.query12();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ13', (req, res) => { //q13
    const result = dbFunctions.query13();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ14', (req, res) => { //q14
    const result = dbFunctions.query14();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ15/:address', (req, res) => { //q15
    console.log(req.params)

    const result = dbFunctions.query15(req.params.address);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ16', (req, res) => { //q16
    const result = dbFunctions.query16();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ17', (req, res) => { //q17
    const result = dbFunctions.query17();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.get('/getQ18', (req, res) => { //q18
    const result = dbFunctions.query18();

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

// UPDATE
app.patch('/updateLocation', (req, res) => {
    console.log(req.body);
    const { newValue, locationId, columnName } = req.body;
    const result = dbFunctions.updateLocation(newValue, locationId, columnName);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.patch('/updatePersonnel', (req, res) => {
    console.log(req.body);
    const { newValue, personnelId, columnName } = req.body;
    const result = dbFunctions.updatePersonnel(newValue, personnelId, columnName);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.patch('/updateFamily', (req, res) => {
    console.log(req.body);
    const { newValue, familyId } = req.body;
    const result = dbFunctions.updateFamily(newValue, familyId);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.patch('/updateClubMember', (req, res) => {
    console.log(req.body);
    const { newValue, memberId, columnName } = req.body;
    const result = dbFunctions.updateClubMember(newValue, memberId, columnName);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.patch('/updateFormation', (req, res) => {
    console.log(req.body);
    const { newValue, memberId, columnName } = req.body;
    const result = dbFunctions.updateTeamFormation(newValue, memberId, columnName);

    result
    .then(data => res.json({ data : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

// app.patch('/updateAssignFormation', (req, res) => {
//     console.log(req.body);
//     const { newValue, memberId, columnName } = req.body;
//     const result = dbFunctions.updatePersonnel(newValue, memberId, columnName);

//     result
//     .then(data => res.json({ data : data }))
//     .catch(err => console.log(err))
// });

// DELETE
app.delete('/deleteLocation/:locationId', (req, res) => {
    console.log(req.params)
    const { locationId } = req.params;
    const result = dbFunctions.deleteLocation(locationId);

    result
    .then(data => res.json({ success : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.delete('/deletePersonnel/:personnelId', (req, res) => {
    console.log(req.params)
    const { personnelId } = req.params;
    const result = dbFunctions.deletePersonnel(personnelId);

    result
    .then(data => res.json({ success : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.delete('/deleteFamily/:familyId', (req, res) => {
    console.log(req.params)
    const { familyId } = req.params;
    const result = dbFunctions.deleteFamily(familyId);

    result
    .then(data => res.json({ success : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.delete('/deleteClubMember/:memberId', (req, res) => {
    console.log(req.params)
    const { memberId } = req.params;
    const result = dbFunctions.deleteClubMember(memberId);

    result
    .then(data => res.json({ success : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

app.delete('/deleteTeamForm/:formationId', (req, res) => {
    console.log(req.params)
    const { formationId } = req.params;
    const result = dbFunctions.deleteTeamFormation(formationId);

    result
    .then(data => res.json({ success : data }))
    .catch(err => res.status(500).json({ error: err.message }))
});

// app.delete('/deleteFormationAssign/:assignId', (req, res) => {
//     console.log(req.params)
//     const { assignId } = req.params;
//     // const result = dbFunctions.deletePersonnel(assignId);

//     // result
//     // .then(data => res.json({ success : data }))
//     // .catch(err => console.log(err))
// });

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 3006');
});