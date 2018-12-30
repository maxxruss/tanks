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

    this.new_item = $('.cell-' + this.coords_x + '-' + this.coords_y);

    this.changeImage();

    this.new_item.removeClass('field_cell')
        .addClass(this.type)
        .addClass(this.type_unit)
        .attr('tank-x', this.coords_x.toString())
        .attr('tank-y', this.coords_y.toString())
        .attr('bullet-x', this.coords_x.toString())
        .attr('bullet-y', this.coords_y.toString());
    // console.log(this.type + '-' + this.new_item)
};

/**Получаем следующий по направлению элемент-ячейку*/

Tank.prototype.getNewItem = function () {

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



Tank.prototype.changeImage = function () {

    var item = $('.cell-' + this.coords_x + '-' + this.coords_y);

    item.find('.' + this.type)
        .remove();


    this.unitImage = $('<div />', {
        class: this.type
    });

    // unitImage.removeClass()

    // addClass(this.type);

    switch (this.direction) {
        case'x-':
            this.unitImage.addClass(this.type + '_left');
;            break;
        case'x+':
            this.unitImage.addClass(this.type + '_right');
;            break;
        case'y-':
            this.unitImage.addClass(this.type + '_up');
;            break;
        case'y+':
            this.unitImage.addClass(this.type + '_down');
;            break;
    }

    this.unitImage.appendTo(this.new_item);
    console.log('this.new_item - ');
    console.log(this.new_item);
};

/**Движение танка*/

Tank.prototype.move = function () {

    console.log('this.type_unit -' + this.type_unit );

    var tankItem = $('.' + this.type_unit);

    console.log('tankItem - ' + tankItem);

    this.coords_x = parseInt(tankItem.attr('tank-x'));
    this.coords_y = parseInt(tankItem.attr('tank-y'));

    /**Если направление движения изменяется - сначала танк крутится на месте*/

    if (this.olddirection !== this.direction) {

        this.changeImage();

    } else {
        /**Если направление движения НЕ изменяется - танк движется дальше*/
        this.checkItem();

        if (this.checkNextItem.hasClass('field_cell') || this.checkNextItem.hasClass('water')) {


            /**Находим и удаляем потомка - вставленную картинку така*/

            tankItem.find('.' + this.type)
                .remove();

            tankItem.removeClass(this.type)
                .removeClass(this.type_unit)
                .removeAttr('tank-x')
                .removeAttr('tank-y')
                .removeAttr('bullet-x')
                .removeAttr('bullet-y')
                .addClass(tankItem.hasClass('water') ? '' : 'field_cell');


            this.new_item = this.getNewItem();

            this.new_item.removeClass('field_cell')
                .addClass(this.type)
                .addClass(this.type_unit)
                .attr('tank-x', this.coords_x.toString())
                .attr('tank-y', this.coords_y.toString())
                .attr('bullet-x', this.coords_x.toString())
                .attr('bullet-y', this.coords_y.toString());

            this.changeImage();



        }
    }

    this.checkItem();
    this.olddirection = this.direction;
};
