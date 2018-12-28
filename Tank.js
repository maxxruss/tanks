var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var gameIsRunning = true;


function Tank(type, type_unit, bullet_id) {
    this.type_unit = type_unit;
    this.coords_x = FIELD_SIZE_X / 2;
    this.coords_y = FIELD_SIZE_Y / 2;
    this.direction = 'y-';
    this.olddirection = 'y-';
    this.bullet_id = bullet_id;
    this.type = type;
}

/**Расположение танка*/

Tank.prototype.location = function () {

    this.startPosition = $('.cell-' + this.coords_x + '-' + this.coords_y);

    this.startPosition.removeClass('field_cell');
    this.classImage = this.getClassImage();

    this.checkItem();

    // var Animation = new Animation();
    //
    // Animation.appearance(startPosition);


    this.startPosition.addClass(this.type)
        .addClass(this.type_unit)
        .addClass(this.classImage)
        .attr('tank-x', this.coords_x.toString())
        .attr('tank-y', this.coords_y.toString())
        .attr('bullet-x', this.coords_x.toString())
        .attr('bullet-y', this.coords_y.toString());
    console.log(this.type)
};

/**Получаем следующий по направлению элемент-ячейку*/

Tank.prototype.getNextItem = function () {

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

    return $('.cell-' + this.coords_x + '-' + this.coords_y);
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
    if (this.type === 'tank') {
        switch (this.direction) {
            case'x-':
                return 'tank_left';
            case'x+':
                return 'tank_right';
            case'y-':
                return 'tank_up';
            case'y+':
                return 'tank_down';
        }
    }


    if (this.type === 'enemy') {
        switch (this.direction) {
            case'x-':
                return 'enemy_left';
            case'x+':
                return 'enemy_right';
            case'y-':
                return 'enemy_up';
            case'y+':
                return 'enemy_down';
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

        this.classImage = this.getClassImage();

        tankItem.addClass(this.classImage);
    } else {

        /**Если направление движения НЕ изменяется - танк движется дальше*/

        this.new_tankItem = this.getNextItem();
        // this.getClassImage();

        if (this.new_tankItem.hasClass('field_cell') === true) {
            tankItem.removeClass(this.type)
                .removeClass(this.type_unit)
                .removeAttr('tank-x')
                .removeAttr('tank-y')
                .removeAttr('bullet-x')
                .removeAttr('bullet-y')
                .removeClass(this.classImage)
                .addClass('field_cell');

            this.new_tankItem.removeClass('field_cell')
                .addClass(this.type)
                .addClass(this.type_unit)
                .attr('tank-x', this.coords_x.toString())
                .attr('tank-y', this.coords_y.toString())
                .attr('bullet-x', this.coords_x.toString())
                .attr('bullet-y', this.coords_y.toString())
                .addClass(this.classImage);
        }
    }

    this.checkItem();
    this.olddirection = this.direction;
};
