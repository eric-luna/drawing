$(document).ready(function(){
	// This sets the color of the drawing tool
	var color=$('.selected').css('background-color');
	// This adds the selected class to the li color the user click on
	$('.controls').on('click',"li",function(){
		$(this).siblings().removeClass('selected');
		$(this).addClass('selected');
	})
	// This toggles the visibilty of the color creator tool
	
});