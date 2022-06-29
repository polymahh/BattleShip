import {getHit, checkForShip, shipFire} from './ship'

function playerFactory (name){
    
    let shipCordinates = []

    let ships =[]
    let boardHits = []
    function checkSpot (player, cordinates){

        let xSpot = cordinates[0]
        let ySpot = cordinates[1]

        let availbaleSpot = !checkForShip(player, cordinates)

        if ((xSpot <= 9 && xSpot >=0) && (ySpot <= 9 && ySpot >=0)){
            return availbaleSpot 
        }else return false

    }

    function checkSpots ( player ,cordinates, direction, size){

        let currentShip = []
        for (let i = 0; i < size; i++) {
            if(direction == 'hor'){
                currentShip.push([cordinates[0]+i , cordinates[1]])
            }else if(direction == 'ver'){
                currentShip.push([cordinates[0] , cordinates[1] + i])
            }
            
        }

        shipCordinates = currentShip
        return shipCordinates.every(element => checkSpot(player,element))



    }

    function placeShip(player, cordinates, direction, size){

        if(checkSpots(player ,cordinates, direction, size)){
            ships.push({
                size:size,
                location:shipCordinates,
                direction:direction,
                damage:[],
                isSunked :false

            })
            
        }else {
            console.log("something went worng")
            
        }
        
    }

    

    return {name, ships, boardHits, checkSpot, checkSpots, placeShip}
}

export default playerFactory