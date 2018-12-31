/**Старт игры*/
var enemy = new Enemy();
var animation = new Animation();
var tank = new Tank('tank', 'tank', 1);

// // var direction = 'y-';
// var bullet_id = 1;
// var oldDirection = 'y-';
// var tank_timer;
// var TANK_SPEED = 300;
var BULLET_SPEED = 50;
var ENEMY_SPEED = 400;
// var directionBullet;
// var oldDirectionBullet;
var enemyCount = 3;
var tankCount = 1;
var enemy_unit_timer = [];
var enemy_bullet_timer = [];



/**Генерация игрового поля*/

var table = $('.game_field');
for (var i = 0; i <= FIELD_SIZE_X + 2; i++) {
    var row = $('<tr />', {
        class: 'row-' + i
    });
    for (var j = 0; j <= FIELD_SIZE_Y + 2; j++) {

        if (i === 0 || i === FIELD_SIZE_Y + 2 || j === 0 || j === FIELD_SIZE_Y + 2) {
            var cell_class = ' outer_perimeter'
        } else {
            cell_class = ' field_cell';
        }
        var sell = $('<td />', {
            class: 'cell-' + j + '-' + i + cell_class
        });
        row.append(sell);
    }
    table.append(row);
}

/**Орел в штабе*/
var cell_general_1 = $('.cell-10-20');

cell_general_1.removeClass('field_cell')
    .addClass('general');

var cell_general_2 = $('.cell-11-20');

cell_general_2.removeClass('field_cell')
    .addClass('general');

var cell_general_3 = $('.cell-10-21');

cell_general_3.removeClass('field_cell')
    .addClass('general');

var cell_general_4 = $('.cell-11-21');

cell_general_4.removeClass('field_cell')
    .addClass('general');

var unitImage = $('<div />', {
    class: 'eagle'
});

unitImage.appendTo(cell_general_3);


// $('.start_game').on('click', startGame);
$(document).on('keydown', changeDirection);

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
            var bullet = new Bullet(tank.bullet_id, tank.direction, tank.type, tank.type_unit);
            bullet.shot();
            setInterval(function () {
                bullet.flightBullet();
            }, BULLET_SPEED);
            tank.bullet_id++;
            console.log(tank.type_unit);
            break;
    }
}


function create_tank(type, type_unit, id_bullet) {

    var tank = new Tank(type, type_unit, id_bullet);

    animation.appearance($('.cell-' + tank.coords_x + '-' + tank.coords_y));

    function tank_location() {
        tank.location();
    }

    // console.log(type, type_unit, id_bullet)

    /**Танк появляется только после окончания анимации*/

    setTimeout(tank_location, 2150);
}


function create_enemy(type, type_unit, id_bullet) {
    /**Создаем объект вражеского танка*/
    var enemy = new Enemy(type, type_unit, id_bullet);

    /**Запускаем анимацию перед появлением*/
    animation.appearance($('.cell-' + enemy.coords_x + '-' + enemy.coords_y));


    /**Танк начинает двигаться только после окончания анимации*/
    setTimeout(begin_move_shot, 2150);

    function begin_move_shot() {
        console.log(enemy.type);


        /**Танк появляется в начальной точке*/
        enemy.location();

        /**Задаем скорость передвижения танка*/
        enemy_unit_timer.push(setInterval(function () {
            enemy.enemyMove();
        }, ENEMY_SPEED));

        enemy_bullet_timer.push(setInterval(function () {

            /**Создаем модель снаряда*/
            var bulletEnemy = new Bullet(enemy.bullet_id, enemy.direction, type, type_unit);

            /**Выстрел танка - сняряд вылетел из танка*/
            bulletEnemy.shot();
            var timerEnemy = setInterval(function () {

                /**Задаем скорость движения снаряда*/
                bulletEnemy.flightBullet();
                if (!bulletEnemy.flight) {
                    clearInterval(timerEnemy);
                }
            }, BULLET_SPEED);
        }, 1500));
    }
}


function startGame() {

    for (var i = 1; i <= enemyCount; i++) {
        create_enemy('enemy', 'enemy_' + i, i * 500);
    }

    create_tank('tank', 'tank_' + tankCount, 100 * tankCount++);
}

/**
 * Функция завершения игры
 */
function game_over() {
    enemy_unit_timer.forEach(clearInterval);
    enemy_bullet_timer.forEach(clearInterval)
}

startGame();


