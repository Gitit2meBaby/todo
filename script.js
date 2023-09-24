const input = document.querySelector('#createTodo');
const inputCheckbox = document.querySelector('#inputCheckbox');
const todoContainer = document.querySelector('#todoContainer');
let listItem;

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
    <svg class="close-btn hidden" xmlns="http://www.w3.org/2000/svg" width="18" height="18">
        <path fill="#494C6B" fill-rule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    </svg>
    `;


    // CLOSE BUTTON ACTIONS
    const closeBtn = newTodo.querySelector('.close-btn');
    // Show close button on hover
    newTodo.addEventListener('mouseenter', () => {
        closeBtn.classList.remove('hidden');
    });

    // Hide close button when not hovering
    newTodo.addEventListener('mouseleave', () => {
        // const closeBtn = newTodo.querySelector('.close-btn');
        closeBtn.classList.add('hidden');
    });

    closeBtn.addEventListener('click', () => {
        newTodo.remove()
    })



    todoContainer.insertBefore(newTodo, todoContainer.firstChild);
    setupDragAndDrop();
}

//MARKING TODO AS DONE
todoContainer.addEventListener('click', (event) => {
    const clickedElement = event.target;

    // Check if the clicked element has the class 'list-checkbox'
    if (clickedElement.classList.contains('list-checkbox')) {
        const listItem = clickedElement.closest('.todo');
        const gradientBorder = clickedElement.closest('.gradient-border');
        gradientBorder.style.backgroundColor = "white"
        listItem.classList.add('checked');
        clickedElement.style.background = 'var(--Check-Background)';
        clickedElement.style.border = 'none'

        const checkedText = listItem.querySelector('p');
        checkedText.style.color = 'var(--Light-Grayish-Blue)';
        checkedText.style.textDecoration = 'line-through';
        checkedText.style.fontWeight = '400'
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
