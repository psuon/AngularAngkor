$(document).ready(function() {
	$newItemField = $('#newItem');
	$addButton = $('#add');
	$('ol').sortable();
	$('li').append('<span class="delete">x</span');
	$('ol').delegate('li','mouseover mouseout',function() {
		$(this).toggleClass('hovered');
	});
	$('ol').delegate('li>.delete','mouseover mouseout',function() {
		$(this).toggleClass('hovered');
	});
	$('ol').on('click','li>.delete',function(){
		$(this).parent().remove();
	});
	$newItemField.keypress(function(e) {
		if (e.which == 13) {
			addItem();
		}
	});
    $addButton.click(function() {
		addItem();
    });
});
function addItem() {
	if ($newItemField.val() !== '') {
		$newItem = $('<li/>');
		$newItem.text($newItemField.val());
		$deleteButton = $('<span/>').text('x').addClass('delete');
		$newItem.append($deleteButton);
		$newItem.css('background-color','yellow');
		$newItem.appendTo('ol');
		$newItem.animate({backgroundColor:'white'},5000);
		$newItemField.val('');
	}
}
