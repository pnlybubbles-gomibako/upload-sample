const box = document.querySelector('main')

box.addEventListener('dragover', e => {
  e.preventDefault()
  e.stopPropagation()
  e.dataTransfer.dropEffect = 'copy'
  box.innerText = 'Drop here!'
})

box.addEventListener('drop', e => {
  e.preventDefault()
  e.stopPropagation()
  Array.from(e.dataTransfer.files).forEach(file => {
    console.log(file)
    const fd = new FormData()
    fd.append('file', file, file.name)
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('load', _ => box.innerText = 'Uploaded.')
    xhr.addEventListener('error', e => console.error(e))
    xhr.upload.addEventListener('progress', e => box.innerText = `${e.loaded / e.total * 100 | 0}%...`)
    xhr.open('POST', '/upload')
    xhr.responseType = 'json'
    xhr.send(fd)
  })
})

box.addEventListener('dragenter', _ => box.classList.add('drag'))
box.addEventListener('dragleave', _ => box.classList.remove('drag'))
window.addEventListener('dragover', e => e.preventDefault())
window.addEventListener('drop', e => e.preventDefault())
