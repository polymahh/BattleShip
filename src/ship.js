let hitShip

function checkForShip (player, cordinates) {

    // check for ship inside the player ships 
    let ship 
    let shipPresent 
    for(let i=0; i<player.ships.length; i++){
       ship = player.ships[i]
       shipPresent = ship.location.filter((cords) => {
           return (cords[0] === cordinates[0]) && (cords[1] === cordinates[1])})[0]

        if(shipPresent){ 
            hitShip = ship
            return true 
        }
    }
   
    if(!shipPresent){
        return false;
    }
}

function shipFire (player,hit){
    let check = checkForShip(player, hit)
    if( check && !hitShip.damage.includes[hit]){
        getHit(hitShip, hit)
    }else {
        player.boardHits.push(hit)
        
    }

}

function getHit (ship, hit){
    ship.damage.push(hit)
    isSunked(ship)
    
}



function isSunked (ship){
    if (ship.location.length === ship.damage.length){
        ship.isSunked = true
    } else  return   
    
}


export  {getHit, checkForShip, shipFire} 