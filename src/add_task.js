function getTaskFromInput () {
  const title = document.getElementById('title').value
  const date = document.getElementById('date').value
  const description = document.getElementById('description').value
  return {'Title': title, 'Date': date, 'Description': description}
}

function resetInput () {
  document.getElementById('title').value = ''
  document.getElementById('date').value = ''
  document.getElementById('description').value = ''
}

function httpPut (url, data) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.open('PUT', url, true)
  xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xmlHttp.setRequestHeader('Accept', 'application/json; charset=utf-8')
  xmlHttp.send(data)
}

function addTask () {
  tasks.unshift(getTaskFromInput())
  httpPut('./tasks.json', JSON.stringify({'tasks': tasks}))
  loadTasks()
  resetInput()
}
