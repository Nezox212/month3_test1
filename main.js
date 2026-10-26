//1) Напишите функцию, которая проверяет, содержит ли строка только цифры. Используйте регулярные выражения
//
// пример:
// const regExp = /Регулярные выражения/
//
// const containsOnlyDigits = (str) => {
//     return // Ваш код
// }
//
// console.log(containsOnlyDigits("12345")); // Выведет true
// console.log(containsOnlyDigits("12a45")); // Выведет false
//

const regex = /^\d+$/
const containsOnlyDigits = (str) => {
    return  regex.test(str);
}
console.log(containsOnlyDigits("12345"))
console.log(containsOnlyDigits("123a56"))



// 2) Напишите функцию, которая каждую секунду выводит в консоль сообщение "Прошла секунда". Используйте setInterval
//
// Пример вывода:
//
//     console.log("Прошла секунда"); // 1
// console.log("Прошла секунда"); // 2
// console.log("Прошла секунда"); // 3

let sec = 0;
const timer = () => {
        setInterval(() => {
            console.log(`Прошла секунда`);
            sec++
        },1000)
    };
   timer();


//
// 3) Вывести числа от 1 до 10 с интервалом в 1 секунду, затем остановить.
//
// Пример функции:
//
// const count = () => {
//     let i = 1;
//     const interval = setInterval( // Правильно продолжите... );
// }

const timerToTen = () => {

    let i = 1;
    const interval = setInterval(() => {
        if (i === 10) {clearInterval(interval);}
        console.log(i);
        i++
    },1000)

    };
timerToTen();



// 4)
// Реализуйте таймер обратного отсчёта, который считает время от 10 секунд до нуля,
// с кнопками start, stop и reset, на 0 он останавливается

const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
const timerDiv = document.querySelector('.timer');
let activeTimer = null;
startButton.onclick = () => {
    console.log(1123123124)
    if (activeTimer) {return}
    activeTimer = setInterval(() => {
        if (timerDiv.textContent > 0) {
            timerDiv.textContent--
        }
    },1000)
}
stopButton.onclick = () => {
    clearInterval(activeTimer);
    activeTimer = null;
}

resetButton.onclick = () => {
    clearInterval(activeTimer);
    activeTimer = null;
    timerDiv.textContent = 10;
}

//5) Создать блок 150 на 150 пикселей и получить его через дом элементы при нажатии на которую будет
// меняться его задний фон при повторном нажатии будет убираться цвет заднего фона - выполните эту
// задачу с использованием classList и его методов

const blockElement = document.querySelector('#block');
blockElement.addEventListener('click', () => {
    blockElement.classList.toggle('active');
})


//6) Отправить GET запрос на такой JSON и создать файл test.json и на него делать запрос
// Пример JSON
//
// {
//   "key1": "value",
//   "key2": "value",
//   "key3": "value"
// }
//
// Используйте XHR и выведи полученные данные в консоль

const xhr = new XMLHttpRequest();

xhr.open('GET', 'test.json');

xhr.onload =  () => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        console.log(data);
    } else {
        console.error('Ошибка:', xhr.status);
    }
};

xhr.onerror = function () {
    console.error('Ошибка сети');
};

xhr.send();

//7) Поиск пользователя по логину и отображение карточки (если найден),
// если пользователь не найден вывести соответсвующее сообщение. Если запрос не проходит успешно,
// то отобразить тоже соответствующее сообщение. Нужно делать запрос на ниже json при нажатии на кнопку
// проверить. Создать самому users.json и на него делать запрос
//
// <input type="text" id="loginInput" placeholder="Введите логин">
// <button id="checkBtn">Проверить</button>
//
// <div id="userCard"></div>
// <p id="message"></p>
//
// ‘json’ файл должен содержать и создать его необходимо
// [
//   {
//     "login": "admin",
//     "role": "Администратор",
//     "email": "admin@gmail.com"
//     "image": ""
//   },
//   {
//     "login": "user",
//     "role": "Пользователь",
//     "email": "user@gmail.com"
//     "image": ""
//   }
// ]

const loginInput = document.querySelector('#loginInput');
const checkBtn = document.querySelector('#checkBtn');
const userCard = document.querySelector('#userCard');
const message = document.querySelector('#message');



checkBtn.onclick = () => {
    userCard.innerHTML = '';
    message.textContent = '';
    let loginSearch = loginInput.value.trim()
    fetch("users.json")
        .then(res => {
            if (!res.ok) throw new Error('Ошибка запроса');
            return res.json();
        })
        .then(data => {
           const user = data.find((user) => user.login === loginSearch)
            if (user) {
                userCard.innerHTML = `
    <h3>${user.login}</h3>
    <p>Роль: ${user.role}</p>
    <p>Email: ${user.email}</p>
    ${user.image ? `<img src="${user.image}" alt="${user.login}">` : ''}
`;            }
            else {
                message.textContent = 'Пользователь не найден';
            }

        }).catch(error => {
        console.warn(error);
        message.textContent = 'Не удалось загрузить данные';
    });
}



//8) Напишите три функции, каждая из которых возвращает Promise, разрешающийся через setTimeout
// (например, имитация загрузки данных пользователя, постов и комментариев с разной задержкой - 1с, 2с, 3с).
// Используя Promise.all(), дождитесь выполнения всех трёх и выведите объединённый результат в консоль.
// Если хотя бы один Promise завершится с ошибкой (reject), обработайте это через .catch().



function getUser() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ id: 1, name: 'Анна' });
        }, 1000);
    });
}

function getPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'Первый пост' },
                { id: 2, title: 'Второй пост' }
            ]);
        }, 2000);
    });
}

function getComments() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: 'Отличный пост!' },
                { id: 2, text: 'Спасибо за информацию' }
            ]);
        }, 3000);
    });
}

Promise.all([getUser(), getPosts(), getComments()])
    .then(([user, posts, comments]) => {
        console.log({ user, posts, comments });
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });


//9) Реализуйте функцию getUserData(id), которая с помощью fetch и async/await делает
// GET-запрос к https://jsonplaceholder.typicode.com/users/{id}, оборачивает вызов в
// try/catch/finally, в finally выводит "Запрос завершён" независимо от результата.

const getUserData = async (id) => {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error('Не удалось получить данные:', error);
    } finally {
        console.log('Запрос завершён');
    }
};

getUserData(1);

//10) Создать POST запрос на https://jsonplaceholder.typicode.com/photos и вывести то,
// что отдает сервер при успешном запросе и если вдруг будет ошибка, тоже вывести текст.
const createPhoto = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                albumId: 1,
                title: 'Моё новое фото',
                url: 'https://example.com/photo.jpg',
                thumbnailUrl: 'https://example.com/thumb.jpg'
            })
        });

        if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);

        const data = await res.json();
        console.log('Ответ сервера:', data);
    } catch (error) {
        console.error('Не удалось отправить данные:', error.message);
    }
};

createPhoto();