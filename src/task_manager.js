function httpGet (url, callback) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      callback(xmlHttp.responseText)
    }
  }
  xmlHttp.open('GET', url, true)
  xmlHttp.send(null)
}

function httpPut (url, data) {
  let xmlHttp = new XMLHttpRequest()
  xmlHttp.open('PUT', url, true)
  xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
  xmlHttp.setRequestHeader('Accept', 'application/json; charset=utf-8')
  xmlHttp.send(data)
}

let tasks = null

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

function loadTasks () {
  httpGet('./tasks.json', function (s) {
    tasks = JSON.parse(s).tasks
    let tasksHTML = ''

    for (let i = 0; i < tasks.length; ++i) {
      tasksHTML += '<li class="collection-item" style="position:' +
            'relative"><span class="title">' + tasks[i].Title +
            '</span><span class="title"' + 'style="position: absolute;' +
            'right: 100px; top: 10px">' + tasks[i].Date + '</span><p>' + tasks[i].Description +
            '</p>' + '<a class="btn-floating btn-large waves-effect waves-light' +
        'red" id=' + tasks[i].Title + ' style="position: absolute; right: 10px;' +
        ' top: 20px" onClick="deleteTask(this.id)"><i class="material-icons">delete</i></a></li>'
    }
    document.getElementById('tasks').innerHTML = tasksHTML
  })
}

function addTask () {
  const task = getTaskFromInput()
  if (task.Title !== '' && task.Date !== '' && task.Description !== '') {
    document.getElementById('error').innerHTML = ''
    tasks.unshift(getTaskFromInput())
    httpPut('./tasks.json', JSON.stringify({'tasks': tasks}))
    loadTasks()
    resetInput()
  } else {
    document.getElementById('error').innerHTML = 'Empty or invalid input!'
  }
}

function deleteTask (title) {
  for (let i = 0; i < tasks.length; ++i) {
    if (tasks[i].Title === title) {
      tasks.splice(i, 1)
      break
    }
  }
  httpPut('./tasks.json', JSON.stringify({'tasks': tasks}))
  loadTasks()
}

window.onload = loadTasks
