var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var gameIsRunning = true;
var direction = 'y-';
var bullet_id = 1;
var oldDirection = 'y-';
var tank_timer;
var TANK_SPEED = 300;
var BULLET_SPEED = 50;
var directionBullet;
var oldDirectionBullet;
// var new_unit;

var tank = new Tank();
tank.direction = 'y-';




$('.start_game').on('click', startGame);
$(document).keydown(changeDirection);

/**
 * Генерация игрового поля*/

var table = $('.game_field');
for (var i = 0; i <= FIELD_SIZE_X; i++) {
    var row = $('<tr />', {
        class: 'row-' + i
    });
    for (var j = 0; j <= FIELD_SIZE_Y; j++) {
        var sell = $('<td />', {
            class: 'cell-' + j + '-' + i + ' field_cell'
        });
        row.append(sell);
    }
    table.append(row);
}


function Tank() {
    // this.direction = 'y-';
    // this.Olddirection = 'y-';
    this.bullet_id = 1;
    this.old_bullet_id = this.bullet_id;
}

/**Расположение танка*/

Tank.prototype.location = function () {
    var start_coords_x = FIELD_SIZE_X / 2;
    var start_coords_y = FIELD_SIZE_Y / 2;

    var tank_startPosition = $('.cell-' + start_coords_x + '-' + start_coords_y);

    tank_startPosition.removeClass('field_cell');

    tank_startPosition.addClass('tank')
        .attr('tank-x', start_coords_x.toString())
        .attr('tank-y', start_coords_y.toString())
        .attr('bullet-x', start_coords_x.toString())
        .attr('bullet-y', start_coords_y.toString())
        .attr('bullet-id', this.bullet_id);
};

/**Движение танка*/

Tank.prototype.move = function () {

    var tankItem = $('.tank');

    // this.coords_x = parseInt(tankItem.attr('data-x'));
    // this.coords_y = parseInt(tankItem.attr('data-y'));

    var coords_x = parseInt(tankItem.attr('tank-x'));
    var coords_y = parseInt(tankItem.attr('tank-y'));


    switch (this.direction) {
        case'x-':
            coords_x -= 1;
            break;
        case'x+':
            coords_x += 1;
            break;
        case'y-':
            coords_y -= 1;
            break;
        case'y+':
            coords_y += 1;
            break;
    }

    var new_tankItem = $('.cell-' + (coords_x) + '-' + (coords_y));

    if (new_tankItem.hasClass('field_cell') === true) {
        tankItem.removeClass('tank')
            .removeAttr('tank-x')
            .removeAttr('tank-y')
            .removeAttr('bullet-x')
            .removeAttr('bullet-y')
            .removeAttr('bullet-id')
            .addClass('field_cell');

        new_tankItem.addClass('tank')
            .attr('tank-x', coords_x.toString())
            .attr('tank-y', coords_y.toString())
            .attr('bullet-x', coords_x.toString())
            .attr('bullet-y', coords_y.toString())
            .attr('bullet-id', this.bullet_id)
            .removeClass('field_cell');
    }


    // this.oldDirection = this.direction;
};

/**Выстрел танка*/

function Bullet(id, direction) {
    this.id = id;
    this.direction = direction;
    // console.log(this.id, this.direction)
}

Bullet.prototype.shot = function () {
    // console.log(this.id, this.direction);

    var bulletItem = $('[bullet-id = "' + this.id + '"]');

    if (bulletItem.length > 1) {
        bulletItem = bulletItem.not('.tank')
    }

    console.log(this.id);

    var bullet_coords_x = parseInt(bulletItem.attr('bullet-x'));
    var bullet_coords_y = parseInt(bulletItem.attr('bullet-y'));


    // this.direction = tank.direction;

    switch (this.direction) {
        case'x-':
            bullet_coords_x -= 1;
            break;
        case'x+':
            bullet_coords_x += 1;
            break;
        case'y-':
            bullet_coords_y -= 1;
            break;
        case'y+':
            bullet_coords_y += 1;
            break;
    }

    var newBulletItem = $('.cell-' + (bullet_coords_x) + '-' + (bullet_coords_y));

    bulletItem.not('.tank')
        .removeAttr('bullet-x')
        .removeAttr('bullet-y')
        .removeAttr('bullet-id')
        .removeClass('bullet')
        .addClass('field_cell');

    // if (bulletItem.hasClass('tank')) {
    //     bulletItem.attr('bullet-id', bullet_id);
    // }

    if (newBulletItem.hasClass('field_cell')) {
        // console.log(bullet_id, this.id);

        newBulletItem.addClass('bullet')
            .removeClass('field_cell')
            .attr('bullet-x', bullet_coords_x.toString())
            .attr('bullet-y', bullet_coords_y.toString())
            .attr('bullet-id', this.id);
        // oldDirectionBullet = directionBullet;
    }

};


// Bullet.prototype.flight = function () {
//
// }

/**Старт игры*/

function startGame() {
    // clearInterval(tank_timer);
    // setInterval(move, TANK_SPEED);
    // var bulletItem = $('[bullet-id = "' + bullet_id + '"]');
    // console.log(bulletItem);
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

tank.location();
