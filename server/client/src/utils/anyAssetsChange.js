const anyAssetsChange = async () => {
    let res = await fetch('/ditection')
    let data = await res.json()
    const storageData = JSON.parse(localStorage.getItem('data'))
    if (!storageData) {
        localStorage.setItem('data', JSON.stringify(data))
        return data.obj;
    } else if (storageData.obj.rootFiles.list.length !== data.obj.rootFiles.list.length) {
        console.log('root file change')
        res = await fetch('/ditection')
        data = await res.json()
        localStorage.setItem('data', JSON.stringify(data))
        return data.obj;
    }
    for (const el in data.obj.libaryFiles.list) {
        console.log(el)
        if (data.obj.libaryFiles.list[el].length !== storageData.obj.libaryFiles.list[el].length) {
            console.log('libary file change')
            res = await fetch('/ditection')
            data = await res.json()
            localStorage.setItem('data', JSON.stringify(data))
            return data.obj;

        }
    }
    return false;

}
export default anyAssetsChange;

