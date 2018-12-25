var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var gameIsRunning = true;
// var direction = 'y-';
var bullet_id = 1;
var oldDirection = 'y-';
var tank_timer;
var TANK_SPEED = 300;
var BULLET_SPEED = 50;
var ENEMY_SPEED = 2000;
var directionBullet;
var oldDirectionBullet;



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


function Tank(type_unit, bullet_id) {
    this.type_unit = type_unit;
    this.coords_x = FIELD_SIZE_X / 2;
    this.coords_y = FIELD_SIZE_Y / 2;
    this.direction = 'y-';
    this.olddirection = 'y-';
    this.bullet_id = bullet_id;
}

/**Расположение танка*/

Tank.prototype.location = function () {

    var startPosition = $('.cell-' + this.coords_x + '-' + this.coords_y);

    startPosition.removeClass('field_cell');
    this.getClassImage();

    startPosition.addClass(this.type_unit)
        .addClass(this.classImage)
        .attr('tank-x', this.coords_x.toString())
        .attr('tank-y', this.coords_y.toString())
        .attr('bullet-x', this.coords_x.toString())
        .attr('bullet-y', this.coords_y.toString());

    this.checkItem();
};

/**Получаем следующий по направлению элемент-ячейку*/

Tank.prototype.nextItem = function () {

    switch (this.direction) {
        case'x-':
            this.coords_x -= 1;
            break;
        case'x+':
            this.coords_x += 1;
            break;
        case'y-':
            this.coords_y -= 1;
            break;
        case'y+':
            this.coords_y += 1;
            break;
    }

    this.new_tankItem = $('.cell-' + this.coords_x + '-' + this.coords_y);
};

/**Проверяем следующий по направлению элемент-ячейку*/

Tank.prototype.checkItem = function () {

    this.next_coords_x = this.coords_x;
    this.next_coords_y = this.coords_y;

    switch (this.direction) {
        case'x-':
            this.next_coords_x -= 1;
            break;
        case'x+':
            this.next_coords_x += 1;
            break;
        case'y-':
            this.next_coords_y -= 1;
            break;
        case'y+':
            this.next_coords_y += 1;
            break;
    }

    this.checkNextItem = $('.cell-' + this.next_coords_x + '-' + this.next_coords_y);
};

/**Определяем, какой класс присвоить юниту исходя из направления*/

Tank.prototype.getClassImage = function () {
    if (this.type_unit === 'tank') {
        switch (this.direction) {
            case'x-':
                this.classImage = 'tank_left';
                break;
            case'x+':
                this.classImage = 'tank_right';
                break;
            case'y-':
                this.classImage = 'tank_up';
                break;
            case'y+':
                this.classImage = 'tank_down';
                break;
        }
    }


    if (this.type_unit === 'enemy' || this.type_unit === 'enemy1') {
        switch (this.direction) {
            case'x-':
                this.classImage = 'enemy_left';
                break;
            case'x+':
                this.classImage = 'enemy_right';
                break;
            case'y-':
                this.classImage = 'enemy_up';
                break;
            case'y+':
                this.classImage = 'enemy_down';
                break;
        }
    }
};

/**Движение танка*/

Tank.prototype.move = function () {

    var tankItem = $('.' + this.type_unit);

    this.coords_x = parseInt(tankItem.attr('tank-x'));
    this.coords_y = parseInt(tankItem.attr('tank-y'));

    /**Если направление движения изменяется - сначала танк крутится на месте*/

    if (this.olddirection !== this.direction) {
        tankItem.removeClass(this.classImage);
        this.getClassImage();
        tankItem.addClass(this.classImage);
    } else {

        /**Если направление движения НЕ изменяется - танк движется дальше*/

        this.nextItem();
        this.getClassImage();

        if (this.new_tankItem.hasClass('field_cell') === true) {
            tankItem.removeClass(this.type_unit)
                .removeAttr('tank-x')
                .removeAttr('tank-y')
                .removeAttr('bullet-x')
                .removeAttr('bullet-y')
                .removeClass(this.classImage)
                .addClass('field_cell');

            this.new_tankItem.removeClass('field_cell')
                .addClass(this.type_unit)
                .attr('tank-x', this.coords_x.toString())
                .attr('tank-y', this.coords_y.toString())
                .attr('bullet-x', this.coords_x.toString())
                .attr('bullet-y', this.coords_y.toString())
                .addClass(this.classImage);
        }
    }
    console.log(this.direction);

    this.checkItem();
    this.olddirection = this.direction;
};
