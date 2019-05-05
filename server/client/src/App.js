import React, { Component } from 'react';
import Root from './components/Root'
import Libary from './components/Libary'
import Stats from './components/Stats';
import Card from './components/Card';
import * as UTIF from 'utif'
import './img/bg.jpg'
import FileViewer from 'react-file-viewer';

class App extends Component {
  state = { preview: false, notTIF: null }
  decodeIMG = (response) => {

    const arrayBuffer = new Uint8Array(response);
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    const urlCreator = window.URL || window.webkitURL;
    const imageUrl = urlCreator.createObjectURL(blob);
    const img = document.createElement('img')
    img.style.width = '450px'
    img.src = imageUrl;
    return img
  }
  decodeTIFF = (response) => {
    const ifds = UTIF.decode(response);
    const firstPageOfTif = ifds[0];
    UTIF.decodeImage(response, firstPageOfTif);
    const rgba = UTIF.toRGBA8(firstPageOfTif);

    const imageWidth = firstPageOfTif.width;
  const imageHeight = firstPageOfTif.height;

    const cnv = document.createElement('canvas');
    cnv.width = imageWidth;
    cnv.height = imageHeight;

    const ctx = cnv.getContext('2d');
    const imageData = ctx.createImageData(imageWidth, imageHeight);
    for (let i = 0; i < rgba.length; i++) {
      imageData.data[i] = rgba[i];
    }
    ctx.putImageData(imageData, 0, 0);

    return cnv
  }
  getFile = async (e, src, folder) => {

    this.setState({ preview: false, notTIF: null })
    let getUrl;
    const xhr = new XMLHttpRequest();
    const ext = e.target.textContent.toLowerCase().split('.')[1]
    const fileName = e.target.textContent.split('.')[0]
    console.log(window.location.href + `/${fileName}.${ext}`)
    if (src === 'libary') {
      getUrl = `/images/${src}/${folder}/${fileName}.${ext}`
    } else {
      getUrl = `/images/${src}/${e.target.textContent}`
    }

    xhr.responseType = 'arraybuffer';
    xhr.open('GET', getUrl);
    xhr.onload = (e) => {
      let photo;
      if (ext === 'tif' || ext === 'tiff') {
        photo = this.decodeTIFF(e.target.response)
        photo.style.width = '700px'
      } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' ){
        photo = this.decodeIMG(e.target.response)
        photo.style.width = '700px'
      }else {
        this.setState({
          notTIF: {
            path: 'http://localhost:5000' + getUrl,
            type: ext
          }
        })

      }
      this.setState({ preview: true })
      if (document.body.querySelector('#photo .card-body canvas') !== null) {
        document.body.querySelector('#photo .card-body canvas').remove();
      }
      (photo) && document.body.querySelector('#photo .card-body').append(photo)

    };
    xhr.send();
  }
  componentWillMount = async () => {
    let res = await fetch('/ditection')
    let data = await res.json()
    setInterval(async () => {
      let res = await fetch('/ditection')
      let data = await res.json()
      const storageData = JSON.parse(localStorage.getItem('data'))
      if (!storageData) {
        localStorage.setItem('data', JSON.stringify(data))
        await this.setState({ data: data.obj })
      } else if (storageData.obj.rootFiles.list.length !== data.obj.rootFiles.list.length) {
        res = await fetch('/ditection')
        data = await res.json()
        localStorage.setItem('data', JSON.stringify(data))
        await this.setState({ data: data.obj })
      }
      for (const el in data.obj.libaryFiles.list) {
        if (data.obj.libaryFiles.list[el].length !== storageData.obj.libaryFiles.list[el].length) {
          res = await fetch('/ditection')
          data = await res.json()
          localStorage.setItem('data', JSON.stringify(data))
          await this.setState({ data: data.obj })

        }
      }
    }, 500);
    await this.setState({ data: data.obj })


  }
  render() {
    let totalFiles = 0;
    if (this.state.data) {
      for (const key in this.state.data.libaryFiles.list) {
        const element = this.state.data.libaryFiles.list[key].length
        totalFiles += element
      }
    }
    return (
      <div className="container">
        {(this.state.data) &&

          <div>
            <div className="row">
              <div className="col-3 card card-stats" style={{ backgroundColor: 'transparent' }}>
                <Card
                  title='כמות קבצים לא מסווגים'
                  icon="book-open"
                  stats={this.state.data.rootFiles.list.length} />
                <Card
                  title='כמות קבצים מסווגים'
                  icon="copy"
                  stats={totalFiles} />
              </div>
              <Stats
                data={this.state.data.libaryFiles} />
            </div>
            <div className="row">
              <Root
                getFile={this.getFile}
                data={this.state.data.rootFiles} />
              <Libary
                getFile={this.getFile}
                data={this.state.data.libaryFiles} />
            </div>
            {(this.state.preview) &&
              <div className="row">
                <div id="photo" className="col-10 card text-white bg-light mb-3" style={{ margin: "2rem" }}>
                  <div className="card-header bg-primary">
                    <h3>תצוגה מקדימה</h3>
                  </div>
                  <div className="card-body">
                    {(this.state.notTIF) && 
                    <FileViewer
                      fileType={this.state.notTIF.type}
                      filePath={this.state.notTIF.path} />}
                  </div>
                </div>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default App;
