import React, { Component } from 'react'
import Dir from './Dir';
const DirsWrapper = ({ dirs, getFile }) => (Object.keys(dirs).map((dir, i) => {
    return (
        <Dir
            getFile={getFile}
            dir={dirs[dir]}
            key={i}>
            {dir}
        </Dir>
    )
}))

class Libary extends Component {

    render() {
        const {getFile,data:{list,libaryPath}} = this.props;
        return (
            <div id="libary" className="col-5 card text-black bg-light mb-3" style={{ margin: "2rem" }}>
                <div className="card-header bg-primary text-white">
                <h3>תיקיית יעד</h3>
                    <sub>{libaryPath}</sub>
                </div>
                <div className="card-body">
                    <h5 className="card-title">כמות התיקיות המסווגות:<span> {Object.keys(list).length} </span></h5>
                    <div className="card-text">
                        
                        {<DirsWrapper getFile={getFile} dirs={list} />}
                    </div>
                </div>
            </div>
        )
    }
}


export default Libary
