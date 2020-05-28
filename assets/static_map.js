var getBodiesOne = (positionX, positionY, angle, engine) =>{
    var options = {
        isStatic: true,
        angle: angle * (Math.PI/180)
    };

    var left_sides = new Array();
    for (var i=0; i < 8; i++){
        left_sides.push(Bodies.rectangle(positionX, positionY+i*70, 100, 5, options))
    }

    var right_sides = new Array();
    for (var i=0; i < 8; i++){
        right_sides.push(Bodies.rectangle(positionX+120, positionY+i*70, 100, 5, options))
    }

    left_sides.forEach(side => {
        Events.on(engine, 'beforeUpdate', (event) => {
            Body.rotate(side, 0.04);
        })
    });
    right_sides.forEach(side => {
        Events.on(engine, 'beforeUpdate', (event) => {
            Body.rotate(side, -0.04);
        })
    });

    var boxA = Bodies.rectangle(positionX+60, 100, 60, 60, {isStatic: true});
    var boxB = Bodies.rectangle(positionX+60, 300, 60, 60, {isStatic: true});
    var boxC = Bodies.rectangle(positionX+60, 500, 60, 60, {isStatic: true});

    Events.on(engine, 'beforeUpdate', (event) => {
        Body.rotate(boxA, -0.1);
        Body.rotate(boxB, 0.1);
        Body.rotate(boxC, -0.1);
    })

    return [...left_sides, ...right_sides, boxA, boxB, boxC];
};

var getBodiesTwo = (engine, xValue, rotationSpeed) => {
    var yValue = 75;

    var boxesA = new Array()
    for (var i=0; i < 8; i++) {
        boxesA.push(Bodies.rectangle(xValue, yValue+i*80, 40, 40, {isStatic: true}));
    }

    var boxesB = new Array()
    for (var i=0; i < 8; i++) {
        boxesB.push(Bodies.rectangle(xValue+52, yValue+i*80, 28, 28, {isStatic: true}));
    }

    var boxesC = new Array()
    for (var i=0; i < 8; i++) {
        boxesC.push(Bodies.rectangle(xValue+103, yValue+i*80, 40, 40, {isStatic: true}));
    }

    var boxesD = new Array()
    for (var i=0; i < 8; i++) {
        boxesD.push(Bodies.rectangle(xValue+155, yValue+i*80, 30, 30, {isStatic: true}));
    }

    Events.on(engine, 'beforeUpdate', (event) => {
        boxesA.forEach(box => Body.rotate(box, rotationSpeed));
        boxesB.forEach(box => Body.rotate(box, rotationSpeed*2));
        boxesC.forEach(box => Body.rotate(box, rotationSpeed));
        boxesD.forEach(box => Body.rotate(box, rotationSpeed*2));
    })
    return [...boxesA, ...boxesB, ...boxesC, ...boxesD]
}

var getTeleports = (width, height, sideLength) => {
    var teleportOptions = { isStatic: true, label:'Teleport', render: { fillStyle: '#fff59d'} };
    var teleportOne = Bodies.rectangle(width*0.125+3, height-30, width*0.25-15, sideLength, teleportOptions);
    var teleportTwo = Bodies.rectangle(width*0.375, height-30, width*0.25-15, sideLength, teleportOptions);
    var teleportThree = Bodies.rectangle(width*0.625, height-30, width*0.25-15, sideLength, teleportOptions);
    var lapEnd = Bodies.rectangle(width*0.872, height-30, width*0.25-15, sideLength, { isStatic: true, label:'End', render: { fillStyle: '#e57373'} });

    return [teleportOne, teleportTwo, teleportThree, lapEnd]
}

var endLogic = (marbleObj, totalLaps) => {
    marbleObj.lap++;
    if(marbleObj.lap < totalLaps){
        Body.setPosition(marbleObj, {x: marbleObj.position.x-705, y:-5});
    } else {
        // marbleObj.render.visible = false;
        Matter.Composite.remove(World, marbleObj)
    }
}

var loadStaticMap = (width, height, engine) => {
    // ground and sides
    var sideLength = 5
    var staticOptions = { isStatic: true };
    var ground = Bodies.rectangle(width/2, height, width, 60, staticOptions);
    var leftSide = Bodies.rectangle(sideLength, height/2, sideLength*2, height, staticOptions);
    var rightSide = Bodies.rectangle(width-sideLength, height/2, sideLength*2, height, staticOptions);

    var midOne = Bodies.rectangle(width*0.25, height/2, sideLength*2, height, staticOptions);
    var midTwo = Bodies.rectangle(width*0.5, height/2, sideLength*2, height, staticOptions);
    var midThree = Bodies.rectangle(width*0.75, height/2, sideLength*2, height, staticOptions);

    return {name:"The Paradigm", map: [ground, leftSide, rightSide, midOne, midTwo, midThree, ...getTeleports(width, height, sideLength), ...getBodiesOne(50, 70, 10, engine), ...getBodiesTwo(engine, 268, 0.02), ...getBodiesTwo(engine, 493, 0.02), ...getBodiesOne(725, 70, 10, engine)]};
};
