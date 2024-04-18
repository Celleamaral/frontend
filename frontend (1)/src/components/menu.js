import React, { Component } from 'react'
import { MenuItem, Menu } from 'semantic-ui-react'

export default class MenuVertical extends Component {
  handleItemClick = (e, { name }) => {
    window.location.href='/'+name
  }

  render() {

    return (
      <Menu>

        <MenuItem
          name='listar'
          onClick={this.handleItemClick}
        >
          Listar
        </MenuItem>
      </Menu>
    )
  }
}