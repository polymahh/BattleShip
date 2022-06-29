import playerFactory from "../player"

describe('check Spot',()=> {

    let player = playerFactory('playerOne')
    
  

    test('cheking for availble spot ', ()=> {
        let playerObj = {
            ships:[
                {
                location:[[0,0],[0,1]]
                },
                {
                location:[[1,0],[1,1]]
                },
                {
                location:[[2,0], [2,1], [2,2], [2,3]]
                }
        ]
        }
        expect(player.checkSpot(playerObj,[9,9])).toBe(true)
    })

    test('check for non availbale spot ', ()=> {

        let playerObj = {
            ships:[
                {
                location:[[0,0],[0,1]]
                },
                {
                location:[[1,0],[1,1]]
                },
                {
                location:[[2,0], [2,1], [2,2], [2,3]]
                }
        ]
        }
        expect(player.checkSpot(playerObj,[0,0])).toBe(false)
    })

    test('check for multple availble spots ', ()=> {

        let playerObj = {
            ships:[
                {
                
                location:[[0,0],[0,1]]
                },
                {
                location:[[1,0],[1,1]]
                },
                {
                location:[[2,0], [2,1], [2,2], [2,3]]
                }
        ]
        }
        expect(player.checkSpot(playerObj,[0,2])).toBe(true)
        expect(player.checkSpot(playerObj,[0,3])).toBe(true)
        
    })
})


describe("check spots",()=> {
    let player = playerFactory('playerOne')
    let playerObj

    beforeEach(()=>{

        return playerObj = {
            ships:[
                {
                    size:2,
                    location:[[0,0],[0,1]]
                },
                {
                    size:2,
                    location:[[1,0],[1,1]]
                },
                {
                    size:4,
                    location:[[2,0], [2,1], [2,2], [2,3]]
                }
        ]
        }

    })

    test('check for empty spots for an entire ship', ()=>{
      
        expect(player.checkSpots(playerObj, [3,3], 'hor', 2)).toBe(true)

    })

    test('check for empty spots for ship should return false because the spots ar full', ()=>{
        
        expect(player.checkSpots(playerObj, [0,2], 'hor', 4)).toBe(false)

    })

    test('check for spot outside the board/ board is 0-9 ', ()=>{
        
        expect(player.checkSpots(playerObj, [11,-1], 'hor', 4)).toBe(false)

    })
})

describe('placeShip',()=>{
    let player = playerFactory('playerOne')
    

    test('test if a ship is placed meaning the ship is added to the ships array', ()=>{
        player.placeShip(player, [0,5],'hor',3)
        expect(player.ships).toEqual(expect.arrayContaining([
            expect.objectContaining({"direction": "hor", "location": [[0, 5], [1, 5], [2, 5]], "size": 3})
        ]))

    })
    test('test if a ship is not placed when some spots are full', ()=>{
        player.placeShip(player, [1,4],'hor',4)
        expect(player.ships).not.toEqual(expect.arrayContaining([
            expect.objectContaining({"direction": "hor", "location": [[1, 4], [1, 5], [1, 6], [1, 7]], "size": 4})
        ]))

    })
})