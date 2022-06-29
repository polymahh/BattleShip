import playerFactory from "./player"

function boardFactory (){

    let playerOne = {
        ships:[],
        hits:[]
    }

    let playerTwo = {
        ships:[],
        hits:[]
    }

    function boardArrays (name){

        if(name == "playerOne"){
            return playerOne
        }else return playerTwo
       
    }



    function playerMove ( name , click, size, direction){

         playerFactory.placeShip(boardArrays(name), click, size, direction)
    }

    return {boardArrays, playerMove}
}

export default boardFactory 