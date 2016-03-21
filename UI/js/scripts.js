var el = null;
var name = null;
var array = new Array(100);
var n = 0;
var f1 = true;


var usersList = [];
var curAut;
var f= false;

var messagesList = [];


function run(){

	var button_del = document.getElementById('btn-del');
	button_del.addEventListener('click' , onDelButtonClick);

	var button_edit = document.getElementById('btn-edit');
	button_edit.addEventListener('click' , onEditButtonClick);





	var btnLog = document.getElementById('logging');

    btnLog.addEventListener('click',onLogButtonClick);
    usersList = loadUsers() || [
            newUser('User', false),
            newUser('User2', false)
        ];
    curAut = loadCur()||null;

    renderUsers(usersList);
    checkLog(btnLog);


    var btnSend = document.getElementById('sendingmsg');
    btnSend.addEventListener('click', onSendButtonClick);

    messagesList = loadMessages() || [
            newMessage('Hello to all','User 21: 16: 12', usersList[0].id),
            newMessage('Hello','User2 21: 32: 15', usersList[1].id)
        ];
    renderMessages(messagesList);

    var button_rename = document.getElementById('rename');
    button_rename.addEventListener("click", onRenameButtonClick);

    var chat  = document.getElementById('textbox');
    chat.addEventListener('click', delegateEvent);

}

function onSendButtonClick(){

    var msg_text = document.getElementById('msgarea');
    if (msg_text.value && !f){
        var newMsg = newMessage(msg_text.value, curAut.name, curAut.id );
        messagesList.push(newMsg);
        renderMessages([newMsg]);
        saveMessages(messagesList);

        msg_text.value = '';
    }

}

function newMessage(text, aut, autId) {
    return {
        description:text,
        author:aut,
        authorId: autId,
        id: '' + uniqueId()
    };
}
function renderMessages(messages) {
//    var curAut = usersList[usersList.length - 1];
        for(var i = 0; i < messages.length; i++) {
                if(curAut!=null&&curAut.id == messages[i].authorId){
                    renderMessage(messages[i], 2);
                } else if(messages[i].author == "system"){
                    renderMessage(messages[i], 3);
                    
                }else{
                    renderMessage(messages[i], 1);
                }
        } 
    renderLocalStorageMess(messagesList);
    //renderCounter(taskList);
}
function renderLocalStorageMess(value){
    var output = document.getElementById('outputm');

    output.innerText = "localStorage:\n" + JSON.stringify(value, null, 2) + ";";
}
function renderMessage(msg, f){
    var items = document.getElementsByClassName('messagesList')[0];
    if(f == 1){
        var element = elementMessageFromTemplate();
    }else if(f== 2){
        var element = elementMessageFromTemplateMe();
    }else{
        var element = elementMessageFromTemplateSys();

    }


    renderMessageState(element, msg);
    items.appendChild(element);
}
function elementMessageFromTemplate() {
    var template = document.getElementById("message-template");

    return template.firstElementChild.cloneNode(true);
}
function elementMessageFromTemplateMe() {
    var template = document.getElementById("message-template-me");

    return template.firstElementChild.cloneNode(true);
}
function elementMessageFromTemplateSys() {
    var template = document.getElementById("message-template-sys");

    return template.firstElementChild.cloneNode(true);
}
function loadMessages() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Messages List");

    return item && JSON.parse(item);
}
function renderMessageState(element, msg){
    //if(task.done) {
    //    element.classList.add('strikeout');
    //    element.firstElementChild.checked = true;
    //} else {
    //    element.classList.remove('strikeout');
    //    element.firstElementChild.checked = false;
    //}
    if(msg.author == "system"){
        element.setAttribute('data-massage-id', msg.id);
        element.setAttribute('massage-author-id', msg.authorId);
        element.lastElementChild.textContent = msg.description;
    }else{
        element.setAttribute('data-massage-id', msg.id);
        element.setAttribute('massage-author-id', msg.authorId);


        element.lastElementChild.textContent = msg.description;
        element.firstElementChild.textContent = msg.author;
    }
    
    //    element.lastChild.textContent = msg.description;
    //element.firstChild.textContent = msg.author;
}
function saveMessages(listToSave) {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("Messages List", JSON.stringify(listToSave));
}






