import React, { Component, Fragment } from 'react';
import ColorPicker from './ColorPicker'

const MIN_SIZE = 75;
const MAX_WIDTH = 920;

class ResizableComponent extends Component {

  constructor(props) {
    super(props);

    const data = this.props.data;

    this.state = {
			resizing: false,
      dragging: false,
      showColorPicker: false,
      position: {x: data.positionX, y: data.positionY},
      backgroundColor: this.props.data.backgroundColor,
			originalY: 0,
			originalX: 0,
			// Dimensions of box
			initialBoxHeight: this.props.data.height,
			initialBoxWidth: this.props.data.width,
			boxHeight: this.props.data.height,
			boxWidth: this.props.data.width,
			maxWidth: this.props.maxWidth || MAX_WIDTH
    };

    this.dragComponent   = this.dragComponent.bind(this);
    this.resizeComponent = this.resizeComponent.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
    this.pickColor = this.pickColor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
		if (nextProps.data !== this.props.data) {
			this.setState({
				backgroundColor: nextProps.data.backgroundColor,
        initialBoxWidth: nextProps.data.width,
        initialBoxHeight: nextProps.data.height,
        position: {
          x: nextProps.data.positionX,
          y: nextProps.data.positionY
        }
			});
		}
	}

  startEvents() {
    document.addEventListener('mousemove', this.startMovement);
    document.addEventListener('mouseup', this.stopMovement);
  }

  stopEvents() {
    document.removeEventListener('mousemove', this.startMovement);
    document.removeEventListener('mouseup', this.stopMovement);
  }

	startDrag = (e) => {
		this.setState({
			dragging: true
		}, this.startEvents);
	}

  startResize = (e) => {
    this.setState({
      resizing: true,
      originalY: e.clientY,
      originalX: e.clientX
    }, this.startEvents);
  }

  changeBackgroundColor() {
    this.setState({
      showColorPicker: true
    });
  }

  pickColor(color) {
    this.setState({
      backgroundColor: color,
      showColorPicker: false
    });
  }

  startMovement = (e) => {
    if (this.state.dragging) {
      this.dragComponent(e)
    }

    if (this.state.resizing) {
      this.resizeComponent(e)
    }
  }

  stopMovement = (e) => {
		if (this.props.updateRectangle) {
			this.props.updateRectangle(this.props.id, this.state);
		}

		this.setState({
			resizing: false,
      dragging: false
		}, this.stopEvents);
	}

  dragComponent(e) {
    let pageX = e.pageX - (this.state.boxWidth / 2),
      pageY = e.pageY - (this.state.initialBoxHeight > 250 ? this.state.initialBoxHeight : 250);

    // keep within constraints
    pageX = pageX > 0 ? pageX : 0;
    pageY = pageY > 0 ? pageY : 0;

    if (e.pageX + (this.state.boxWidth / 2) > this.state.maxWidth) {
      pageX = this.state.position.x;
    }

    this.setState({
      position: {
        x: pageX,
        y: pageY
      }
    });
  }

  resizeComponent(e) {
    let newHeight = e.clientY - this.state.originalY + this.state.initialBoxHeight,
      newWidth = e.clientX - this.state.originalX + this.state.initialBoxWidth;

    // keeps it within the width of the area
    if (e.clientX > this.state.maxWidth) {
      newWidth = (this.state.maxWidth - 10) - this.state.originalX + this.state.initialBoxWidth;
    }
    // prevents rectangle from getting too small
    if (newWidth < MIN_SIZE || newHeight < MIN_SIZE) {
      newHeight  = MIN_SIZE;
      newWidth = MIN_SIZE;
    }

    this.setState({
      boxHeight: newHeight,
      boxWidth: newWidth
    });
  }

	render() {
		const outerDivStyle = {
			backgroundColor: this.state.backgroundColor,
			width:  this.state.boxWidth + 'px',
			height: this.state.boxHeight + 'px',
      left: this.state.position.x + 'px',
      top: this.state.position.y + 'px'
		};

		return (
      <Fragment>
        <div className="resize"
          ref={(box) => { this.box = box; }}
          style={outerDivStyle}>
          <span className="delete fa fa-trash-o fa-1" onClick={() => this.props.removeRectangles(this.props.id)}></span>
          <span className="drag-handler fa fa-hand-rock-o fa-2" onMouseDown={this.startDrag}></span>
          <span className="resize-handler fa fa-arrows-alt fa-1" onMouseDown={this.startResize}></span>
          <span className="color-handler fa fa-adjust fa-1" onClick={this.changeBackgroundColor}></span>
  		  </div>
        {this.state.showColorPicker &&
            <ColorPicker
              pickColor={this.pickColor}/>
        }
      </Fragment>
    );
	}
}

export default ResizableComponent;
