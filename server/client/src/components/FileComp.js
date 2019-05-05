import React from 'react'
const FileComp = ({ name, getFile,src,folder})=> {
  
  const type = name.toLowerCase().split('.')[1]
return (
  <li className='list-group-item'>
    <span style={{ color: 'black', cursor: 'pointer' }} onClick={(e) => getFile(e, src, folder)}>{name}</span>
    <br />
  </li>
)
  
}
export default FileComp