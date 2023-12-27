// 1 task

const xText = document.querySelector('.logo')
const yText = document.querySelector('.logo2')
console.log();
[ xText.innerHTML, yText.innerHTML ] = [ yText.innerHTML, xText.innerHTML ]

// 2 task
function calculateCircleArea(radius = 0) {
    return Math.PI * Math.pow(radius, 2);
}

const radiusValue = document.querySelector('#inputCircleNum');
const resultBlock = document.querySelector('.resultCircleText'); 



const onClickCircleHandler = () => {
    if (+(radiusValue.value) > 0) {
        const circleArea = calculateCircleArea(radiusValue.value);
        resultBlock.innerHTML = `Радіус: ${radiusValue.value} => Площа: ${circleArea.toFixed(2)}`;
    } else {
        resultBlock.innerHTML = 'Невалідні дані!';
    }
}

// 3 task

const arrValue = document.querySelector('#inputMaxNum');

const onClickMaxHandler = () => {
    if (arrValue.value) {
        const numbersArray = arrValue.value.split(' ').map(vl => +vl);

        const maxNumber = Math.max(...numbersArray);

        const maxNumberCount = numbersArray.filter(num => num === maxNumber).length;

        if (maxNumberCount === 0) {
            alert('Введені значення невалідні!');
        } else {
            document.cookie = `maxNumberCount=${maxNumberCount}`;
            alert(`Кількість найбільших чисел: ${maxNumberCount}`);
        }
    } else {
        alert('Введіть числа!');
    }
};

window.onload = function() {
    const cookies = document.cookie;
    if (cookies.includes('maxNumberCount')) {
        // Parse cookies to get maxNumberCount
        const maxNumberCount = parseInt(cookies.split('; ').find(row => row.startsWith('maxNumberCount')).split('=')[1]);

        if (maxNumberCount) {
            // If there are data in cookies, display information and ask the user
            const userDecision = confirm(`Count of maximum numbers saved in cookies: ${maxNumberCount}. Delete data?`);

            if (userDecision) {
                // If the user confirms deletion, delete cookies and refresh the page
                document.cookie = 'maxNumberCount=0';
                location.reload();
            } else {
                // If the user declines, display a message about the need to reload the page
                alert('Data in cookies will remain. Reload the page to update.');
            }
        }
    }
};

// 4 task

const block2 = document.querySelector('.aside-left-top');
const inputColor = document.querySelector('#inputColor');


const savedColor = localStorage.getItem('block2Color');
if (savedColor) {
    block2.style.backgroundColor = savedColor;
    inputColor.value = savedColor
}

block2.addEventListener('mouseover', function() {
    const newColor = inputColor.value; 
    block2.style.backgroundColor = newColor;
    localStorage.setItem('block2Color', newColor);
});


// last task

function editElement(element, fontSize = 16, typeInput = 'input', columnDelay = 300, defColor = 'transparent') {
    const text = element.innerText;
    const editDiv = document.createElement('div');
    const input = document.createElement(typeInput);
    const calcPixelWidth = text.toString().length * (fontSize * 0.6) + 10;
    const columns = calcPixelWidth / columnDelay;
    const width = columns > 1 ? `${calcPixelWidth / columns}px` : `${calcPixelWidth}px`;
    const height = columns > 1 ? `${columns * fontSize}px` : 'max-content';

    input.value = text;
    input.style.width = width;
    input.style.height = height;
    input.style.fontSize = `${fontSize}px`;

    const saveButton = document.createElement('button');
    saveButton.innerText = 'Зберегти';

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Видалити';
    deleteButton.style.display = 'none';

    editDiv.appendChild(input);
    editDiv.appendChild(saveButton);
    
    element.style.display = "none";
    element.parentNode.insertBefore(editDiv, element);

    
    saveButton.addEventListener('click', function() {
        element.innerText = input.value;
        editDiv.parentNode.removeChild(editDiv);

        const uniqueId = `block_${Date.now()}`;
        localStorage.setItem(uniqueId, input.value);
        element.parentNode.style.backgroundColor = getRandomColor();
        element.style.display = "inline";
        deleteButton.style.display = "inline";
        deleteButton.dataset.itemId = uniqueId;
    });

    deleteButton.addEventListener('click', function() {
        const itemId = deleteButton.dataset.itemId;
        localStorage.removeItem(itemId);
        element.innerText = text;
        element.parentNode.style.backgroundColor = defColor;
        deleteButton.parentNode.removeChild(deleteButton);
    });

    element.parentNode.insertBefore(deleteButton, editDiv.nextSibling);

    input.addEventListener('input', function() {
        if (input.value !== text) {
            deleteButton.style.display = 'block';
        } else {
            deleteButton.style.display = 'none';
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
