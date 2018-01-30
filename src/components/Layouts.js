import React, { Component } from 'react';

export default class Layouts extends Component {
	constructor(props) {
		super(props);

		this.state = {
			data: props.layouts
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

class List extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: props.list.title
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.list !== this.props.list) {
			this.setState({
				title: nextProps.list.title
			});
		}
	}

	render() {
		const state = this.state;

		return (
			<div className="list flex-space">
				<h4 onClick={() => this.props.switchLayout(this.props.id)}>
					{state.title}
				</h4>
        <button className="btn delete" onClick={() => this.props.deleteLayout(this.props.id)}>Delete</button>
      </div>
		)
	}
};

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
