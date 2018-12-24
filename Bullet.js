
/**Выстрел танка*/

function Bullet(id, direction, type_unit) {
    this.id = id;
    this.direction = direction;
    this.type_unit = type_unit;
    this.flight = true;
}

Bullet.prototype.shot = function () {

    var tankItem = $('.' + this.type_unit);

    this.bullet_coords_x = parseInt(tankItem.attr('tank-x'));
    this.bullet_coords_y = parseInt(tankItem.attr('tank-y'));

    switch (this.direction) {
        case'x-':
            this.bullet_coords_x -= 1;
            break;
        case'x+':
            this.bullet_coords_x += 1;
            break;
        case'y-':
            this.bullet_coords_y -= 1;
            break;
        case'y+':
            this.bullet_coords_y += 1;
            break;
    }

    var newBulletItem = $('.cell-' + this.bullet_coords_x + '-' + this.bullet_coords_y);

    newBulletItem.removeClass('field_cell')
        .addClass('bullet')
        .attr('bullet-x', this.bullet_coords_x.toString())
        .attr('bullet-y', this.bullet_coords_y.toString())
        .attr('bullet-id', this.id);

};

Bullet.prototype.flightBullet = function () {

    var bulletItem = $('[bullet-id = "' + this.id + '"]');

    // if (bulletItem.length > 1) {
    //     bulletItem = bulletItem.not('.tank')
    // }

    var bullet_coords_x = parseInt(bulletItem.attr('bullet-x'));
    var bullet_coords_y = parseInt(bulletItem.attr('bullet-y'));

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


    if (newBulletItem.hasClass('field_cell')) {

        newBulletItem.addClass('bullet')
            .removeClass('field_cell')
            .attr('bullet-x', bullet_coords_x.toString())
            .attr('bullet-y', bullet_coords_y.toString())
            .attr('bullet-id', this.id);
    } else {
        this.flight = false;
    }
}





