// select table
const tableOutput = document.querySelector('#output-section table tbody');
const tableHead = document.querySelector('#output-section table thead');

// query person display
export function loadAllPersons(data) {
    tableHead.innerHTML = "<th>Person ID</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th><th>Medical Number</th>" +
                            "<th>Phone Number</th><th>Address</th><th>Postal-Code</th><th>Email</th><th>SSN</th>";

    let tableHtml = "";

    data.forEach(function ({id, first_name, last_name, date_of_birth, medic_no, phone_no, address, postal_code, email, SSN}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${date_of_birth}</td>`;
        tableHtml += `<td>${medic_no}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${address}</td>`;
        tableHtml += `<td>${postal_code}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${SSN}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 1 delete
export function deleteLocationRow(locationId) {
    fetch(`http://localhost:3006/deleteLocation/${locationId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => errorPopup(error));

    fetch('http://localhost:3006/getAllLocations')
    .then(response => response.json())
    .then(data => loadAllLocations(data['data']));  
}

// query 1 update
export function updateLocationRow(inputArr, locationId, updType) {
    let req_body = {}
    if(updType === 'name') {
        req_body = {
            newValue: inputArr[0].value,
            locationId: locationId,
            columnName: updType
        };
    }
    else if(updType === 'address') {
        req_body = {
            newValue: inputArr[1].value,
            locationId: locationId,
            columnName: updType
        };
    }
    else if(updType === 'postal_code') {
        req_body = {
            newValue: inputArr[2].value,
            locationId: locationId,
            columnName: updType
        };
    }
    else if(updType === 'phone_no') {
        req_body = {
            newValue: inputArr[3].value,
            locationId: locationId,
            columnName: updType
        };
    }
    else if(updType === 'web_address') {
        req_body = {
            newValue: inputArr[4].value,
            locationId: locationId,
            columnName: updType
        };
    }
    else if(updType === 'capacity') {
        req_body = {
            newValue: parseInt(inputArr[5].value),
            locationId: locationId,
            columnName: updType
        };
    }
    else if(updType === 'location_type') {
        req_body = {
            newValue: inputArr[6].value,
            locationId: locationId,
            columnName: updType
        };
    }

    console.log(req_body)
    fetch('http://localhost:3006/updateLocation', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_body)
    })
    .then(response => response.json())
    .then(data => console.log('Response Data:', data))
    .catch(error => errorPopup(error));
    
}

// query 1 display
export function loadAllLocations(data) {
    tableHead.innerHTML = "<th>Location ID</th><th>Name</th><th>Address</th><th>Postal-Code</th><th>Phone Number</th>" +
                            "<th>Web Address</th><th>Location Type</th><th>Capacity</th><th>Edit</th><th>Delete</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='12'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({location_id, name, address, postal_code, phone_no, web_address, capacity, location_type}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${location_id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${address}</td>`;
        tableHtml += `<td>${postal_code}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${web_address}</td>`;
        tableHtml += `<td>${location_type}</td>`;
        tableHtml += `<td>${capacity}</td>`;
        tableHtml += `<td><button type="button" data-id="${location_id}" class="btn btn-warning locEditBtn">Edit</button></td>`;
        tableHtml += `<td><button type="button" data-id="${location_id}" class="btn btn-danger locDeleteBtn">Delete</button></td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 2 delete
export function deletePersonnelRow(personnelId) {
    fetch(`http://localhost:3006/deletePersonnel/${personnelId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => errorPopup(error));

    fetch('http://localhost:3006/getAllPersonnel')
    .then(response => response.json())
    .then(data => loadAllPersonnel(data['data']));  
}

// query 2 update
export function updatePersonnelRow(inputArr, personnelId, updType) {
    let req_body = {}
    if(updType === 'work_role') {
        req_body = {
            newValue: inputArr[0].value,
            personnelId: personnelId,
            columnName: updType
        };
    }
    else if(updType === 'mandate') {
        req_body = {
            newValue: inputArr[1].value,
            personnelId: personnelId,
            columnName: updType
        };
    }
    else if(updType === 'is_president') {
        req_body = {
            newValue: parseInt(inputArr[2].value),
            personnelId: personnelId,
            columnName: updType
        };
    }
    else if(updType === 'is_manager') {
        req_body = {
            newValue: parseInt(inputArr[3].value),
            personnelId: personnelId,
            columnName: updType
        };
    }

    console.log(req_body)
    fetch('http://localhost:3006/updatePersonnel', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_body)
    })
    .then(response => response.json())
    .then(data => console.log('Response Data:', data))
    .catch(error => errorPopup(error));
}

// query 2 display
export function loadAllPersonnel(data) {
    tableHead.innerHTML = "<th>Personnel ID</th><th>Work Role</th><th>Madate</th><th>Is President</th><th>Is Manager</th><th>Edit</th><th>Delete</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({personnel_id, work_role, mandate, is_president, is_manager}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${personnel_id}</td>`;
        tableHtml += `<td>${work_role}</td>`;
        tableHtml += `<td>${mandate}</td>`;
        tableHtml += `<td>${is_president}</td>`;
        tableHtml += `<td>${is_manager}</td>`;
        tableHtml += `<td><button type="button" data-id="${personnel_id}" class="btn btn-warning personnelEditBtn">Edit</button></td>`;
        tableHtml += `<td><button type="button" data-id="${personnel_id}" class="btn btn-danger personnelDeleteBtn">Delete</button></td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 3 delete
export function deleteFamilyRow(familyId) {
    fetch(`http://localhost:3006/deleteFamily/${familyId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => errorPopup(error));

    fetch('http://localhost:3006/getAllFamily')
    .then(response => response.json())
    .then(data => loadAllFamily(data['data']));  
}

// query 3 update
export function updateFamilyRow(inputArr, familyId, updType) {
    let req_body = {}
    if(updType === 'phone_no') {
        req_body = {
            newValue: inputArr[0].value,
            familyId: familyId,
            columnName: updType
        };
    }
    else if(updType === 'address') {
        req_body = {
            newValue: inputArr[1].value,
            familyId: familyId,
            columnName: updType
        };
    }
    else if(updType === 'postal_code') {
        req_body = {
            newValue: inputArr[3].value,
            familyId: familyId,
            columnName: updType
        };
    }

    console.log(req_body)
    fetch('http://localhost:3006/updateFamily', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_body)
    })
    .then(response => response.json())
    .then(data => console.log('Response Data:', data))
    .catch(error => errorPopup(error));
}

