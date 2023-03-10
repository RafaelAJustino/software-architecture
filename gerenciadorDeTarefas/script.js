const taskList = document.getElementById('tasksList');
const inputTask = document.getElementById('addTask');
let arrTask = [];
const arrTaskStorage = 'taskList';

class Task {
    constructor(id, tarefa, checked) {
        this._id = id;
        this._tarefa = tarefa;
        this._checked = checked;
    }

    set setTask({ id, tarefa, checked }) {
        this._id = id;
        this._tarefa = tarefa;
        this._checked = checked;
    }

    get getTask() {
        return (
            {
                id: this._id,
                tarefa: this._tarefa,
                checked: this._checked,
            }
        )
    }

    _newTask(id, tarefa, checked) {
        const div = document.createElement('div')

        const objTask = `
        <input 
            type="checkbox" 
            id="task_${id}" 
            name="" 
            ${checked ? 'checked' : ''}
            onchange="checkItemF(this.id, this.checked)"
        >
        <label for="task_${id}">${tarefa}</label>
    `
        div.innerHTML = objTask;

        taskList.append(div);
        inputTask.value = '';
    }

    createTask() {
        if(this._tarefa == '') {
            const message = 'Insira um valor para sua tarefa'
            alert(message);
            throw new Error(message);
        }

        this._newTask(this._id, this._tarefa, this._checked)
    }
}

class CheckItem {
    constructor(id, val) {
        this._id = id;
        this._val = val;
    }

    handleCheck() {
        const tempId = parseInt(this._id);
        arrTask[tempId].checked = this._val;
        window.localStorage.setItem(arrTaskStorage, JSON.stringify(arrTask));
    }
}

function createTaskF() {
    const task = new Task(arrTask.length, inputTask.value, false)
    
    task.createTask();

    arrTask.push(task.getTask);
    window.localStorage.setItem(arrTaskStorage, JSON.stringify(arrTask));
}

function checkItemF(id, val) {
    const check = new CheckItem(id.replace('task_', ''), val)
    check.handleCheck();
}

window.onload = () => {
    const tempList = window.localStorage.getItem(arrTaskStorage);

    if (tempList != null) {
        arrTask = JSON.parse(tempList)

        arrTask.map((x, i) => {
            const tempTask = new Task(x.id, x.tarefa, x.checked)
            tempTask.createTask()
        })
    }

}