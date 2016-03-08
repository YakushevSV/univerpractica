var el = null;
var name = null;
var array = new Array(100);
var n = 0;
var f = true;


function run(){
	var button_send = document.getElementById('sendingmsg');
	button_send.addEventListener('click', onSendButtonClick);

	
	var chat  = document.getElementById('chatbox');
	chat.addEventListener('click', delegateEvent);

	
	var button_del = document.getElementById('btn-del');
	button_del.addEventListener('click' , onDelButtonClick);

	var button_edit = document.getElementById('btn-edit');
	button_edit.addEventListener('click' , onEditButtonClick);

	var button_rename = document.getElementById('rename');
	button_rename.addEventListener("click", onRenameButtonClick);	
}


function onRenameButtonClick(){


	var user = document.getElementById('userlgn');
	if(user.value){
		var msg = createItem("<пользователь изменил имя на "+ user.value + " >");
		var list = document.getElementsByClassName('messages')[0];
		list.appendChild(msg);
	}
	
}


function onEditButtonClick(){	
	var editbox = document.getElementById('editbox');	
	editbox.style.display = "block";

	var btn_ok = document.getElementById('btn-ok');
	btn_ok.addEventListener('click', onOkButtonClick);
	
}


function onOkButtonClick(){
	var txtarea = document.getElementById('editmsgarea');
	if (txtarea.value) {
		var l = document.getElementsByClassName('messages')[0];
		elem = createItem(" <пользователь изменил сообщение>" + txtarea.value);
		txtarea.value = "";
		l.replaceChild(elem, el.parentElement);
	}
	var editbox = document.getElementById('editbox');	
	editbox.style.display = "none";

	el.style.background = "";
	document.getElementById('btn-del').disabled = true;
	document.getElementById('btn-edit').disabled = true;

	document.getElementById('btn-del').style.background = "";
	document.getElementById('btn-edit').style.background = "";
}



function onDelButtonClick(){
	var l = document.getElementsByClassName('messages')[0];
	elem = createItem(" пользователь "  + "удалил сообщение");
	l.replaceChild(elem, el.parentElement);

	document.getElementById('btn-del').disabled = true;
	document.getElementById('btn-edit').disabled = true;

	document.getElementById('btn-del').style.background = "";
	document.getElementById('btn-edit').style.background = "";

	
}

function delegateEvent(evtObj) {
	if(el != null ){
		if (el.style.background != "") {
				el.style.background = "";
				document.getElementById('btn-del').disabled = true;
				document.getElementById('btn-edit').disabled = true;

				document.getElementById('btn-del').style.background = "";
				document.getElementById('btn-edit').style.background = "";}
			
		 	}
 	if(el == evtObj.target.parentElement ){
 		if (f) {
 			el.style.background = "";
			document.getElementById('btn-del').disabled = true;
			document.getElementById('btn-edit').disabled = true;

			document.getElementById('btn-del').style.background = "";
			document.getElementById('btn-edit').style.background = "";
			f = false;
 		}else {
 			f= true;
 			el.style.background = "yellow";			 
			document.getElementById('btn-del').disabled = false;
			document.getElementById('btn-edit').disabled = false;

			document.getElementById('btn-del').style.background = "#337ab7";
			document.getElementById('btn-edit').style.background = "#337ab7";
 		}

 		

 	}else if(  evtObj.target.className == "talktext"){
		
		el = evtObj.target.parentElement;
		if(el.style.background == ""){
			el.style.background = "yellow";
			 
			document.getElementById('btn-del').disabled = false;
			document.getElementById('btn-edit').disabled = false;

			document.getElementById('btn-del').style.background = "#337ab7";
			document.getElementById('btn-edit').style.background = "#337ab7";

		}else{
			el.style.background = "";
			document.getElementById('btn-del').disabled = true;
			document.getElementById('btn-edit').disabled = true;

			document.getElementById('btn-del').style.background = "";
			document.getElementById('btn-edit').style.background = "";
		}	
		
	}
}





function onSendButtonClick(){
		
	var msg_text = document.getElementById('msgarea');
	var user = document.getElementById('userlgn');
	if(msg_text.value && user.value){
		if (name === "null") {
			name = user.value;
		} else{
			if(name != user.value){

			}
		}		
		var msg = createItem(msg_text.value);
		var list = document.getElementsByClassName('messages')[0];
		list.appendChild(msg);


		msg_text.value = '';
	}	
}

function createItem(text){
	var divItem = document.createElement('li');
	var mess = document.createElement('div');
	mess.className = "talk-bubble";//tri-right round border right-top";
	var textmsg = document.createElement('div');
	textmsg.className = "talktext";
	textmsg.appendChild(document.createTextNode(name + " : " + text ));
	mess.appendChild(textmsg);
	divItem.appendChild(mess);

	return divItem;
}
