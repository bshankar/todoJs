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

let tasks = null

function loadTasks () {
  httpGet('./tasks.json', function (s) {
    tasks = JSON.parse(s).tasks
    let tasksHTML = ''

    for (let i = 0; i < tasks.length; ++i) {
      tasksHTML += '<li class="collection-item" style="position:' +
            'relative" id="' + tasks[i].Title + '"><span class="title">' + tasks[i].Title +
            '</span><span class="title"' + 'style="position: absolute;' +
            'right: 100px; top: 10px">' + tasks[i].Date + '</span><p>' + tasks[i].Description +
            '</p>' + '<a class="btn-floating btn-large waves-effect waves-light' +
            'red" style="position: absolute; right: 10px; top: 20px"><i class="material-icons">delete</i></a></li>'
    }
    document.getElementById('tasks').innerHTML = tasksHTML
  })
}

window.onload = loadTasks
