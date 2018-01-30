import React, { Component } from 'react';

const COLOR_ARRAY = [
  '#f368e0',
  '#ff9f43',
  '#48dbfb',
  '#10ac84',
  '#ff7675',
  '#e17055',
  '#6c5ce7'
]

export default class ColorPicker extends Component {
  render() {
    return(
      <div className="color-picker">
        <h3>Pick a color</h3>
        <ul>
          {COLOR_ARRAY.map((color, index) => {
              const background = {backgroundColor: color}
              return (
                <li key={index}
                  onClick={() => this.props.pickColor(color)}>
                  <span style={background}></span>
                  <p>{color}</p>
                </li>
              );
            })
          }
        </ul>
      </div>
    )
  }
}
