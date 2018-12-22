

/**Старт игры*/
var tank = new Tank('tank');
tank.direction = 'y-';

var enemy = new Enemy('enemy');
enemy.direction = 'y-';

var enemy1 = new Enemy('enemy1');
enemy1.direction = 'y-';

startGame();

// $('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

function startGame() {
    // clearInterval(tank_timer);
    // setInterval(move, TANK_SPEED);
    // var bulletItem = $('[bullet-id = "' + bullet_id + '"]');
    // console.log(bulletItem);
    tank.location();
    enemy.location();
    // enemy1.location();
    setInterval(function () {
        enemy.enemyMove();
        // enemy1.enemyMove();
    }, ENEMY_SPEED)

}



function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            tank.direction = 'x-';
            tank.move();
            break;
        case 38: // Клавиша вверх
            tank.direction = 'y-';
            tank.move();
            break;
        case 39: // Клавиша вправо
            tank.direction = 'x+';
            tank.move();
            break;
        case 40: // Клавиша вниз
            tank.direction = 'y+';
            tank.move();
            break;
        case 32: // Выстрел
            var bullet = new Bullet(tank.bullet_id, tank.direction);
            setInterval(function () {
                bullet.shot();
                console.log(tank.bullet_id);

            }, BULLET_SPEED);
            tank.bullet_id++;
            break;
    }
}


