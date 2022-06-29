import './css/normalize.css';
import './css/style.css';
// import boardFactory  from "./board";
import playerFactory from "./player"
import {getHit, checkForShip, shipFire} from "./ship"

const playerTwoOptions = [
        [   
            {
            size:5,
            location:[[2, 1], [3, 1], [4, 1], [5, 1], [6, 1]],
            direction:'hor',
            damage:[],
            isSunked :false
            },
            {
            size:4,
            location:[[0, 5], [1, 5], [2, 5], [3, 5]],
            direction:'hor',
            damage:[],
            isSunked :false
            },
            {
            size:3,
            location:[[8, 5], [8, 6], [8, 7]],
            direction:'ver',
            damage:[],
            isSunked :false
            },
            {
            size:3,
            location:[[2, 8], [3, 8], [4, 8]],
            direction:'ver',
            damage:[],
            isSunked :false
            },
            {
            size:2,
            location:[[5, 3], [5, 4]],
            direction:'ver',
            damage:[],
            isSunked :false
            }
        ],
        [
            {
            size:5,
            location:[[1, 8], [2, 8], [3, 8], [4, 8], [5, 8]],
            direction:'hor',
            damage:[],
            isSunked :false
            },
            {
            size:4,
            location:[[8, 1], [8, 2], [8, 3], [8, 4]],
            direction:'ver',
            damage:[],
            isSunked :false
            },
            {
            size:3,
            location:[[1, 2], [2, 2], [3, 2]],
            direction:'hor',
            damage:[],
            isSunked :false
            },
            {
            size:3,
            location:[[4, 5], [5, 5], [6, 5]],
            direction:'hor',
            damage:[],
            isSunked :false
            },
            {
            size:2,
            location:[[9, 8], [9, 9]],
            direction:'ver',
            damage:[],
            isSunked :false
            }
        ]

]

