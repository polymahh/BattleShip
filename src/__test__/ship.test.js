import {getHit, checkForShip, shipFire} from '../ship'


describe('check for ship', ()=> {
    let player 
    beforeAll(()=> {
        return player = {
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
    
    })
 

    test('check for a ship is avalblae in array',()=>{
    
        expect(checkForShip(player, [0,0])).toBe(true)
    })

    test('check for a ship is NOT available in array',()=>{
       
        expect(checkForShip(player, [9,9])).toBe(false)
    })

    test('check for ship with multi cords',()=>{
       
        expect(checkForShip(player, [0,0])).toBe(true)
        expect(checkForShip(player, [0,1])).toBe(true)
    })

    test('check for multiple ships',()=>{
        
        expect(checkForShip(player, [0,0])).toBe(true)
        expect(checkForShip(player, [1,0])).toBe(true)
        expect(checkForShip(player, [1,1])).toBe(true)
        expect(checkForShip(player, [2,0])).toBe(true)
        expect(checkForShip(player, [2,1])).toBe(true)
        expect(checkForShip(player, [2,2])).toBe(true)
        expect(checkForShip(player, [2,3])).toBe(true)
        expect(checkForShip(player, [9,9])).toBe(false)
    })



})

describe ('get Hit', ()=>{
    let ship
    beforeEach(()=> {
         
        ship =  {
                 location:[[0,0],[0,1]],
                 damage:[]
                }
         
    
    })

    

    test('check if ship get hit',()=>{
        getHit(ship,[0,0])
        console.log(ship.damage)
        expect(ship.damage).toContainEqual([0,0])
    })

    test('check if ship get hit multiple times',()=>{
        getHit(ship,[0,0])
        getHit(ship,[0,1])
        console.log(ship.damage)
        expect(ship.damage).toContainEqual([0,0])
        expect(ship.damage).toContainEqual([0,1])
    })



})


describe('fire ship ',()=> {

    let player
    beforeEach(()=> {
         return player = {
            ships:[
                    {
                    location:[[0,0],[0,1]],
                    damage:[]
                    },
                    {
                    location:[[1,0],[1,1]],
                    damage:[]
                    },
                    {
                    location:[[2,0], [2,1], [2,2], [2,3]],
                    damage:[]
                    }
                ],
        }
    
    })

    test('if fire method is firing ',()=>{
        shipFire(player,[0,0])
        expect(player.ships[0].damage).toContainEqual([0,0])
    })
    

})
