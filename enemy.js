function Enemy(type_unit, bullet_id) {
    Tank.apply(this, [type_unit, bullet_id]);
    this.coords_x = Math.floor(Math.random() * FIELD_SIZE_X);
    this.coords_y = Math.floor(Math.random() * FIELD_SIZE_Y / 2);
}


Enemy.prototype = Object.create(Tank.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.enemyMove = function () {

    if (this.checkNextItem.hasClass('field_cell')) {
        this.move();
    } else {
        var arrDir = ['y-', 'y+', 'x-', 'x+'];
        var randIndex = Math.floor(Math.random() * 4);
        this.direction = arrDir[randIndex];
        this.move();
    }
};

