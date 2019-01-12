/**Модель танка противника*/

function Enemy(type, type_unit, bullet_id) {
    Tank.apply(this, [type, type_unit, bullet_id]);
    this.coords_x = Math.floor(Math.random() * (FIELD_SIZE_X-1) + 1);
    this.coords_y = 1;
}

Enemy.prototype = Object.create(Tank.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.enemyMove = function () {

    /**Переопределен метод движения танка*/

    this.checkItem();

    /**Проверка следующей по движению клетки*/
    if (this.checkNextItem.hasClass('field_cell')||this.checkNextItem.hasClass('water')) {
        this.move();
    } else {

        /**Если впереди припятствие - выбираем другое направление движения танка*/
        var arrDir = ['y-', 'y+', 'x-', 'x+'];
        var randIndex = Math.floor(Math.random() * 4);
        this.direction = arrDir[randIndex];
        this.move();
    }
};



