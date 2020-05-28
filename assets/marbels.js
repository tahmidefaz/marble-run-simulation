var getMarbels = (width, engine) => {
    const restitutionValue = 0.8;
    const frictionAir = 0.09

    // rand_one = Math.floor(Math.random()*(width*0.22))+10
    // rand_two = Math.floor(Math.random()*(width*0.22))+10

    // var marbles = new Array();
    // for(var i=0; i<15; i++){
    //     marbles.push(Bodies.circle(Math.floor(
    //         Math.random()*(width*0.22))+10, 0, 7, { 
    //             restitution: restitutionValue, frictionAir: frictionAir, name: i, lap: 0, lapStart: 0, lapEnd: 0, label: 'Marble', 
    //             render: {
    //                 sprite: {
    //                     texture: './assets/sprites/energy2.png', xScale:0.55, yScale:0.55
    //                 }
    //             }
    //         })
    //     );
    // }
    // return [...marbles];

    var marbles = new Array();
    for(const marbleName in marbleInfo){
        var [image, scale] = marbleInfo[marbleName];
        marbles.push(
            Bodies.circle(
                Math.floor(Math.random()*(width*0.22))+10, 0, 7, { 
                    restitution: restitutionValue, frictionAir: frictionAir, name: marbleName, lap: 0, lapStart: 0, lapEnd: 0, label: 'Marble', 
                    render: {
                        sprite: {
                            texture: image, xScale: scale, yScale: scale
                        }
                    }
                }
            )
        );
    }
    

    return [...marbles];
}