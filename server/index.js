const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fs = require('fs')
const path = require('path')
const cors = require('cors')


const app = express();
app.disable('X-Powered-By')
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())
const { rootPath, libaryPath } = JSON.parse(fs.readFileSync('../conf.json', 'utf8'))
app.use('/images/root/', express.static(rootPath))
app.use('/images/libary/', express.static(libaryPath))
app.get('/ditection', (req, res) => {
    const obj = {
        rootFiles: { rootPath, list: [] },
        libaryFiles: { libaryPath, list: {} }
    }
    const files = fs.readdirSync(rootPath)
    obj.rootFiles.list = files

    const subDirs = fs.readdirSync(libaryPath)
    subDirs.forEach(subDir => {
        const dirPath = path.join(libaryPath, subDir)
        const libaryFiles = fs.readdirSync(dirPath)
        obj.libaryFiles.list[subDir] = libaryFiles
    });
    res.json({ obj })
})

app.listen('5000', () => {
    console.log('listening on port 5000')
    console.log("root-path:", rootPath)
    console.log("libary-path:", libaryPath)
})
