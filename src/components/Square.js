import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import './Square.css'

export default class Square extends PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired
  }

  render() {
    return (
      <div className="Square" value={this.props.value} />
    )
  }
}