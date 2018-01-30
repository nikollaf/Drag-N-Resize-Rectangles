import React, { Component } from 'react';

export default class LayoutNav extends Component {
	constructor() {
		super();

		this.state = {
			data: []
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.layouts !== this.props.layouts) {
			this.setState({
				data: nextProps.layouts
			});
		}
	}

	_renderList() {
		const data = this.state.data;
	
		return data.map((list, index) => {
			return <List
								key={index}
                deleteLayout={this.props.deleteLayout}
                switchLayout={this.props.switchLayout}
                id={index}
								list={list}
							/>
		});
	}

	render() {
		return (
			<div className="layouts">
        {this.state.data.length > 0 && <button className="btn add-layout" onClick={this.props.newLayout}>Add New Layout</button>}
				<h3>Layouts</h3>
				{this._renderList()}
				{this.state.data.length > 0 && <Helper/>}
			</div>
		)
	}
}

const List = (props) => (
		<div className="list flex-space">
			<h4 onClick={() => props.switchLayout(props.id)}>
				{props.list.title}
			</h4>
	    <button className="btn delete" onClick={() => props.deleteLayout(props.id)}>Delete</button>
	  </div>
)

const Helper = () => (
 <div className="helper-info">
 		<h5>Helpful Info</h5>
    <ul>
			<li>
				<span className="delete fa fa-trash-o fa-1"></span>
				Click to delete rectangle
			</li>
			<li>
				<span className="drag-handler fa fa-hand-rock-o fa-2"></span>
				Click to drag rectangle across
			</li>
			<li>
				<span className="resize-handler fa fa-arrows-alt fa-1"></span>
				Click to resize the rectangle
			</li>
			<li>
				<span className="color-handler fa fa-adjust fa-1"></span>
				Click to change the background color
			</li>
		</ul>
 </div>
);
