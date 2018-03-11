import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Square from '../components/Square'
import { duplicateRows, duplicateCols } from '../lib/game'
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
    const { dupeRows, dupeCols } = this.props

    const dupe = dupeRows.includes(rowIndex) || dupeCols.includes(index)

    return (
      <Square key={index} value={value} dupe={dupe} x={index} y={rowIndex} />
    )
  }

  render() {
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
    dupeCols: duplicateCols(board)
  }
}

export default connect(mapStateToProps)(Board)