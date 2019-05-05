import React, { Component } from 'react';
import AnimateHeight from 'react-animate-height';
import FileComp from './FileComp'

export default class ResizingDir extends Component {
   
    render() {

        const { dir, height, getFile, folder } = this.props;
        return (
            <div>
                
                <AnimateHeight
                    duration={500}
                    height={height}
                >
                       
                    <ul className='list-group'>
                        {dir.map((file,i) => {
                            return <FileComp folder={folder} src={'libary'} getFile={getFile} key={i} name={file}/>
                        })}
                    </ul>
                </AnimateHeight>
            </div>
        )
    }
}
