document.addEventListener('DOMContentLoaded', function() {
    fetch()
    loadLocations([]);
});

function loadLocations(data) {
    const tableOutput = document.querySelector('#output-section table tbody');

    const tableHead = document.querySelector('#output-section table thead');
    tableHead.innerHTML = "<th>location_id</th><th>name</th><th>address</th><th>city</th><th>province</th><th>postal code</th>" +
                            "<th>phone number</th><th>web address</th><th>capacity</th><th>location type</th>"

    if(data.length === 0) {
        tableOutput.innerHTML = "<tr><td class='no-data' colspan='10'>No Data</td></tr>";
    }
}