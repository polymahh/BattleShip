import boardFactory  from "../board";
import playerFactory from "../player"

describe('borad arrays',()=>{
    let board = boardFactory()
    // let boardObj

    let playerOneBoard =  board.boardArrays('playerOne')
    let playerTwoBoard =  board.boardArrays('playerTwo')
    
    beforeEach(()=>{
        playerOneBoard =  board.boardArrays('playerOne')
        playerTwoBoard =  board.boardArrays('playerTwo')

    //    return playerOneBoard playerTwoBoard
    })

    test('check for a board is returned  ',()=>{
        expect(playerOneBoard).toEqual(expect.objectContaining({ships:[],hits:[]}))
    })

    test('check for a move from playerOne to be working   ',()=>{
        playerFactory.placeShip = jest.fn(()=> {
            playerOneBoard.ships.push({
                size:2,
                location: [[0, 5], [1, 5]],
                direction: "hor"
            })
        })
        board.playerMove('playerOne',[0, 5], 'hor',2)
        expect(playerOneBoard.ships).toEqual(expect.arrayContaining([
            expect.objectContaining({"direction": "hor", "location": [[0, 5], [1, 5]], "size": 2})
        ]))

    })

    test("check ifmove from playerTwo is working", ()=> {

        playerFactory.placeShip = jest.fn(()=> {
            playerTwoBoard.ships.push({
                size:4,
                location: [[8, 0], [8, 1],[8, 2], [8, 3]],
                direction: "ver"
            })
        })
         board.playerMove('playerTwo',[8, 0], 'ver',4)
        expect(playerTwoBoard.ships).toEqual(expect.arrayContaining([
            expect.objectContaining({"direction": "ver", "location": [[8, 0], [8, 1],[8, 2], [8, 3]], "size": 4})
        ]))


    })
})