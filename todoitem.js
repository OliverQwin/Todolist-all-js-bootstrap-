function createTodoitem(name) {
    var Todoitem = document.createElement('li');
    var btnwrap = document.createElement('div');
    var prodbotton = document.createElement('button');
    var deletebotton = document.createElement('button');

    var randomId = Math.random();
    Todoitem.id = randomId.toFixed(2);

    Todoitem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    prodbotton.classList.add('btn', 'btn-success');
    deletebotton.classList.add('btn', 'btn-danger');
    Todoitem.textContent = name;
    prodbotton.textContent = 'Завершити';
    deletebotton.textContent = 'X';

    btnwrap.append(prodbotton, deletebotton);
    Todoitem.append(btnwrap);

    return {
        Todoitem,
        prodbotton,
        deletebotton,
        btnwrap
    }
}