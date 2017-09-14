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
