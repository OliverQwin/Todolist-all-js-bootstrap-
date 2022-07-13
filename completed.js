form = "todoform.js";

function createCompleted(container, title, tasks) {
    var Titles = createTitles(title);
    var AddForm = createTodoForm();
    var AddList = createTodoList();

    container.append(Titles, AddForm.form, AddList);

    for (var obj of tasks) {
        var Todoitem = createTodoitem(AddForm.input.value);

        Todoitem.Todoitem.textContent = obj.name;
        Todoitem.Todoitem.id = obj.id;

        Todoitem.Todoitem.classList.add('list-group-item-success');
        deleteTodoitem(Todoitem.Todoitem, Todoitem.deletebotton);

        AddList.append(Todoitem.Todoitem);
        Todoitem.Todoitem.append(Todoitem.deletebotton);
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