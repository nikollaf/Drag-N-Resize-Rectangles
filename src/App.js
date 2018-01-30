import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.scss';
import ResizableBox from './components/ResizableBox';
import LayoutNav from './components/LayoutNav';
import Header from './components/Header';
import ColorPicker from './components/ColorPicker';
import { getFromLS, saveToLS } from './utils/localStorage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      maxWidth: '',
      layouts: [],
      currentLayout: null,
      showColorPicker: false
    };

    this.addRectangles = this.addRectangles.bind(this);
    this.updateRectangle = this.updateRectangle.bind(this);
    this.removeRectangle = this.removeRectangle.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
    this.deleteLayout = this.deleteLayout.bind(this);
    this.switchLayout = this.switchLayout.bind(this);
    this.newLayout = this.newLayout.bind(this);
    this.clearLayout = this.clearLayout.bind(this);
    this.pickColor = this.pickColor.bind(this);
    this.showPickColor = this.showPickColor.bind(this);
  }

  componentDidMount() {
    const lsLayouts = getFromLS('layouts');
    // fill the state with localStorage data
    if (lsLayouts.value && lsLayouts.value.length) {
      this.setState({
  			layouts: lsLayouts.value,
        currentLayout: 0
  		});
    }

    //#Todo change maxWidth as user resizes browser
    this.setState({
      maxWidth: this.rectangleArea.clientWidth
    });
  }

  showPickColor() {
    this.setState({
      showColorPicker: true
    });
  }

  pickColor(color) {
    this.addRectangles(color);

    this.setState({
      showColorPicker: false
    });
  }

  addRectangles(color) {
    const rectangle = [{
      backgroundColor: color,
      width: 150,
      height: 150,
      positionX: 400,
      positionY: 0
		}]

    if (this.state.currentLayout !== null) {
      const currentLayout = this.state.currentLayout;

      const newData = update(this.state.layouts, {
        [currentLayout]: {rectangles: {$push: rectangle}}
      });

      this.setState({
        layouts: newData
  		});

    } else {
      this.newLayout(rectangle);
    }
  }

  updateRectangle(id, rectangle) {
    const updatedRectangle = {
      backgroundColor: rectangle.backgroundColor,
      width: rectangle.boxWidth,
      height: rectangle.boxHeight,
      positionX: rectangle.position.x,
      positionY: rectangle.position.y
		};

    const layouts = update(this.state.layouts, {
      [this.state.currentLayout]: {rectangles: {
        [id]: {$set: updatedRectangle}
      }}
    });

    this.setState({
      layouts
    });
  }

  removeRectangle(id) {
    const layouts = update(this.state.layouts, {
      [this.state.currentLayout]: {rectangles: {$splice: [[id, 1]]}}
    });

		this.setState({
			layouts
		});
	}

  newLayout(rectangle) {
    const layoutTitle = prompt('What do you want to call your layout?');

    if (!layoutTitle) {
      return;
    }

    const newLayout = [{
      title: layoutTitle,
      rectangles: rectangle.length ? rectangle : []
    }];

    const layouts = update(this.state.layouts, {$push: newLayout});

    this.setState({
      currentLayout: layouts.length - 1,
      layouts
    });
  }

  saveLayout() {
    saveToLS('layouts', this.state.layouts);
  }

  switchLayout(id) {
    this.setState({
			currentLayout: id
		});
  }

  clearLayout() {
    const layouts = update(this.state.layouts, {
      [this.state.currentLayout]: {rectangles: {$set: []}}
    });

    this.setState({
			layouts
		});
  }

  deleteLayout(id) {
    const layouts = update(this.state.layouts, {$splice: [[id, 1]]});

    this.setState({
			layouts,
      currentLayout: layouts.length ? 0 : null
		});
  }

  render() {
    const state = this.state,
      rectangles = state.layouts[this.state.currentLayout] ? state.layouts[state.currentLayout].rectangles : [];

    return (
      <div className="App">
        <Header
          addRectangles={this.showPickColor}
          saveLayout={this.saveLayout}/>
        <div className="content">
          <div className="rectangle-area"
            ref={(area) => { this.rectangleArea = area; }}>
              {rectangles.length > 0 ? (
                <div className="rectangles">
                    <span className="btn clear-layout" onClick={this.clearLayout}>
                      <i className="fa fa-times" aria-hidden="true"></i>
                      Clear Layout
                    </span>
                    {rectangles.map((data, index) => {
                        return (
                          <ResizableBox
                            key={index}
                            id={index}
                            data={data}
                            maxWidth={this.state.maxWidth}
                            updateRectangle={this.updateRectangle}
                            removeRectangle={this.removeRectangle}>
                          </ResizableBox>
                        );
                      })
                    }
                  </div>
                ) : (
                  <p>Click on add rectangle above to add rectangles.</p>
                )
              }
          </div>
          <LayoutNav
              layouts={this.state.layouts}
              newLayout={this.newLayout}
              deleteLayout={this.deleteLayout}
              switchLayout={this.switchLayout}/>
          {state.showColorPicker &&
              <ColorPicker
                pickColor={this.pickColor}/>
          }
        </div>
      </div>
    );
  }
}

export default App;
