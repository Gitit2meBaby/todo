const input = document.querySelector('#createTodo');
const inputCheckbox = document.querySelector('#inputCheckbox');
const todoContainer = document.querySelector('#todoContainer');
let listItem;
let counter = 0;

// CREATING A TODO
inputCheckbox.addEventListener('click', () => {
    listItem = input.value;
    createTodo();
    input.value = '';
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        listItem = input.value;
        createTodo();
        input.value = '';
    }
});

function createTodo() {
    const newTodo = document.createElement('div');
    newTodo.classList.add('todo');
    newTodo.draggable = true;
    newTodo.innerHTML = `
    <div>
    <div class="gradient-border">
        <div class="checkbox list-checkbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
                <path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" />
            </svg>
        </div>
        </div>
        <p>${listItem}</p>
    </div>
    <svg class="close-btn hidden mobile-display" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="#494C6B" fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    </svg>
    `;
    counter++
    updateCounter();


    // CLOSE BUTTON ACTIONS
    const closeBtn = newTodo.querySelector('.close-btn');
    // Show close button on hover
    newTodo.addEventListener('mouseenter', () => {
        closeBtn.classList.remove('hidden');
    });

    // Hide close button when not hovering
    newTodo.addEventListener('mouseleave', () => {
        closeBtn.classList.add('hidden');
    });

    // update counter, but first make sure it hasnt been checked
    closeBtn.addEventListener('click', () => {
        if (!newTodo.classList.contains('checked')) {
            counter--;
        }
        newTodo.remove();
        updateCounter();
    });

    todoContainer.insertBefore(newTodo, todoContainer.firstChild);
    setupDragAndDrop();
}

//MARKING TODO AS DONE
todoContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;
    const listItem = clickedElement.closest('.todo');

    if (!listItem.classList.contains('checked')) {
        counter--
    }
    if (clickedElement.classList.contains('list-checkbox')) {
        const gradientBorder = clickedElement.closest('.gradient-border');
        gradientBorder.style.backgroundColor = "white"
        listItem.classList.add('checked');
        clickedElement.style.background = 'var(--Check-Background)';
        clickedElement.style.border = 'none'

        const checkedText = listItem.querySelector('p');
        checkedText.style.color = 'var(--Light-Grayish-Blue)';
        checkedText.style.textDecoration = 'line-through';
        checkedText.style.fontWeight = '400'


        updateCounter();
    }
});


// DRAGGING TODO'S
function setupDragAndDrop() {
    const todos = document.querySelectorAll('.todo');
    const container = document.querySelector('#todoContainer');

    todos.forEach((todo, index) => {
        todo.draggable = true;
        todo.dataset.position = index;

        todo.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', todo.dataset.position);
        });

        todo.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        todo.addEventListener('drop', (e) => {
            e.preventDefault();
            const position = e.dataTransfer.getData('text/plain');
            const draggedTodo = document.querySelector(`[data-position="${position}"]`);
            const dropTarget = todo;

            if (draggedTodo && dropTarget) {
                const newPosition = dropTarget.dataset.position;
                if (newPosition !== position) {
                    // Update the positions
                    const containerChildren = Array.from(container.children);
                    containerChildren.splice(containerChildren.indexOf(draggedTodo), 1);
                    containerChildren.splice(newPosition, 0, draggedTodo);

                    // Rearrange the todos based on the updated positions
                    container.innerHTML = '';
                    containerChildren.forEach((child, index) => {
                        child.dataset.position = index;
                        container.appendChild(child);
                    });
                }
            }
        });
    });
}

setupDragAndDrop();

// UPDATE COUNTER
function updateCounter() {
    const itemsLeft = document.querySelector('#itemsLeft');

    if (counter === 0) {
        itemsLeft.textContent = "Nothing to do..";

    } else if (counter === 1) {
        itemsLeft.classList.remove('hidden');
        itemsLeft.textContent = counter + " item left";
    } else {
        itemsLeft.classList.remove('hidden');
        itemsLeft.textContent = counter + " items left";
    }
}

// Query selectors for all filter buttons
const allBtns = document.querySelectorAll('.all');
const activeBtns = document.querySelectorAll('.active');
const completedBtns = document.querySelectorAll('.completed');

let currentFilter = 'all';

// Function to add event listeners to all filter buttons
function addFilterButtonListeners(buttons, filter) {
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterTodos(filter);
            updateFilterButtons(btn);
        });
    });
}

// Add event listeners for all filter buttons
addFilterButtonListeners(allBtns, 'all');
addFilterButtonListeners(activeBtns, 'active');
addFilterButtonListeners(completedBtns, 'completed');

function filterTodos(filter) {
    const todos = document.querySelectorAll('.todo');
    currentFilter = filter;

    todos.forEach(todo => {
        if (filter === 'all') {
            todo.classList.remove('hidden');
        } else if (filter === 'active') {
            if (todo.classList.contains('checked')) {
                todo.classList.add('hidden');
            } else {
                todo.classList.remove('hidden');
            }
        } else if (filter === 'completed') {
            if (todo.classList.contains('checked')) {
                todo.classList.remove('hidden');
            } else {
                todo.classList.add('hidden');
            }
        }
    });
}

function updateFilterButtons(activeButton) {
    const buttons = [...allBtns, ...activeBtns, ...completedBtns];
    buttons.forEach(button => button.classList.remove('blue-btn'));
    activeButton.classList.add('blue-btn');
}

// Clear completed todos
const clearBtn = document.querySelector('#clear')
clearBtn.addEventListener('click', () => {
    const completedTodos = document.querySelectorAll('.todo.checked');
    completedTodos.forEach(todo => {
        todo.remove();
    });
});

filterTodos('all');
updateFilterButtons(allBtns[0]);



// DARK MODE SWITCH
const body = document.querySelector('.body')
const moonBtn = document.querySelector('#moon')
const sunBtn = document.querySelector('#sun')

moonBtn.addEventListener('click', () => {
    body.classList.remove('light-theme')
    body.classList.add('dark-theme')
    moonBtn.classList.add('hidden')
    sunBtn.classList.remove('hidden')
})
sunBtn.addEventListener('click', () => {
    body.classList.add('light-theme')
    body.classList.remove('dark-theme')
    sunBtn.classList.add('hidden')
    moonBtn.classList.remove('hidden')
})

