const input = document.querySelector('#createTodo');
const inputCheckbox = document.querySelector('#inputCheckbox');
const todoContainer = document.querySelector('#todoContainer')
let listItem;


// CREATING A TODO
inputCheckbox.addEventListener('click', () => {
    listItem = input.value
    console.log(listItem)
    createTodo()
    input.value = ''
})

function createTodo() {
    const newTodo = document.createElement('div')
    newTodo.classList.add('todo')
    newTodo.innerHTML = `
    <div>
            <div class="checkbox list-checkbox">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
              </svg>
            </div>
            <p>${listItem}</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
            <path fill="#494C6B" fill-rule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
          </svg>
    `;
    todoContainer.appendChild(newTodo)
}

// //MARKING TODO AS DONE
// const listItemCheckbox = document.querySelectorAll('.list-checkbox')

// listItemCheckbox.forEach((check) => {
//     check.addEventListener('click', (event) => {
//         console.log('clicked');
//         const listItem = event.target.closest('todo')
//         listItem.classList.add('checked')
//         check.style.background = 'var(--Check-Background)'
//         checkedText = check.closest('p')
//         checkedText.style.color = 'var(--placeholder-text)'
//         checkedText.style.textDecoration = 'strikethrough'
//     })
// })

//MARKING TODO AS DONE
todoContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;

    // Check if the clicked element has the class 'list-checkbox'
    if (clickedElement.classList.contains('list-checkbox')) {
        const listItem = clickedElement.closest('.todo');
        listItem.classList.add('checked');
        clickedElement.style.background = 'var(--Check-Background)';

        const checkedText = listItem.querySelector('p');
        checkedText.style.color = 'var(--Light-Grayish-Blue)';
        checkedText.style.textDecoration = 'line-through';
        checkedText.style.fontWeight = '400'
    }
});