// query 3 display
export function loadAllFamily(data) {
    tableHead.innerHTML = "<th>Family ID</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th><th>Medical number</th>" +
                            "<th>Phone Number</th><th>Address</th><th>Postal-Code</th><th>Email</th><th>SSN</th><th>Edit</th><th>Delete</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='14'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({family_id, first_name, last_name, date_of_birth, medic_no, phone_no, address, postal_code, email, SSN}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${family_id}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${date_of_birth}</td>`;
        tableHtml += `<td>${medic_no}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${address}</td>`;
        tableHtml += `<td>${postal_code}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${SSN}</td>`;
        tableHtml += `<td><button type="button" data-id="${family_id}" class="btn btn-warning famEditBtn">Edit</button></td>`;
        tableHtml += `<td><button type="button" data-id="${family_id}" class="btn btn-danger famDeleteBtn">Delete</button></td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}


// query 4 delete
export function deleteClubMemberRow(memberId) {
    fetch(`http://localhost:3006/deleteClubMember/${memberId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => errorPopup(error));

    fetch('http://localhost:3006/getAllClubMembers')
    .then(response => response.json())
    .then(data => loadAllClubMembers(data['data']));  
}

// query 4 update
export function updateClubMemberRow(inputArr, memberId, updType) {
    let req_body = {}
    if(updType === 'family_id1') {
        req_body = {
            newValue: parseInt(inputArr[0].value),
            memberId: memberId,
            columnName: updType
        };
    }
    else if(updType === 'family_id2') {
        req_body = {
            newValue: parseInt(inputArr[1].value),
            memberId: memberId,
            columnName: updType
        };
    }
    else if(updType === 'gender') {
        req_body = {
            newValue: inputArr[2].value,
            memberId: memberId,
            columnName: updType
        };
    }
    else if(updType === 'age') {
        req_body = {
            newValue: parseInt(inputArr[3].value),
            memberId: memberId,
            columnName: updType
        };
    }
    else if(updType === 'active') {
        req_body = {
            newValue: parseInt(inputArr[4].value),
            memberId: memberId,
            columnName: updType
        };
    }

    console.log(req_body)
    fetch('http://localhost:3006/updateClubMember', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_body)
    })
    .then(response => response.json())
    .then(data => console.log('Response Data:', data))
    .catch(error => errorPopup(error));
}

