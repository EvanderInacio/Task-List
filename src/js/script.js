const input = document.querySelector('.nova-tarefa')
const button = document.querySelector('.button')
const tarefa = document.querySelector('.tarefas')

function createLi() {
  const li = document.createElement('li')
  li.style.color = '#FFFF'
  li.style.fontSize = '25px'
  li.style.fontFamily = '700'
  li.style.marginBottom = '1px'

  return li
}

input.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    if (!input.value) {
      return
    }
    createTask(input.value)
  }
})

function clearInput() {
  input.value = ''
  input.focus()
}

function createButtonClear(li) {
  li.innerHTML += ' '
  const btnClear = document.createElement('button')
  btnClear.innerHTML = 'Apagar <i class="ph-trash"></i>'

  btnClear.style.fontSize = '20px'
  btnClear.style.marginLeft = '15px'
  btnClear.style.display = 'inline-flex'
  btnClear.style.flexDirection = 'row'
  btnClear.style.justifyContent = 'center'
  btnClear.style.alignContent = 'center'
  btnClear.style.gap = '5px'
  btnClear.style.backgroundColor = 'rgb(166, 30, 30)'

  btnClear.setAttribute('class', 'apagar')
  btnClear.setAttribute('title', 'Apagar está tarefa')
  li.appendChild(btnClear)
}

function createTask(textInput) {
  const li = createLi()
  li.innerText = textInput

  tarefa.appendChild(li)
  clearInput()
  createButtonClear(li)

  saveTask()
}

button.addEventListener('click', function () {
  if (!input.value) {
    return
  }

  createTask(input.value)

  console.log(input.value)
})

document.addEventListener('click', function (e) {
  const el = e.target

  if (el.classList.contains('apagar')) {
    el.parentElement.remove()
    saveTask()
  }
})

function saveTask() {
  const liTask = tarefa.querySelectorAll('li')
  const listTasks = []

  for (let task of liTask) {
    let taskText = task.innerText
    taskText = taskText.replace('Apagar', '').trim()
    listTasks.push(taskText)
  }

  const tasksJSON = JSON.stringify(listTasks)
  localStorage.setItem('tasks', tasksJSON)

  console.log(listTasks)
}

function addTask() {
  const tasks = localStorage.getItem('tasks')
  const listTasks = JSON.parse(tasks)

  for (let task of listTasks) {
    createTask(task)
  }
}

addTask()
