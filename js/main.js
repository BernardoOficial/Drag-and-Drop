$ = document.querySelector.bind(document);
all = document.querySelectorAll.bind(document);

// Precisamos selecionar o que será arrastado e mudado de posição
const draggables = all('.draggable');

// Além disso, precisamos selecionar o elemento onde poderão ocorrer essas modificações 
const containers = all('.container');

draggables.forEach(draggable => {

    // Evento ativado quando começar o arrasto
    draggable.addEventListener('dragstart', () =>
        draggable.classList.add('dragging'));

    // Evento ativado quando terminar o arrasto
    draggable.addEventListener('dragend', () =>
        draggable.classList.remove('dragging'));
})

containers.forEach(container => {

    // Os elementos pais vão executar esse eventos 
    // quando estiverem com o elemento filhos com drag start ativo
    // e estiverem por cima de seu pai
    container.addEventListener('dragover', e => {

        e.preventDefault() // Alterar o curso de proibido para arrastavel

        // Elemento mais próxima que vem depois do elemento que está sendo arrastado.
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = $('.dragging');

        // Se não tiver elementos depois do elemento arrastavel, inserir depois desse elemento after
        if (afterElement == null) {
            container.appendChild(draggable);
        }
        else { // Se tiver elementos depois do elemento arrastavel, inserir antes desse elemento after
            container.insertBefore(draggable, afterElement);
        }

    })
})

function getDragAfterElement(container, y) {

    // Selecionar todos os elementos, menos aquele que está sofrendo o evento de dragging
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {

        // função para conseguir as dimensões da caixa
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }
        }
        else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}