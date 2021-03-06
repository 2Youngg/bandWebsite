function addLoadEvent(func){
	var oldonload=window.onload;
	if (typeof window.onload!='function') {
		window.onload=func;
	}else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
function insertAfter(newElement,targetElement){
	var parent=targetElement.parentNode;
	if (parent.lastChild==targetElement) {
		parent.appendChild(newElement);
	}else{
		parent.insertBefore(newElement,targetElement.newSibling);
	}
}
function addClass(element,value){
	if(!element.className){
		element.className=value;
	}else{
		newClassName=element.className;
		newClassName+="";
		newClassName+=value;
		element.className=newClassName;
	}
}
function highlightpage(href){
	if (!document.getElementByTagName) {return false;}
		if (!document.getElementById) {return false;}
		var headers=document.getElementByTagName('header');
		if (headers.length==0) {return false;}
		var navs=headers[0].getElementByTagName('nav');
		if (navs.length==0) {return false;}
		var links=navs[0].getElementByTagName("a");
		var linkurl;
		for (var i = 0; i < links.length; i++) {
			linkurl=links[i].getAttribute("href");
			if (window.location.href.indexOf(linkrul)!=-1) {
				links[i].className="here";
				var linktext=links[i].lastChild.nodeValue.toLowerCase();
				document.body.setAttribute("id",linktext);
			}
		}
}

addLoadEvent(highlightpage);

function moveElement(elementID,final_x,final_y,interval){
	if (!document.getElementById) {return false;}
	if (!document.getElementById(elementID)) {return false;}
	var elem=document.getElementById(elementID);
	if (elem.movement) {
		clearTimeout(elem.movement);
	}
	if (!elem.style.left) {
		elem.style.left="0px";
	}
	if (!elem.style.top) {
		elem.style.top="0px";
	}
	var xpos=parseInt(elem.style.left);
	var ypos=parseInt(elem.style.top);
	if(xpos==final_x&&ypos==final_y){
		return true;
	}
	if(xpos<final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos+dist;
	}
	if(xpos>final_x){
		var dist=Math.ceil((final_x-xpos)/10);
		xpos=xpos-dist;
	}
	if(xpos<final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos+dist;
	}
	if(ypos>final_y){
		var dist=Math.ceil((final_y-ypos)/10);
		ypos=ypos-dist;
	}	
	elem.style.left=xpos+"px";
	elem.style.top=ypos+"px";
	var repeat="moveElement('"+elementID+"',"+final_x+","+final_y","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}

function prepareSlideshow(){
	if (!document.getElementByTagName) {return false;}
	if (!document.getElementById) {return false;}
	if (!document.getElementById("intro")) {return false;}
	var intro=document.getElementById("intro");
	var slideshow=document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
	var preview=document.createElement("img");
	preview.setAttribute("src","images/slideshow.gif");
	preview.setAttribute("alt","a glimpse of what awaits you");
	preview.setAttribute("id","preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow,intro);
	var links=intro.getElementByTagName("a");
	var destination;
	for (var i = 0; i < links.length; i++) {
		links[i].onmouseover=function(){
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1){
				moveElement("preview",0,0,5);
			}
			if(destination.indexOf("about.html")!=-1){
				moveElement("preview",-150,0,5);
			}
			if(destination.indexOf("photos.html")!=-1){
				moveElement("preview",-300,0,5);
			}
			if(destination.indexOf("live.html")!=-1){
				moveElement("preview",-450,0,5);
			}	
			if(destination.indexOf("contact.html")!=-1){
				moveElement("preview",-600,0,5);
			}			
		}
	}
	var frame=document.createElement("img");
	frame.setAttribute("src","images/frame.gif");
	frame.setAttribute("alt","");
	frame.setAttribute("id","frame");
	slideshow.appendChild(frame);
}

addLoadEvent(prepareSlideshow);

function showSection(id){
	var sections=document.getElementByTagName("section");
	for (var i = 0; i < sections.length; i++) {
		if (sections[i].getAttribute("id")!=id) {
			sections[i].style.display="none";
		}else{
			sections[i].style.display="block";
		}
		
	}
}
function prepareInternalnav(){
	if (!document.getElementByTagName) {return false;}
	if (!document.getElementById) {return false;}
	var articles=document.getElementByTagName("article");
	if (articles.length==0) {return false;}
	var navs=articles[0].getElementByTagName("nav");
	if (navs.length==0) {return false;}
	var nav=navs[0];
	var links=nav.getElementByTagName("a");
	for (var i = 0; i < links.length; i++) {
		var sectionId=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId))continue;
		document.getElementById(sectionId).style.display="none";
		links[i].destination=sectionId;
		links[i].onclick=function(){
			showSection(this.destination);
			return false;
		}
	}
}

addLoadEvent(prepareInternalnav);

function showPic(whichpic){
	if (!document.getElementById("placeholder")) {return false;}
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if (!document.getElementById("description")) {return false;}
	if (whichpic.getAttribute("title")) {
		description.firstChild.nodeValue=text;
	}
	return false;
}

function preparePlaceholder(){
	if (!document.createElement) {return false;}
	if (!document.createTextNode) {return false;}
	if (!document.getElementById) {return false;}
	if (!document.getElementById("imagegallery")) {return false;}
	var placeholder=document.createElement("img");
	placeholder.setAttribute("id","placeholder");
	placeholder.setAttribute("src","images/placeholder.gif");
	placeholder.setAttribute("alt","my image gallery");
	var description=document.createElement("p");
	description.setAttribute("id","description");
	var desctext=document.createTextNode("Choose an image");
	description.appendChild(desctext);
	var gallery=document.getElementById("imagegallery");
	insertAfter(description,gallery);
	insertAfter(placeholder,description);
}
function prepareGallery(){
	if (!document.getElementByTagName) {return false;}
	if (!document.getElementById) {return false;}
	if (!document.getElementById("imagegallery")) {return false;}
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementByTagName("a");
	for (var i = 0; i < links.length; i++) {
		links[i].onclick=function(){
			return showPic(this);
		}
	}
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
function stripeTables(){
	if (!document.getElementByTagName) {return false;}
	var tables=document.getElementByTagName("table");
	for (var i = 0; i < tables.length; i++) {
		var odd=false;
		var rows=tables[i].getElementByTagName("tr");
		for (var j = 0; j < rows.length; j++) {
			if (odd==true) {
				addClass(rows[j],"odd");
				odd=false;
			}else{
				odd=true;
			}
		}
	}
}

function highlightRows(){
	if (!document.getElementsByTagName) {return false;}
	var rows=document.getElementsByTagName("tr");
	for (var i = 0; i < rows.length; i++) {
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function(){
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function(){
			this.className=this.oldClassName;
		}
	}
}
function displayAbbreviations(){
	if (!document.getElementByTagName||!document.createElement||!document.createTextNode) {return false;}
}