// query 4 display
export function loadAllClubMembers(data) {
    tableHead.innerHTML = "<th>Club Member ID</th><th>Family 1 ID</th><th>Family 2 ID</th><th>Location ID</th><th>Gender</th><th>Age</th><th>Active</th><th>Edit</th><th>Delete</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({member_id, family_id1, family_id2, location_id, gender, age, active}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${member_id}</td>`;
        tableHtml += `<td>${family_id1}</td>`;
        tableHtml += `<td>${family_id2}</td>`;
        tableHtml += `<td>${location_id}</td>`;
        tableHtml += `<td>${gender}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td>${active}</td>`;
        tableHtml += `<td><button type="button" data-id="${member_id}" class="btn btn-warning clubMemEditBtn">Edit</button></td>`;
        tableHtml += `<td><button type="button" data-id="${member_id}" class="btn btn-danger clubMemDeleteBtn">Delete</button></td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 5 delete
export function deleteTeamFormRow(formationId) {
    fetch(`http://localhost:3006/deleteTeamForm/${formationId}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => errorPopup(error));

    fetch('http://localhost:3006/getAllTeamsFormation')
    .then(response => response.json())
    .then(data => loadAllTeamFormation(data['data']));  
}

// query 5 update
export function updateTeamFormRow(inputArr, formationId, updType) {
    let req_body = {}
    if(updType === 'formation_type') {
        req_body = {
            newValue: inputArr[0].value,
            formationId: formationId,
            columnName: updType
        };
    }
    else if(updType === 'team1_id') {
        req_body = {
            newValue: parseInt(inputArr[1].value),
            formationId: formationId,
            columnName: updType
        };
    }
    else if(updType === 'team2_id') {
        req_body = {
            newValue: parseInt(inputArr[2].value),
            formationId: formationId,
            columnName: updType
        };
    }
    else if(updType === 'team1_score') {
        req_body = {
            newValue: parseInt(inputArr[3].value),
            formationId: formationId,
            columnName: updType
        };
    }
    else if(updType === 'team2_score') {
        req_body = {
            newValue: parseInt(inputArr[4].value),
            formationId: formationId,
            columnName: updType
        };
    }

    console.log(req_body)
    fetch('http://localhost:3006/updateClubMember', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req_body)
    })
    .then(response => response.json())
    .then(data => console.log('Response Data:', data))
    .catch(error => errorPopup(error));
}

