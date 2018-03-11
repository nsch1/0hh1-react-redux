import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Square from '../components/Square'
import { duplicateRows, duplicateCols, cols, threeOrMoreInARow } from '../lib/game'
import './Board.css'

export class Board extends PureComponent {
  static propTypes = {
    board: PropTypes.arrayOf(
      PropTypes.arrayOf(PropTypes.number)
    ).isRequired
  }

  renderRow = (row, index) => {
    return (
      <div key={index} className="row">
        {row.map(this.renderSquare(index))}
      </div>
    )
  }

  renderSquare = rowIndex => (value, index) => {
    const { dupeRows, dupeCols, errors, board } = this.props

    const dupe = dupeRows.includes(rowIndex) || dupeCols.includes(index)

    const error = errors.cols[index].includes(rowIndex) ||
      errors.rows[rowIndex].includes(index) ||
      board[rowIndex].filter(v => v !== 0 && v === value).length > board.length / 2 ||
      cols(board)[index].filter(v => v !== 0 && v === value).length > board.length / 2

    return (
      <Square key={index} value={value} dupe={dupe} error={error} x={index} y={rowIndex} />
    )
  }

  render() {
    console.log(this.props.board)
    return (
      <div className="Board">
        {this.props.board.map(this.renderRow)}
      </div>
    )
  }
}

const mapStateToProps = ({ board }) => {
  return {
    board,
    dupeRows: duplicateRows(board),
    dupeCols: duplicateCols(board),
    errors: {
      rows: board.map(threeOrMoreInARow),
      cols: cols(board).map(threeOrMoreInARow)
    }
  }
}

export default connect(mapStateToProps)(Board)