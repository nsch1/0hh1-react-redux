import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { move } from '../actions/game'
import { connect } from 'react-redux'
import './Square.css'

export class Square extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired
  }

  handleClick = () => {
    const { locked, y, x } = this.props
    if (locked) return 
    this.props.move(y, x)
  }

  classNames() {
    const { value, locked, dupe } = this.props

    let classnames = ['Square']
    classnames.push(`fill-${value || 0}`)
    if (locked) classnames.push('locked')
    if (dupe) classnames.push('dupe')

    return classnames.join(' ')
  }

  render() {
    const { value, x, y, locked } = this.props
    return (
      <div className={this.classNames()} value={value} onClick={this.handleClick} />
    )
  }
}

const mapStateToProps = ({ locked }, { x, y }) => {
  return {
    locked: locked.filter(l => l[0] === y && l[1] === x).length > 0
  }
}

export default connect(mapStateToProps, { move })(Square)