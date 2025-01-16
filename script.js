const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.createElement('div'); // Создаем элемент для очков
let isJumping = false;
let score = 0; // Очки
let speed = 3000; // Начальная скорость (в миллисекундах)

// Добавляем отображение очков
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.fontWeight = 'bold';
scoreDisplay.innerText = `Score: ${score}`;
document.body.appendChild(scoreDisplay);

// Функция прыжка
function jump() {
    if (isJumping) return;
    isJumping = true;

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 150) {
            clearInterval(jumpInterval);

            const fallInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallInterval);
                    isJumping = false;
                } else {
                    jumpHeight -= 5;
                    character.style.bottom = `${20 + jumpHeight}px`;
                }
            }, 20);
        } else {
            jumpHeight += 5;
            character.style.bottom = `${20 + jumpHeight}px`;
        }
    }, 20);
}

// Проверка столкновения
setInterval(() => {
    const characterRect = character.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        characterRect.right > obstacleRect.left &&
        characterRect.left < obstacleRect.right &&
        characterRect.bottom > obstacleRect.top
    ) {
        alert(`Game Over! Final Score: ${score}`);
        obstacle.style.animation = 'none';
        obstacle.style.right = '0px';
        score = 0; // Сбрасываем очки
        speed = 2000; // Сбрасываем скорость
        obstacle.style.animation = `moveObstacle ${speed / 1000}s linear infinite`;
        scoreDisplay.innerText = `Score: ${score}`;
    }
}, 10);

// Увеличение очков и ускорение игры
obstacle.addEventListener('animationiteration', () => {
    score++; // Увеличиваем очки
    scoreDisplay.innerText = `Score: ${score}`;
    if (speed > 500) { // Ускоряем, но не ниже определенного порога
        speed -= 100;
        obstacle.style.animation = `moveObstacle ${speed / 1000}s linear infinite`;
    }
});

// Анимация препятствия
obstacle.style.animation = `moveObstacle ${speed / 1000}s linear infinite`;

// Обработка клавиш
document.addEventListener('keydown', jump);

// CSS для анимации препятствия
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes moveObstacle {
        0% { right: -50px; }
        100% { right: 850px; }
    }
`, styleSheet.cssRules.length);
