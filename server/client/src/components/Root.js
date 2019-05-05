import React from 'react'
import FileComp from './FileComp'
const Root = ({data, getFile}) => {
    return (
        <div id='rootl' className="col-5 card text-black bg-light mb-3" style={{  margin: "2rem" }}>
            <div className="card-header bg-primary text-white">
                <h3>תיקיית מקור</h3>
                <sub>{data.rootPath}</sub>
            </div>
            <div className="card-body">
                <h5 className="card-title">כמות הקבצים הנוכחית בתיקייה:<span> {data.list.length}</span></h5>
                <ul className="list-group">
                    
                    {data.list.map((file, i) => {
                        return <FileComp key={i} folder={'root'} name={file} getFile={getFile} src='root'/>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Root
