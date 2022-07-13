function createTodoForm() {
    var form = document.createElement('form');
    var input = document.createElement('input');
    var Buttons = document.createElement('button');
    var wrap = document.createElement('div');

    Buttons.disabled = !input.value.length;

    input.addEventListener('input', () => {
        Buttons.disabled = !input.value.length;
    });

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введіть нове завдання';
    Buttons.classList.add('btn', 'btn-primary');
    wrap.classList.add('input-group-append');
    Buttons.textContent = '+';

    wrap.append(Buttons);
    form.append(input);
    form.append(wrap);

    return {
        form,
        input,
        Buttons
    }
}