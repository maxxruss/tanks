
function Let() {

}

Let.prototype.armor = function(arr_coords) {
for(var key in arr_coords) {
    var item = $('.cell-' + arr_coords[key].x + '-' + arr_coords[key].y);
    item.removeClass('field_cell');
    item.addClass('armor');
}

};

Let.prototype.water = function(arr_coords) {
    for(var key in arr_coords) {
        var item = $('.cell-' + arr_coords[key].x + '-' + arr_coords[key].y);
        item.removeClass('field_cell');
        item.addClass('water');
    }

};

Let.prototype.forest = function(arr_coords) {
    for(var key in arr_coords) {

        var forest_image = $('<div />', {
            class: 'forest'
        });

        var item = $('.cell-' + arr_coords[key].x + '-' + arr_coords[key].y);

        forest_image.appendTo(item);
    }};

Let.prototype.brick = function(arr_coords) {
    for(var key in arr_coords) {
        var item = $('.cell-' + arr_coords[key].x + '-' + arr_coords[key].y);
        item.removeClass('field_cell');
        item.addClass('brick');
    }
};







