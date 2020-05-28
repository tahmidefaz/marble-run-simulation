// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies;
    Body = Matter.Body;
    Events = Matter.Events;

// create an engine
var engine = Engine.create();

// create a renderer

bodyWidth = 900;
bodyHeight = 740;

var render = Render.create({
    element: document.getElementById('race'),
    engine: engine,
    options:{
        width: bodyWidth,
        height: bodyHeight,
        wireframes: false
    }
});

var getAngle = (degree) => degree * (Math.PI/180);

var marbels = getMarbels(bodyWidth, engine);

// set number of Laps
var totalLaps = 3;

var fastestLap = ['', 0, Infinity];
var lapData = new Array(totalLaps);
var count = 0;

var endLogic = (marbleObj, totalLaps) => {
    marbleObj.lap++;
    marbleObj.lapEnd = Date.now();

    // recording lap data
    var lapTime = (marbleObj.lapEnd - marbleObj.lapStart)/1000;
    if(lapData[marbleObj.lap -1] == undefined) {
        data = [marbleObj.name, (marbleObj.lapEnd - raceStartTime)/1000, lapTime, 0.000]
        lapData[marbleObj.lap - 1] = [data];
        writeToTable(data, marbleObj.lap, totalLaps);
    } else {
        // var diff = ((marbleObj.lapEnd - raceStartTime) - lapData[marbleObj.lap-1][0][1]);
        var diff = (marbleObj.lapEnd - raceStartTime)/1000 - lapData[marbleObj.lap - 1][0][1]
        data = [marbleObj.name, (marbleObj.lapEnd - raceStartTime)/1000, lapTime, diff]
        lapData[marbleObj.lap - 1].push(data);
        writeToTable(data, marbleObj.lap, totalLaps);
    }

    if(lapTime < fastestLap[2]) fastestLap = [marbleObj.name, marbleObj.lap, lapTime];
    showFastestLapData(fastestLap);
    if(marbleObj.lap < totalLaps){
        Body.setPosition(marbleObj, {x: marbleObj.position.x-669, y:-5});
        marbleObj.lapStart = Date.now();
    } else {
        // marbleObj.render.visible = false;
        Matter.Composite.remove(engine.world, marbleObj);
        count ++;
        if(count === 15){
            console.log("fastest lap: ", fastestLap);
            console.log("lap data:", lapData);
        };

    }
}

// add all of the bodies to the world
var mapData = loadStaticMap(bodyWidth, bodyHeight, engine, totalLaps);
writeMapName(mapData.name);
World.add(engine.world, [...mapData.map, ...marbels]);

Events.on(engine, 'collisionStart', function(event) {
    let pairs = event.pairs;
    pairs.forEach(function(pair) {
        if (pair.bodyA.label === 'Marble') {
            switch (pair.bodyB.label) {
                case 'Teleport':
                    Body.setPosition(pair.bodyA, {x: pair.bodyA.position.x+223, y:-5});
                    break;
                case 'End':
                    endLogic(pair.bodyA, totalLaps);
                    break;
            }
        }
    });
});

drawInitialTable(totalLaps);

var raceStartTime = Date.now();

// run the engine
marbels.forEach((marble) => marble.lapStart=raceStartTime);
Engine.run(engine);

// run the renderer
Render.run(render);