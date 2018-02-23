import board, { initialBoard } from './board'

describe('board reducer', () => {
  const reducer = board
  const initialState = initialBoard

  it('returns an empty array for the initial state', () => {
    expect(reducer()).toEqual(initialState)
  })
})