// query 5 display
export function loadAllTeamFormation(data) {
    tableHead.innerHTML = "<th>Formation ID</th><th>Formation Type</th><th>Team 1 ID</th><th>Team 2 ID</th><th>Team 1 Score</th><th>Team 2 Score</th><th>Winner</th><th>Edit</th><th>Delete</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='9'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({formation_id, formation_type, team_id1, team_id2, team1_score, team2_score, winner}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${formation_id}</td>`;
        tableHtml += `<td>${formation_type}</td>`;
        tableHtml += `<td>${team_id1}</td>`;
        tableHtml += `<td>${team_id2}</td>`;
        tableHtml += `<td>${team1_score}</td>`;
        tableHtml += `<td>${team2_score}</td>`;
        tableHtml += `<td>${winner}</td>`;
        tableHtml += `<td><button type="button" data-id="${formation_id}" class="btn btn-warning teamFormEditBtn">Edit</button></td>`;
        tableHtml += `<td><button type="button" data-id="${formation_id}" class="btn btn-danger teamFormDeleteBtn">Delete</button></td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 6 display

// query 7
export function loadQ7(data) {
    tableHead.innerHTML = "<th>Address</th><th>City</th><th>Province</th><th>Postal-Code</th><th>Phone Number</th><th>Web Address</th><th>Location Type</th>" +
                            "<th>Capacity</th><th>First Name</th><th>Last Name</th><th>Number of Members</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='10'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({address, city, province, postal_code, phone_no, web_address, location_type, capacity, first_name, last_name, no_members}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${address}</td>`;
        tableHtml += `<td>${city}</td>`;
        tableHtml += `<td>${province}</td>`;
        tableHtml += `<td>${postal_code}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${web_address}</td>`;
        tableHtml += `<td>${location_type}</td>`;
        tableHtml += `<td>${capacity}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${no_members}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 8
export function loadQ8(data) {
    tableHead.innerHTML = "<th>2nd Family First Name</th><th>2nd Family Last Name</th><th>2nd Family Phone Number</th><th>Club Member ID</th><th>First Name</th><th>Last Name</th><th>Date of Birth</th>" +
                            "<th>SSN</th><th>Medical Number/th><th>Phone Number</th><th>Address</th><th>City</th><th>Province</th><th>Postal-Code</th><th>Relationship</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='15'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({second_fam_first_name, second_fam_last_name, second_fam_phone, member_id, first_name, 
                            last_name, date_of_birth, SSN, medic_no, phone_no, address, city, province, postal_code, relationship}) {

        tableHtml += "<tr>";
        tableHtml += `<td>${second_fam_first_name}</td>`;
        tableHtml += `<td>${second_fam_last_name}</td>`;
        tableHtml += `<td>${second_fam_phone}</td>`;
        tableHtml += `<td>${member_id}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${date_of_birth}</td>`;
        tableHtml += `<td>${SSN}</td>`;
        tableHtml += `<td>${medic_no}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${address}</td>`;
        tableHtml += `<td>${city}</td>`;
        tableHtml += `<td>${province}</td>`;
        tableHtml += `<td>${postal_code}</td>`;
        tableHtml += `<td>${relationship}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 9
export function loadQ9(data) {
    tableHead.innerHTML = "<th>Coach First Name</th><th>Coach Last Name</th><th>Formation Time</th><th>Address</th><th>Formation Type</th><th>Team Name</th>" +
                            "<th>Team 1 Score</th><th>Team 2 Score</th><th>Member First Name</th><th>Member Last Name</th><th>Member Role</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='11'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({c_first_name, c_last_name, form_time, form_address, formation_type, team_name, team1_score, team2_score, cm_first_name, cm_last_name, player_role}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${c_first_name}</td>`;
        tableHtml += `<td>${c_last_name}</td>`;
        tableHtml += `<td>${form_time}</td>`;
        tableHtml += `<td>${form_address}</td>`;
        tableHtml += `<td>${formation_type}</td>`;
        tableHtml += `<td>${team_name}</td>`;
        tableHtml += `<td>${team1_score}</td>`;
        tableHtml += `<td>${team2_score}</td>`;
        tableHtml += `<td>${cm_first_name}</td>`;
        tableHtml += `<td>${cm_last_name}</td>`;
        tableHtml += `<td>${player_role}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 10
export function loadQ10(data) {
    tableHead.innerHTML = "<th>Member ID</th><th>First Name</th><th>Last Name</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='3'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({member_id, first_name, last_name}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${member_id}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 11
export function loadQ11(data) {
    tableHead.innerHTML = "<th>Formation Address</th><th>Total Training Sessions</th><th>Total Players</th><th>Total Games</th><th>Total Players for Games</th>"

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({form_address, total_train_sessions, total_players_for_train, total_game_sessions, total_players_for_game}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${form_address}</td>`;
        tableHtml += `<td>${total_train_sessions}</td>`;
        tableHtml += `<td>${total_players_for_train}</td>`;
        tableHtml += `<td>${total_game_sessions}</td>`;
        tableHtml += `<td>${total_players_for_game}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 12-13-14-16
export function loadQ12To14_16(data) {
    tableHead.innerHTML = "<th>Member ID</th><th>First Name</th><th>Last Name</th><th>Age</th><th>Phone Number</th><th>Email</th><th>Location</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='7'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({member_id, first_name, last_name, age, phone_no, email, name}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${member_id}</td>`;
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${age}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 15
export function loadQ15(data) {
    tableHead.innerHTML = "<th>First Name</th><th>Last Name</th><th>Phone Number</th>";

    if(data.length == 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='3'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({first_name, last_name, phone_no}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 17
export function loadQ17(data) {
    tableHead.innerHTML = "<th>First Name</th><th>Last Name</th><th>Start Date</th><th>End Date</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='4'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({first_name, last_name, start_date, end_date}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${start_date}</td>`;
        tableHtml += `<td>${end_date}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

// query 18
export function loadQ18(data) {
    tableHead.innerHTML = "<th>First Name</th><th>Last Name</th><th>Phone Number</th><th>Email</th><th>Location Name</th><th>Work Role</th>";

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({first_name, last_name, phone_no, email, name, work_role}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${first_name}</td>`;
        tableHtml += `<td>${last_name}</td>`;
        tableHtml += `<td>${phone_no}</td>`;
        tableHtml += `<td>${email}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${work_role}</td>`;
        tableHtml += "</tr>";
    });

    tableOutput.innerHTML = tableHtml;
}

const modal = document.getElementById('modal');
const popup = document.querySelector('#modal #popup');

export function locationPopUp(locationId) {
    let popuphtml = '<div class="container" id="edit-container">';
    popuphtml += '<p>Edit Location Table</p>';
    popuphtml += editInput("editLocName", "updLocation", "Name", "text", "name", locationId, 'location');
    popuphtml += editInput("editLocAddress", "updLocation", "Address", "text", "address", locationId, 'location');
    popuphtml += editInput("editLocPc", "updLocation", "Postal-Code", "text", "postal_code", locationId, 'location');
    popuphtml += editInput("editLocPhone", "updLocation", "Phone Number", "text", "phone_no", locationId, 'location');
    popuphtml += editInput("editLocWeb", "updLocation", "Web Address", "text", "web_address", locationId, 'location');
    popuphtml += editInput("editLocCapacity", "updLocation", "Capacity", "number", "capacity", locationId, 'location');
    popuphtml += editInput("editLocType", "updLocation", "Location Type", "text", "location_type", locationId, 'location');
    popuphtml += '</div>';

    popuphtml += '<div class="container" id="btnContainer">';
    popuphtml += '<button type="button" id="closeBtn" class="btn btn-light">Close</button>';
    popuphtml += '</div>';

    popup.innerHTML += popuphtml;
    modal.style.display = 'block';
}

export function personnelPopup(personnelId) {
    let popuphtml = '<div class="container" id="edit-container">';
    popuphtml += '<p>Edit Personnel Table</p>';
    popuphtml += editInput("editPersRole", "updPersonnel", "Work Role", "text", "work_role", personnelId, 'personnel');
    popuphtml += editInput("editPersMandate", "updPersonnel", "Mandate", "text", "mandate", personnelId, 'personnel');
    popuphtml += editInput("editPersPres", "updPersonnel", "Is President? (1 or 0)", "number", "is_president", personnelId, 'personnel');
    popuphtml += editInput("editPersMng", "updPersonnel", "Is Manager? (1 or 0)", "number", "is_manager", personnelId, 'personnel');
    popuphtml += '</div>';

    popuphtml += '<div class="container" id="btnContainer">';
    popuphtml += '<button type="button" id="closeBtn" class="btn btn-light">Close</button>';
    popuphtml += '</div>';

    popup.innerHTML += popuphtml;
    modal.style.display = 'block';
}

export function familyPopup(familyId) {
    let popuphtml = '<div class="container" id="edit-container">';
    popuphtml += '<p>Edit Family Member Table</p>';
    popuphtml += editInput("editPhone", "updFamily", "Phone Number", "text", "phone_no", familyId, 'family_member');
    popuphtml += editInput("editAddress", "updFamily", "Address", "text", "address", familyId, 'family_member');
    popuphtml += editInput("editPostal", "updFamily", "Postal-Code", "text", "postal_code", familyId, 'family_member');
    popuphtml += '</div>';

    popuphtml += '<div class="container" id="btnContainer">';
    popuphtml += '<button type="button" id="closeBtn" class="btn btn-light">Close</button>';
    popuphtml += '</div>';

    popup.innerHTML += popuphtml;
    modal.style.display = 'block';
}

export function clubMemPopup(memberId) {
    let popuphtml = '<div class="container" id="edit-container">';
    popuphtml += '<p>Edit Club Member Table</p>';
    popuphtml += editInput("editMemFam1", "updMember", "Family Member 1 ID", "number", "family_id1", memberId, 'club_member');
    popuphtml += editInput("editMemFam2", "updMember", "Family Member 2 ID", "number", "family_id2", memberId, 'club_member');
    popuphtml += editInput("editGenderId", "updMember", "Gender(F or M)", "text", "gender", memberId, 'club_member');
    popuphtml += editInput("editAgeId", "updMember", "Age", "number", "age", memberId, 'club_member');
    popuphtml += editInput("editActvId", "updMember", "Active? (1 or 0)", "number", "active", memberId, 'club_member');
    popuphtml += '</div>';

    popuphtml += '<div class="container" id="btnContainer">';
    popuphtml += '<button type="button" id="closeBtn" class="btn btn-light">Close</button>';
    popuphtml += '</div>';

    popup.innerHTML += popuphtml;
    modal.style.display = 'block';
}

export function teamFormPopup(formationId) {
    let popuphtml = '<div class="container" id="edit-container">';
    popuphtml += '<p>Edit Club Member Table</p>';
    popuphtml += editInput("editFormType", "updFormation", "Formation Type(Game or Training Session)", "text", "formation_type", formationId, 'team_formation');
    popuphtml += editInput("editTeam1Id", "updFormation", "Team 1 ID", "number", "team_id1", formationId, 'team_formation');
    popuphtml += editInput("editTeam2Id", "updFormation", "Team 2 ID", "number", "team_id2", formationId, 'team_formation');
    popuphtml += editInput("editScore1", "updFormation", "Team 1 Score", "number", "team1_score", formationId, 'team_formation');
    popuphtml += editInput("editScore2", "updFormation", "Team 2 Score", "number", "team2_score", formationId, 'team_formation');
    popuphtml += '</div>';

    popuphtml += '<div class="container" id="btnContainer">';
    popuphtml += '<button type="button" id="closeBtn" class="btn btn-light">Close</button>';
    popuphtml += '</div>';

    popup.innerHTML += popuphtml;
    modal.style.display = 'block';
}

function editInput(input, inputClass, labelText, inputType, setType, data, table) {
    let editHtml = '<div class="container-fluid">';
    editHtml += `<label for="${input}">${labelText}: </label>`;
    editHtml += `<input type="${inputType}" id="${input}" class="${inputClass}" name="${input}" required>`;
    editHtml += `<button type="button" id="${setType}" data-id="${data}" class="btn btn-warning btn-sm ${table}">Update</button>`;
    editHtml += '</div>';
    return editHtml
}

export function errorPopup(err) {
    let popuphtml = '<div class="container" id="edit-container">';
    popuphtml += `<p>${err}</p>`;
    popuphtml += '</div>';

    popuphtml += '<div class="container" id="btnContainer">';
    popuphtml += '<button type="button" id="closeBtn" class="btn btn-light">Close</button>';
    popuphtml += '</div>';

    popup.innerHTML += popuphtml;
    modal.style.display = 'block';
}