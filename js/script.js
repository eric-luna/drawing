// This sets the color of the drawing tool
var color=$('.selected').css('background-color');
// Selects the canvas element
var $canvas=$('canvas');
var context=$canvas[0].getContext('2d');
var lastEvent;
var mousedown=false;


// This adds the selected class to the li color the user click on
$('.controls').on('click',"li",function(){
	$(this).siblings().removeClass('selected');
	$(this).addClass('selected');
	color=$(this).css('background-color');
})
// This toggles the visibilty of the color creator tool
$('.toggle').click(function(){
	changeColor();
	$('.newcolor').toggle();
});


// Updates the new color 
function changeColor(){
	// Gets value from each input range and adds to the rgb()
	var r=$('#red').val();
	var g=$('#green').val();
	var b=$('#blue').val();
	$('.color-block').css('background-color',"rgb("+r+","+g+","+b+")");
}
// When color sliders change the color block changes
$('input[type=range]').change(changeColor);
// When the "Add New Color" button is pressed the new color is appended to the color list
$('.addbutton').click(function(){
	var $newcolor=$('<li></li>')
	$newcolor.css('background-color',$('.color-block').css('background-color'));
	$('.color-list').append($newcolor);
	//Select the new color
	$newcolor.click();
	$('.newcolor').toggle();
});


// Canvas controls and functionality
$canvas.mousedown(function(e){
	mousedown=true;
	lastEvent=e;
	// Allows the line to follow the users mouse movement
}).mousemove(function(e){
	if(mousedown){
		context.beginPath();
		context.moveTo(lastEvent.offsetX,lastEvent.offsetY);
		context.lineTo(e.offsetX,e.offsetY);
		// Sets the color of the stroke
		context.strokeStyle=color;
		context.stroke();
		lastEvent=e;
	}
	//Stops drawing when mouse is up
}).mouseup(function(){
	mousedown=false;
	// Disables drawing when mouse leaves canvas area.
}).mouseleave(function(){
	$canvas.mouseup();
})



// Touchpad Controls
$canvas.on('touchstart',function(e){
	mousedown=true;
	lastEvent=e.originalEvent;
	offsetX = lastEvent.touches[0].pageX - lastEvent.touches[0].target.offsetLeft;
	offsetY = lastEvent.touches[0].pageY - lastEvent.touches[0].target.offsetTop;
	console.log(lastEvent.touches[0].clientX,lastEvent.touches[0].clientY);
	// Allows the line to follow the users mouse movement
}).on('touchmove',function(e){
	e.preventDefault();
	var ev = e.originalEvent;
	X = ev.touches[0].pageX - ev.touches[0].target.offsetLeft;
	Y = ev.touches[0].pageY - ev.touches[0].target.offsetTop;
	if(mousedown){
		context.beginPath();
		context.moveTo(offsetX,offsetY);
		context.lineTo(X,Y);
		// Sets the color of the stroke
		context.strokeStyle=color;
		context.stroke();
		// Resets the lastEvent variable to the last touchpoint
		lastEvent=e.originalEvent;
		offsetX = lastEvent.touches[0].pageX - lastEvent.touches[0].target.offsetLeft;
		offsetY = lastEvent.touches[0].pageY - lastEvent.touches[0].target.offsetTop;
	}
	//Stops drawing when mouse is up
}).on('touchend',function(){
	mousedown=false;
	// Disables drawing when mouse leaves canvas area.
});

var canvas = document.getElementById("canvas");
canvas.width = window.innerWidth-75;
$(window).resize(function() {
  //update stuff
  canvas.width = window.innerWidth-75;
});

var ctx = canvas.getContext("2d");
$('.clear').on('click',function(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
})
