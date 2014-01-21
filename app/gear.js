var gearDevicesPerPage;	//USed for prev and next buttons
var gearIndex = 0;		//Used as an index to selectedDevices array

//Callback for gear icon
//Toggles the state of the gear window
function gearClicked(){
	if(document.getElementById("gearScreen").style.visibility == "visible"){
		gearRemoveElements();
		document.getElementById("gearScreen").style.visibility = "hidden";
		document.getElementById("gearRightButton").style.visibility = "hidden";
		document.getElementById("gearLeftButton").style.visibility = "hidden";
	} else {
		document.getElementById("gearScreen").style.visibility = "visible";
		gearShowElements(0);
		if(gearDevicesPerPage >= selectedDevices.length){
			document.getElementById("gearRightButton").style.visibility = "hidden";
		} else {
			document.getElementById("gearRightButton").style.visibility = "visible";
		}
		document.getElementById("gearLeftButton").style.visibility = "hidden";
	}
}

//Removes all currently displayed gears
function gearRemoveElements(){
	document.getElementById("gearImages").innerHTML = "";
}

//Draws gear to the gearbox
function gearShowElements(index){

	gearRemoveElements();

	if(devices[0] == undefined) return;
	var deviceWidth = devices[0].image.width;
	var deviceHeight = devices[0].image.height;

	var minPadding = 12;
	var verticalPadding = 12;

	var printWidth;
	var printHeight;

	var nextX;
	var nextY;

	var gearBoxWidth = document.getElementById("gearScreen").clientWidth - minPadding*2;
	var gearBoxHeight = document.getElementById("gearScreen").clientHeight - 50;	//50 for buttons

	var gearDevicesPerLine = Math.floor(gearBoxWidth / (deviceWidth + (minPadding * 2)));

	var padding = ((gearBoxWidth/gearDevicesPerLine) - deviceWidth)/2;	

	nextX = padding/2;
	nextY = verticalPadding;

	printWidth = deviceWidth + padding*2;
	printHeight = deviceHeight + verticalPadding*2;

	gearDevicesPerPage = gearDevicesPerLine * Math.floor(gearBoxHeight / printHeight);

	for(var i=0;i<gearDevicesPerPage && i<selectedDevices.length;i++){

		if(selectedDevices[i+index] !== undefined){

			var newElem = document.createElement('img');
			newElem.src = selectedDevices[i+index];
			newElem.className = "gearOnScreen";
			newElem.style.top = nextY;
			newElem.style.left = nextX;


			document.getElementById("gearImages").appendChild(newElem);
			//console.log("Drawing Device: " + selectedDevices[i + index]);

			if((i+1) % gearDevicesPerLine == 0){
				nextX = padding/2;
				nextY += printHeight;
			} else {
				nextX += printWidth;
			}
		}
	}

}

//Updates gearIndex and redraws gearbox devices
function gearLeftButton(){
	gearIndex -= gearDevicesPerPage;
	if(gearIndex <= 0){
		gearIndex = 0;
		document.getElementById("gearLeftButton").style.visibility = "hidden";
	} 
	document.getElementById("gearRightButton").style.visibility = "visible";

	gearShowElements(gearIndex);
}

//Updates gearIndex and redraws gearbox devices
function gearRightButton(){
	gearIndex += gearDevicesPerPage;
	if(gearIndex + gearDevicesPerPage > selectedDevices.length){
		document.getElementById("gearRightButton").style.visibility = "hidden";
	}
	document.getElementById("gearLeftButton").style.visibility = "visible";

	gearShowElements(gearIndex);
}