//--------------------------------------------------------------
function onRenameButtonClick(){
    var text = document.getElementById('userlgn');
    if(text.value == '')
        return;

    var flag = true
    for(var i = 0; i < usersList.length; i++ ){
        if(usersList[i].name == text.value){
            flag = false
            alert("имя занято");
            break;
        }
    }
    if(flag){
    var index = 0;
        for(var i = 0; i < usersList.length; i++ ){
                if(usersList[i].id == curAut.id){
                    index = i;
                    break;
                }
            }

        var newMsg = newMessage("пользователь " + curAut.name + " изменил имя на " + text.value  , "system", uniqueId() );
        messagesList.push(newMsg);
        renderMessages([newMsg]);
        saveMessages(messagesList);

        curAut.name = text.value;
        usersList[index].name = text.value;
    }

    saveCur(curAut);
    saveUsers(usersList);

}
function loadCur(){
    if(typeof(Storage) == "undefined") {
    		alert('localStorage is not accessible');
    		return;
    	}

    	var item = localStorage.getItem("current user");

    	return item && JSON.parse(item);
}
function checkLog(btnLog){
//    var item = usersList[usersList.length-1];
    if(curAut != null){
        var text = document.getElementById('userlgn');
        //text.readOnly = true;
        text.placeholder = '';
        btnLog.innerText  = "Logout";
        document.getElementById('rename').disabled = false;
        f = false;
    }else{
        btnLog.innerText  = "Login";
        document.getElementById('rename').disabled = true;
        f= true;
    }

}
function onLogButtonClick(element){
    var text = document.getElementById('userlgn');
    if(f){
        if(text.value == '')
            return;

        var flag = false;
        var ind = -1;
        for(var i = 0; i < usersList.length; i++ ){
            if(usersList[i].name == text.value){
                flag=true;
                ind = i;
                 break;
            }
        }

        if(flag){
            usersList[ind].me= true;
            curAut = newUser(text.value, true);;
            curAut.id = usersList[ind].id;
            renderLocalStorage(usersList);
        }else{
            var newUsr = newUser(text.value, true);
            usersList.push(newUsr);
            renderUsers([newUsr]);
            curAut = newUsr;
        }
        saveUsers(usersList);

        text.value = '';
        saveCur(curAut);
    } else{
//        curAut = null;
        var index = -1;
        for(var i = 0; i < usersList.length; i++ ){
//            if(usersList[i].name == text.value){
              if(usersList[i].name == curAut.name){
                index = i;
                break;
            }
        }
        curAut = null;
        usersList[index].me = false;
        renderLocalStorage(usersList);
        saveUsers(usersList);
        saveCur(curAut);
    }



}
function saveCur(elementToSave){
    if(typeof(Storage) == "undefined") {
            alert('localStorage is not accessible');
            return;
        }

        localStorage.setItem("current user", JSON.stringify(elementToSave));
}
function saveUsers(listToSave) {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("Users List", JSON.stringify(listToSave));
}
function renderUsers(users) {
	for(var i = 0; i < users.length; i++) {
		renderUser(users[i]);
	}

	renderLocalStorage(usersList);
	//renderCounter(usersList);
}
function renderUser(usr){
//	var items = document.getElementsByClassName('users-style-text')[0];
    if(usr.me ){
        var element = elementFromTemplateMe();
    } else{
        var element = elementFromTemplate();
    }


	renderUserState(element, usr);
//	items.appendChild(element);
}
function elementFromTemplate() {
	var template = document.getElementById("user-template");

	return template.firstElementChild.cloneNode(true);
}
function elementFromTemplateMe() {
    var template = document.getElementById("user-template-me");

    return template.firstElementChild.cloneNode(true);
}
function renderUserState(element, usr){
	//if(task.done) {
	//	element.classList.add('strikeout');
	//	element.firstElementChild.checked = true;
	//} else {
	//	element.classList.remove('strikeout');
	//	element.firstElementChild.checked = false;
	//}

	element.setAttribute('data-user-id', usr.id);
	element.lastChild.textContent = usr.name;
}
function renderLocalStorage(value){
	var output = document.getElementById('output');

	output.innerText = "localStorage:\n" + JSON.stringify(value, null, 2) + ";";
}
function loadUsers() {
	if(typeof(Storage) == "undefined") {
		alert('localStorage is not accessible');
		return;
	}

	var item = localStorage.getItem("Users List");

	return item && JSON.parse(item);
}
function newUser(str, Me){
	return{
		name: str,
        me: !!Me,
		id: ''+ uniqueId()
	};
}
function uniqueId() {
	var date = Date.now();
	var random = Math.random() * Math.random();

	return Math.floor(date * random);
}
//-------------------------------------------------------
function delegateEvent(evtObj) {
	if(el != null ){
		if (el.style.background != "") {
            el.style.background = "";
            document.getElementById('btn-del').disabled = true;
            document.getElementById('btn-edit').disabled = true;

            document.getElementById('btn-del').style.background = "";
            document.getElementById('btn-edit').style.background = "";
		}

	}
 	if(el == evtObj.target){
 		if (f1) {
 			el.style.background = "";
			document.getElementById('btn-del').disabled = true;
			document.getElementById('btn-edit').disabled = true;

			document.getElementById('btn-del').style.background = "";
			document.getElementById('btn-edit').style.background = "";
			f1 = false;
 		}else {
 			f1= true;
 			el.style.background = "yellow";
			document.getElementById('btn-del').disabled = false;
			document.getElementById('btn-edit').disabled = false;

			document.getElementById('btn-del').style.background = "#805cb7";
			document.getElementById('btn-edit').style.background = "#805cb7";//"#337ab7"
 		}



 	}else if(  evtObj.target.className == "bubble-you text-style"){

		el = evtObj.target;
		if(el.style.background == ""){
			el.style.background = "yellow";

			document.getElementById('btn-del').disabled = false;
			document.getElementById('btn-edit').disabled = false;

			document.getElementById('btn-del').style.background = "#805cb7";
			document.getElementById('btn-edit').style.background = "#805cb7";//"#337ab7"

		}else{
			el.style.background = "";
			document.getElementById('btn-del').disabled = true;
			document.getElementById('btn-edit').disabled = true;

			document.getElementById('btn-del').style.background = "";
			document.getElementById('btn-edit').style.background = "";
		}

	}
}

