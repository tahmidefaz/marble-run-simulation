var writeMapName = (mapName) =>{
    document.getElementById('mapName').innerHTML = mapName;
}

var showFastestLapData = (fastestLapData) => {
    document.getElementById('fastestLap').innerHTML = `<b>Fastest Lap</b><p>Marble: ${fastestLapData[0]}, Lap Number: ${fastestLapData[1]}, Time: ${fastestLapData[2]}</p>`
}

var createTableData = (marbleData) => {
    return `<tr>
                <td><img src="${marbleInfo[marbleData[0]][0]}" height="15" width="15"> ${marbleData[0]}</td>
                <td>${marbleData[1]}</td>
                <td>${marbleData[2]}</td>
                <td>+${marbleData[3].toFixed(3)}</td>
            </tr>`
}

var drawInitialTable = (numberOfLaps) => {
    var tableElements = `<p id="lapName"><b>Lap 0/${numberOfLaps.toString()}<b></p>`
    tableElements += `<table id="initialTable">
                        <tr>
                            <th>Marble Name</th>
                            <th>Total Time</th>
                            <th>Lap Time</th>
                            <th>diff</th>
                        </tr>
                        </table> <br>`
    document.getElementById('scoreboard').innerHTML = tableElements;
    
    for (const marbleName in marbleInfo) {
        var marbleData = [marbleName, "----", "----", 0.000];
        document.getElementById("initialTable").innerHTML += createTableData(marbleData);
    }
}

var writeToTable = (marbleData, tableId, numberOfLaps) => {
    var tableIdString = tableId.toString();
    if(document.getElementById(tableIdString)){
        document.getElementById(tableIdString).innerHTML += createTableData(marbleData);
    } else {
        var tableElements = `<p id="lapName"><b>Lap ${tableIdString}/${numberOfLaps.toString()}<b></p>`
        tableElements += `<table id="${tableIdString}">
                            <tr>
                                <th>Marble Name</th>
                                <th>Total Time</th>
                                <th>Lap Time</th>
                                <th>diff</th>
                            </tr>
                            </table> <br>`
        document.getElementById('scoreboard').innerHTML = tableElements;
        document.getElementById(tableIdString).innerHTML += createTableData(marbleData);
    }
    
}
