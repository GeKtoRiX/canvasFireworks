// Импортирование css файлов в .js файл.
import style from './main.css';

// Доступ к html элементу canvas по ID.
const htmlCanvas = document.getElementById('canvas');
// Подключение 2d движка Canvas.
const canvas = htmlCanvas.getContext('2d');
// Расширение холста на всю страницу браузера.
htmlCanvas.width = window.innerWidth - 4;
htmlCanvas.height = window.innerHeight - 4;
// Динамическое расширение холста на всю страницу экрана.
addEventListener('resize', () => {
    htmlCanvas.width = window.innerWidth - 4;
    htmlCanvas.height = window.innerHeight - 4;
})
// Структура хранения позиции курсора мыши.
var mouse = {
    x: htmlCanvas.width / 2,
    y: htmlCanvas.height / 2,
}
// Константа изменения скорости падения элементов)(Гравитация).
const gravity = 0.005;
// Константа уменьшения скорости падения(Трение).
const friction = 0.99;
// Создание экземпляров объектов в феерверках.
class Particle {
    // Начальные значения каждого объекта феерверков.
    constructor(x, y, radius, velocity, color) {
        // Координата по оси x.
        this.x = x;
        // Координата по оси y.
        this.y = y;
        // Скорость движения(отрисовки) элементов.
        this.velocity = velocity;
        // Радиус каждого элемента.
        this.radius = radius;
        // Цвет каждого элемента.
        this.color = color;
        // Прозрачность каждого элемента(1 - 0% прозрачности).
        this.opacity = 1;
    }
    // Отрисовка элемента со свойствами конструктора.
    draw() {
        // Сохранение исходного состояния холста.
        canvas.save();
        // Установка изначальной прозрачности объекту. 
        canvas.globalAlpha = this.opacity;
        // Начало отрисовки окружности.
        canvas.beginPath();
        // Отрисовка окружности со свойствами конструктора.
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 180, false);
        // Наложение цвета на элемент через свойтво конструктора.
        canvas.fillStyle = this.color;
        // Отрисовка окружности.
        canvas.fill();
        // Коней отрисовки окружности.
        canvas.closePath();
        // Восстановление исходного состояния холста.
        canvas.restore();
    }
    // Изменение положения каждого элемента в массиве.
    update() {
        // Отрисовка отдельного элемента.
        this.draw();
        // Уменьшение скорости элемента по координате x.
        this.velocity.x *= friction;
        // Уменьшение скорости элемента по координате y.
        this.velocity.y *= friction;
        // Увеличение скорости элемента по координате y.
        this.velocity.y += gravity;
        // Основная скорость смещения элеметов по координате x.
        this.x += this.velocity.x;
        // Основная скорость смещения элеметов по координате y.
        this.y += this.velocity.y;
        // Ументшение прозрачности.
        this.opacity -= 0.002;
    }
}
// Указатель массива частиц(элементов).
let particles;
// Функция создания пустого массива.
function init() {
    particles = [];
}
// Рекурсионная отрисовка частиц(элементов).
function animate() {
    // Изменение прозрачности черного холста.
    canvas.fillStyle = 'rgba(0,0,0,0.05)';
    //  Отрисовка холста.
    canvas.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
    // Цикл отрисовки каждого элемента в массиве.
    particles.forEach((particle, i) => {
        // Отрисовывается только не прозрачный элемент.
        if (particle.opacity > 0) {
            particle.update();
        }
        // Прозрачный элемент удаляется из массива.
        else {
            particles.splice(i, 1);
        }
    });
    // Функция запроса следующего кадра.
    requestAnimationFrame(animate);
}
// Создание массива элементов.
init();
// Отрисовка элементов массива.
animate();
// Отрисовка элементов массива при клике мыши.
window.addEventListener('click', (event) => {
    // Заполнение структуры mouse кординатами курсора.
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    // Радиус окружностой по умолчанию.
    const radius = 10;
    // Кол-во элементов в массиве.
    const particleCount = 200;
    // Сила разлета элементов от центра.
    const power = 10;
    // Градус движения элемента на окружности. 0-360.
    const angleIncrement = (Math.PI * 2) / particleCount;
    // Заполнение массива элементов.
    for (let i = 0; i < particleCount; i++) {
        // Создание элемента феерверка в массиве.
        particles.push(new Particle(mouse.x, mouse.y, radius, {
            // Получение координаты x через cos угла, случайное изменение направляения и силу разлета.
            x: (Math.cos(angleIncrement * i) * Math.random()) * power,
            // Получение координаты y через sin угла, случайное изменение направляения и силу разлета.
            y: (Math.sin(angleIncrement * i) * Math.random()) * power,
            // Случайное изменение цвета элемента 0-360 градусов.
        }, `hsl(${Math.random() * 360},50%, 50%)`));
    }
})
