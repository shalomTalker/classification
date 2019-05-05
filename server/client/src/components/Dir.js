import React, { Component } from 'react'
import ResizingDir from './ResizingDir';

export default class Dir extends Component {
  state = {
    height: 0,
  };
  toggle = () => {
    const { height } = this.state;

    this.setState({
      height: height === 0 ? 'auto' : 0,
    });
  };
  render() {
    const { dir, getFile } = this.props
    const { height } = this.state;
    return (
      <ul className='list-group'>
        <li className='list-group-item bg-light'>
          <span
            style={{ cursor: "pointer" }}
            onClick={this.toggle}>
            {height === 0 ? <i className="fas fa-folder-plus"></i> : <i className="fas fa-folder-minus"></i>}{' ' + this.props.children}{height !== 0 && <p>כמות הקבצים בתיקייה:{dir.length}</p>}
            <br />
          </span>
        </li>
        <ResizingDir folder={this.props.children} getFile={getFile} height={height} dir={dir}></ResizingDir>
      </ul>
    )
  }
}