let currentPlayer 
let gamePlay = {
    starting : true,
    direction : 'hor',
    shipsToPlace : [
        {
            name:'Carrier',
            size: 5
        },
        {
            name:'Battle Ship',
            size: 4
        },
        {
            name:'destroyer',
            size: 3
        },
        {
            name:'submarine',
            size: 3
        },
        {
            name:'boat',
            size: 2
        },
    ],
    size : 3,

    Init (){
        
        this.casheDom()
        renderBoard(this.playerOneContainer)
        renderBoard(this.playerTwoContainer)
        renderBoard(this.playerStart)
        this.boxs = document.querySelectorAll(".starting .box")
        this.playerOne = playerFactory('playerOne')
        this.playerTwo = playerFactory('playerTwo')
        currentPlayer = this.playerTwo
        this.setPlayerTwo()
        this.render()
        this.bindEvents()

    },

    casheDom (){
        this.containner = document.querySelector('.content')
        this.playerOneContainer = document.getElementById('playerOne')
        this.playerTwoContainer = document.getElementById('playerTwo')
        this.playerStart = document.getElementById('playerStart')
        this.startingDiv = document.querySelector('.starting')
        this.startButton = document.getElementById('startGame')
        this.directionButton = document.getElementById('direction') 
        this.order = document.getElementById('order')
        this.inputName = document.querySelector('#nameInput')
        this.errorMessage = document.querySelector('#error')
        this.winnerBoard = document.querySelector('.winner')
        this.winnerName = document.querySelector('.winnerName')
    
    },

    bindEvents (){
        this.playerOneContainer.addEventListener("click" ,(e) => {
            let cords = e.target.id.split(',').map(e => Number(e))
            console.log(cords)
            let check = false
            let checkTwo = false
            
            if(this.playerTwo.boardHits.length > 0){
               check = this.checkBoardHits(cords, this.playerTwo)
               checkTwo = this.checkShipDamage(this.playerTwo, cords)
               
            }
            
            
            if (!this.starting && currentPlayer == this.playerTwo && !check && !checkTwo){
                
                shipFire(currentPlayer, cords)
                this.switchPlayer()
                this.render()

            }else return
    
        })

        this.playerStart.addEventListener("mouseover" , e =>{
            let target = e.target.id.split(',').map(e => Number(e))
            let result = this.playerOne.checkSpots(this.playerOne, target, this.direction, this.size)
            let shipBoxs = this.getShipBoxs(e.target.id)
            
            if(result){
                this.setColor(shipBoxs,"lightGreen")
            }else if(!result) {
                this.setColor(shipBoxs,"red")
            }
            e.target.addEventListener("mouseleave" , e => {
                shipBoxs.map(box => box.style.backgroundColor = '')
            })
            
        })
        

        this.playerStart.addEventListener("click" ,(e) => {
            
            let cords = e.target.id.split(",").map(e => Number(e))
            
            if(this.starting && e.target.id !="direction"  ){
                if(this.playerOne.checkSpots(this.playerOne , cords, this.direction, this.size) ){
                    
                    this.playerOne.placeShip(this.playerOne , cords, this.direction, this.size)
                    this.shipsToPlace.shift()
                    this.render()
                }else {
                    this.errorMessage.innerText = 'Wrong Spot'
                }
                    
            } else if(this.starting && e.target.id =="direction" ){
                
                if(this.direction == "hor"){
                    this.direction = "ver"
                    this.directionButton.innerText = "Vertical"
                }else {
                    this.direction = "hor"
                    this.directionButton.innerText = "horizontal"
                }
            }
        })
        

        this.startButton.addEventListener("click", () => {
            if(this.shipsToPlace.length > 0 || this.inputName.value == ''){
                this.errorMessage.innerText = "Choose your Name and Place Your Ships";
            }else {
                console.log("fine")
                this.playerOne.name = this.inputName.value
                this.starting = false
                this.render()
            }
            
        })


    
    },
    setPlayerTwo (){
        
        this.playerTwo.ships = playerTwoOptions[1]
        console.log(this.playerTwo)
    },
    checkBoardHits (cords,player){
        let result = true
        player.boardHits.map((loc) => {
            if(loc[0] === cords[0] && loc[1] === cords[1]){
                result = true
            }else result = false
           })
        return result
        // return player.boardHits.includes(cords)
    },
    checkShipDamage(player, cords){
        let result = false
        outer: for (let i = 0; i < player.ships.length; i++) {
            const item = player.ships[i].damage
            for (let k = 0; k < item.length; k++) {
                if(item[k][0] === cords[0] && item[k][1] === cords[1]){
                    result = true
                    break outer
                }
                
            }
            
        }
        return result
    },
    playerTwoMove (){
        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);
        let check = false
        let checkTwo = false
        if(this.playerOne.boardHits.length > 0){
           check = this.checkBoardHits([num1, num2],this.playerOne)
           checkTwo = this.checkShipDamage(this.playerOne, [num1, num2])
        }
        if(currentPlayer == this.playerOne && !check && !checkTwo){
            shipFire(currentPlayer, [num1, num2])
            this.switchPlayer()
        }else {
            console.log('falsenpx')
            this.playerTwoMove()
        }
        this.render()
    },

    switchPlayer () {
        console.log("switch")
        console.log(currentPlayer)
        if(currentPlayer == this.playerTwo){
            currentPlayer = this.playerOne
            this.playerTwoMove()
        }else currentPlayer = this.playerTwo
        
        
    
    },
    getShipBoxs(target) {
        let shipArray = this.calcShipLocation (target, this.size)
        let shipBoxs =[]
        shipArray.forEach(e => {
            for (const box of this.boxs) {
                if(box.id == (`${e}`)){
                    shipBoxs.push(box)
                }
            }

        })
        return shipBoxs

    },

    setColor(boxs, color){
        // this is for setting the background color on hover for starting board

        boxs.forEach(box => {
            box.style.backgroundColor = color
        })
        
      
    },

    calcShipLocation (shipId, size){
        // this for how many boxs will be colored when hovering
        let shipBgLoaction = []
        let stringCords = shipId.split(",")
        let cords = stringCords.map(e => Number(e))
        for (let i = 0; i< size; i++) {
            if(this.direction == "ver"){
                shipBgLoaction.push(`${cords[0]},${cords[1]+i}`)
            }else if(this.direction == "hor"){
                shipBgLoaction.push(`${cords[0]+i},${cords[1]}`)
            }
            
        }

        return shipBgLoaction
    },

    render(){
        if(!this.starting){
            this.startingDiv.style.display = "none";
            this.renderShips()
            this.renderMissedHits(this.playerTwo, this.playerOneContainer)
            this.renderMissedHits(this.playerOne, this.playerTwoContainer)
            this.renderHits(this.playerTwo, this.playerOneContainer)
            this.renderHits(this.playerOne, this.playerTwoContainer)
            if(this.winCheck(this.playerOne)){
                console.log('winner is '+ this.playerTwo.name)
                this.winnerBoard.style.display = 'flex'
                this.winnerName.innerText = this.playerTwo.name
            }else if(this.winCheck(this.playerTwo)){
                console.log('winner is '+ this.playerOne.name)
                this.winnerBoard.style.display = 'flex'
                this.winnerName.innerText = this.playerOne.name
            }
            
        }else {
        // this for ship plaicng and orders at the start of game
        if(this.shipsToPlace.length > 0){
            this.size = this.shipsToPlace[0].size
            this.order.innerText = `Place You ${this.shipsToPlace[0].name}`
        }else {
            this.starting = false
            this.order.innerText = 'start Game'
        }

        this.playerOne.ships.forEach(ship => {
            ship.location.forEach(location => {
                for (const box of this.boxs) {
                    if(box.id == `${location[0]},${location[1]}`){
                        box.classList = 'boxset'                    }
                    
                }
            })
        })

        this.errorMessage.innerText = ''
    }
    },
    renderShips(){
        let playerShips = this.playerOne.ships.map(ship => [...ship.location]).flat();
        let boxs = this.playerTwoContainer.childNodes
        playerShips.forEach(location => {
            for (const box of boxs) {
                let idArr = box.id.split(',').map(n => Number(n) )
                if ( idArr[0] == location[0] && idArr[1] == location[1]) {
                    box.style.backgroundColor = 'green'
                    
                }
            }
        })
        
         
    },
    renderMissedHits (player,container){
        let boxs = container.childNodes
        player.boardHits.forEach(location => {
            for (const box of boxs) {
                let idArr = box.id.split(',').map(n => Number(n) )
                if ( idArr[0] == location[0] && idArr[1] == location[1]) {
                    box.style.backgroundColor = 'darkslategray'
                    
                }
            }
        })
    },
    renderHits(player,container){
        let boxs = container.childNodes
        let color
        
        player.ships.forEach(ship => {
            if(ship.isSunked == false){
                color = 'red'
            }else {
                color = 'brown'
            }
            ship.damage.forEach(hit => {
                for (const box of boxs) {
                    let idArr = box.id.split(',').map(n => Number(n) )
                    if ( idArr[0] == hit[0] && idArr[1] == hit[1]) {
                        box.style.backgroundColor = color
                        
                    }
                }

            })
            
        })
    },
    winCheck (player){
        return player.ships.every(item => item.isSunked == true)
    }

}


function renderBoard (element){
    
    for (let y = 0; y <= 9; y++) {
        for (let x = 0; x <=9; x++) {
            let div = document.createElement('div')
            div.classList.add('box');
            div.id = `${x},${y}`;
            element.appendChild(div);
        }
        
    }

}

function palyerMove ( currentPlayer , click, size, direction){
    if(starting){
        playerFactory.placeShip(currentPlayer , click, size, direction)

    } else if (!starting){
        shipFire(currentPlayer,click)
    }

}



gamePlay.Init()
// console.log(gamePlay.playerOne)
console.log('working')

export {palyerMove}