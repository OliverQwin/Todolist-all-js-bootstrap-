let TodoArray = [];
todoitem = "todoitem.js";
completed = "completed.js";

function createTitles(title) {
    var Titles = document.createElement('h1');
    Titles.innerHTML = title;

    return Titles;
}



function createTodoList() {
    var list = document.createElement('ul');
    list.classList.add('list-group');

    return list;
}

function Select_options() {
    var sel = document.getElementById('Select').selectedIndex;
    var options = document.getElementById('Select').options;

    if (options[sel].value == "completed") {
        alert('Показати ' + options[sel].text + '?');
        var allTask = JSON.parse(localStorage.TodoLIST);
        var completedTask = [];
        let j = 0;
        for (var i = 0; i < allTask.length; i++) {
            if (allTask[i].produced) {
                completedTask[j] = allTask[i];
                j++;
            }

        }
        document.getElementById('TodoLIST').remove();
        var newDiv = document.createElement("div");
        newDiv.setAttribute('id', 'TodoLIST');
        newDiv.setAttribute('class', 'container');
        document.body.append(newDiv);

        createCompleted(document.getElementById('TodoLIST'), 'Список завдань', completedTask);

        // createCompleted.
    } else if (options[sel].value == "active") {
        alert('Показати ' + options[sel].text + '?');
        window.location.reload();
    }
}

function changeItemDone(aray, item) {
    aray.map(obj => {
        if (obj.id === item.id & obj.produced === false) {
            obj.produced = true;
        } else if (obj.id === item.id & obj.produced === true) {
            obj.produced = false;
        }
    });
}

function completeTodoitem(item, boton) {
    boton.addEventListener('click', () => {
        TodoArray = JSON.parse(localStorage.getItem(key));
        item.classList.toggle('list-group-item-success');
        changeItemDone(TodoArray, item);

        localStorage.setItem(key, JSON.stringify(TodoArray));
    });
}

function deleteTodoitem(item, boton) {
    boton.addEventListener('click', () => {
        if (confirm('Ви впевнені, що хочете видалити?')) {
            TodoArray = JSON.parse(localStorage.getItem(key));

            var neaList = TodoArray.filter(obj => obj.id !== item.id);

            localStorage.setItem(key, JSON.stringify(neaList));
            item.remove();
        }
    });
}

function createTodoApp(container, title, key) {
    var Titles = createTitles(title);
    var AddForm = createTodoForm();
    var AddList = createTodoList();

    container.append(Titles, AddForm.form, AddList);

    if (localStorage.getItem(key)) {
        TodoArray = JSON.parse(localStorage.getItem(key));

        for (var obj of TodoArray) {
            var Todoitem = createTodoitem(AddForm.input.value);

            Todoitem.Todoitem.textContent = obj.name;
            Todoitem.Todoitem.id = obj.id;

            if (obj.produced == true) {
                Todoitem.Todoitem.classList.add('list-group-item-success');
            } else {
                Todoitem.Todoitem.classList.remove('list-group-item-success');
            }

            completeTodoitem(Todoitem.Todoitem, Todoitem.prodbotton);
            deleteTodoitem(Todoitem.Todoitem, Todoitem.deletebotton);

            AddList.append(Todoitem.Todoitem);
            Todoitem.Todoitem.append(Todoitem.btnwrap);
        }
    }

    AddForm.form.addEventListener('submit', e => {
        e.preventDefault();

        var Todoitem = createTodoitem(AddForm.input.value);

        if (!AddForm.input.value) {
            return;
        }
        completeTodoitem(Todoitem.Todoitem, Todoitem.prodbotton);
        deleteTodoitem(Todoitem.Todoitem, Todoitem.deletebotton);

        let localStorageData = localStorage.getItem(key);

        if (localStorageData == null) {
            TodoArray = [];
        } else {
            TodoArray = JSON.parse(localStorageData);
        }

        function createItemObj(aray) {
            var itemObj = {};
            itemObj.name = AddForm.input.value;
            itemObj.id = Todoitem.Todoitem.id;
            itemObj.produced = false;

            aray.push(itemObj);
        }

        createItemObj(TodoArray);
        localStorage.setItem(key, JSON.stringify(TodoArray));

        AddList.append(Todoitem.Todoitem);
        AddForm.input.value = '';
        AddForm.Buttons.disabled = !AddForm.Buttons.disabled;
    });
}