function onDelButtonClick(){
    var ind = 0;

    var _id = el.parentElement.attributes[1].nodeValue;
    for(var i=0; i<messagesList.length; i++){
        if(_id == messagesList[i].id){
            ind = i;
            break;
        }

    }
    var elem = newMessage("пользователь " + curAut.name + "удалил сообщение "  , "system", uniqueId() );
//    messagesList.replaceChild(elem , messagesList[ind]);
    messagesList[ind] = elem;
//    renderMessages([elem]);
    var items = document.getElementsByClassName('messagesList')[0];
    var element = elementMessageFromTemplateSys();
    renderMessageState(element, elem);
//    items.appendChild(element);
    items.replaceChild(element , el.parentElement);

    saveMessages(messagesList);

//    messagesList.();

	//var l = document.getElementsByClassName('messages')[0];
	//elem = createItem(" пользователь "  + "удалил сообщение");
//	l.replaceChild(elem, el.parentElement);
//
//	document.getElementById('btn-del').disabled = true;
//	document.getElementById('btn-edit').disabled = true;
//
//	document.getElementById('btn-del').style.background = "";
//	document.getElementById('btn-edit').style.background = "";


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
	    var ind = 0;

        var _id = el.parentElement.attributes[1].nodeValue;
        for(var i=0; i<messagesList.length; i++){
            if(_id == messagesList[i].id){
                ind = i;
                break;
            }

        }
        messagesList[ind].description = txtarea.value;
        var elem = newMessage("пользователь " + curAut.name + " изменил сообщение "  , "system", uniqueId() );
        var tmpel1 = elem;
        var tmpel ;
        for(var i = ind; i<messagesList.length; i++){
            tmpel = messagesList[i];
            messagesList[i] = tmpel1;
            tmpel1 = tmpel;
        }
        messagesList.push(tmpel1);
//        messagesList[ind] = elem;
//    renderMessages([elem]);
    var items = document.getElementsByClassName('messagesList')[0];
//    items[ind].innerText = txtarea.value;
//    items.getItem()
    el.innerText = txtarea.value;
    var element = elementMessageFromTemplateSys();
    renderMessageState(element, elem);
    items.insertBefore(element, items.childNodes[ind + 1]);

//    for(var i = ind; i<items.childElementCount; i++){
//                tmpel = items[i];
//                items[i] = tmpel1;
//                tmpel1 = tmpel;
//            }
//    items.appendChild(tmpel1);
//    items.replaceChild(element , el.parentElement);

    saveMessages(messagesList);







//	    el.innerHTML= "<b><пользователь изменил сообщение></b>" + txtarea.value;
//        el.innerText= "<b><пользователь изменил сообщение></b>" + txtarea.value;

//	    renderMessages(messagesList);
//        saveMessages(messagesList);


//		var l = document.getElementsByClassName('messages')[0];
//		elem = createItem(" <пользователь изменил сообщение>" + txtarea.value);
//		txtarea.value = "";
//		l.replaceChild(elem, el.parentElement);
	}
	var editbox = document.getElementById('editbox');
	editbox.style.display = "none";

	el.style.background = "";
	document.getElementById('btn-del').disabled = true;
	document.getElementById('btn-edit').disabled = true;

	document.getElementById('btn-del').style.background = "";
	document.getElementById('btn-edit').style.background = "";
}














//function onRenameButtonClick(){
//
//
//	var user = document.getElementById('userlgn');
//	if(user.value){
//		var msg = createItem("<пользователь изменил имя на "+ user.value + " >");
//		var list = document.getElementsByClassName('messages')[0];
//		list.appendChild(msg);
//	}
//
//}
//
//

//
//
//

//

//
//
//
//
//
//function onSendButtonClick(){
//
//	var msg_text = document.getElementById('msgarea');
//	var user = document.getElementById('userlgn');
//	if(msg_text.value && user.value){
//		if (name === "null") {
//			name = user.value;
//		} else{
//			if(name != user.value){
//
//			}
//		}
//		var msg = createItem(msg_text.value);
//		var list = document.getElementsByClassName('messages')[0];
//		list.appendChild(msg);
//
//
//		msg_text.value = '';
//	}
//}
//
//function createItem(text){
//	var divItem = document.createElement('li');
//	var mess = document.createElement('div');
//	mess.className = "talk-bubble";//tri-right round border right-top";
//	var textmsg = document.createElement('div');
//	textmsg.className = "talktext";
//	textmsg.appendChild(document.createTextNode(name + " : " + text ));
//	mess.appendChild(textmsg);
//	divItem.appendChild(mess);
//
//	return divItem;
//}
