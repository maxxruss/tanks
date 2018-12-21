var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var gameIsRunning = true;
var direction = 'y-';
var bullet_id = 1;
var oldDirection = 'y-';
var tank_timer;
var TANK_SPEED = 300;
var BULLET_SPEED = 300;
var directionBullet;
var oldDirectionBullet;
var new_unit;

var tank = new Tank();

$('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

/**
 * Генерация игрового поля*/

var $table = $('.game_field');
for (var i = 0; i <= FIELD_SIZE_X; i++) {
    var $row = $('<tr />', {
        class: 'row-' + i
    });
    for (var j = 0; j <= FIELD_SIZE_Y; j++) {
        var $sell = $('<td />', {
            class: ('sell-' + j + '-' + i)
        });
        $row.append($sell);
    }
    $table.append($row);
}


function Tank() {
    // this.direction = 'y-';
    // this.Olddirection = 'y-';
    // this.bullet_id = 1;
}

/**Расположение танка*/

Tank.prototype.location = function () {
    var start_coords_x = FIELD_SIZE_X / 2;
    var start_coords_y = FIELD_SIZE_Y / 2;

    var $coordsTank = $('.sell-' + start_coords_x + '-' + start_coords_y);

    $coordsTank.addClass('tank');
    $coordsTank.attr('data-x', start_coords_x.toString());
    $coordsTank.attr('data-y', start_coords_y.toString());
    $coordsTank.attr('bullet-id', bullet_id);
};

/**Движение танка*/

Tank.prototype.move = function () {

    var tankItem = $('.tank');

    // this.coords_x = parseInt(tankItem.attr('data-x'));
    // this.coords_y = parseInt(tankItem.attr('data-y'));

    var coords_x = parseInt(tankItem.attr('data-x'));
    var coords_y = parseInt(tankItem.attr('data-y'));


    switch (this.direction) {
        case'x-':
            new_unit = $('.sell-' + (coords_x -= 1) + '-' + (coords_y));
            break;
        case'x+':
            new_unit = $('.sell-' + (coords_x += 1) + '-' + (coords_y));
            break;
        case'y-':
            new_unit = $('.sell-' + (coords_x) + '-' + (coords_y -= 1));
            break;
        case'y+':
            new_unit = $('.sell-' + (coords_x) + '-' + (coords_y += 1));
            break;
    }

    tankItem.removeClass('tank');
    tankItem.removeAttr('data-x');
    tankItem.removeAttr('data-y');
    tankItem.removeAttr('bullet-id');

    new_unit.addClass('tank');
    new_unit.attr('data-x', coords_x.toString());
    new_unit.attr('data-y', coords_y.toString());
    new_unit.attr('bullet-id', bullet_id);

    // this.oldDirection = this.direction;
};

/**Выстрел танка*/

function Bullet(id, direction) {
    this.id = id;
    this.direction = direction;
    console.log(this.id, this.direction)
}

Bullet.prototype.shot = function () {
    console.log(this.id, this.direction);

    var $bulletItem = $('[bullet-id = "' + this.id + '"]');
    console.log($bulletItem);

    var $bullet_coords_x = parseInt($bulletItem.attr('data-x'));
    var $bullet_coords_y = parseInt($bulletItem.attr('data-y'));


    // this.direction = tank.direction;

    switch (this.direction) {
        case'x-':
            $bullet_coords_x -= 1;
            break;
        case'x+':
            $bullet_coords_x += 1;
            break;
        case'y-':
            $bullet_coords_y -= 1;
            break;
        case'y+':
            $bullet_coords_y += 1;
            break;
    }

    var $newBulletItem = $('.sell-' + ($bullet_coords_x) + '-' + ($bullet_coords_y));

    $bulletItem.removeClass('bullet');
    $bulletItem.removeAttr('data-x');
    $bulletItem.removeAttr('data-y');
    $bulletItem.removeAttr('bullet-id');

    $newBulletItem.addClass('bullet');
    $newBulletItem.attr('data-x', $bullet_coords_x.toString());
    $newBulletItem.attr('data-y', $bullet_coords_y.toString());
    $newBulletItem.attr('bullet-id', this.id);
    oldDirectionBullet = directionBullet;
};


/**Старт игры*/

function startGame() {
    tank.location();
    // clearInterval(tank_timer);
    // setInterval(move, TANK_SPEED);
    var $bulletItem = $('[bullet-id = "' + this.id + '"]');
    console.log($bulletItem);
}


// function bulletRelocation() {
//
//     var tank = d.querySelector('.tank');
//
//     var bullet_coords_x = parseInt(tank.getAttribute('data-x'));
//     var bullet_coords_y = parseInt(tank.getAttribute('data-y'));
//
//     var start_bullet;
//
//     switch (direction) {
//         case'x-':
//             start_bullet = d.querySelector('.sell-' + (bullet_coords_x -= 1) + '-' + (bullet_coords_y));
//             break;
//         case'x+':
//             start_bullet = d.querySelector('.sell-' + (bullet_coords_x += 1) + '-' + (bullet_coords_y));
//             break;
//         case'y-':
//             start_bullet = d.querySelector('.sell-' + (bullet_coords_x) + '-' + (bullet_coords_y -= 1));
//             break;
//         case'y+':
//             start_bullet = d.querySelector('.sell-' + (bullet_coords_x) + '-' + (bullet_coords_y += 1));
//             break;
//     }
//
//
//     start_bullet.classList.add('bullet');
//     start_bullet.setAttribute('data-x', bullet_coords_x.toString());
//     start_bullet.setAttribute('data-y', bullet_coords_y.toString());
// }


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
            setInterval(function () {
                var bullet = new Bullet(bullet_id, tank.direction);
                bullet.shot();
            }, BULLET_SPEED);
            bullet_id++;
            break;
    }
}

