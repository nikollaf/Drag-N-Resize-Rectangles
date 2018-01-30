import React from 'react';

const Header = (props) => (
 <div className="header">
    <h1>Rectanglemania</h1>
    <button className="btn" onClick={props.addRectangles}>Add Rectangle</button>
    <button className="btn" onClick={props.saveLayout}>Save Layouts</button>
 </div>
);

export default Header;
