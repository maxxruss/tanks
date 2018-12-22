function Enemy(type_unit) {
    Tank.apply(this, [type_unit, direction]);
    this.coords_x = Math.floor(Math.random() * FIELD_SIZE_X);
    this.coords_y = Math.floor(Math.random() * FIELD_SIZE_Y / 2);
    this.bullet_id = 500;
}


Enemy.prototype = Object.create(Tank.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.enemyMove = function () {
this.nextItem();
    if (this.new_tankItem.hasClass('field_cell') === true) {
        var arrDir = ['y-', 'y+', 'x-', 'x+'];
        var randIndex = Math.floor(Math.random() * 4);
        this.direction = arrDir[randIndex];
        console.log(this.direction);
        console.log(this.new_tankItem);
        this.move();
    }
    // console.log(this.new_tankItem);


};

