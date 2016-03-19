'use strict';
var usersList = [];
var f= false;

var messagesList = [];


function run(){
	var btnLog = document.getElementById('Logger');

	btnLog.addEventListener('click',onLogButtonClick);
	usersList = loadUsers() || [
			newUser('User', false),
			newUser('User2', false)
		];

	renderUsers(usersList);
    checkLog(btnLog);


    var btnSend = document.getElementById('Send_msg');
    btnSend.addEventListener('click', onSendButtonClick);

    messagesList = loadMessages() || [
            newMessage('Hello to all','User 21: 16: 12', 111),
            newMessage('Hello','User2 21: 32: 15', 123)
        ];
    renderMessages(messagesList);

}

function onSendButtonClick(){

    var msg_text = document.getElementById('messInput');
    if (msg_text.value && !f){

        var curAut = usersList[usersList.length - 1];
        var newMsg = newMessage(msg_text.value, curAut.name, curAut.id );
        messagesList.push(newMsg);
        //msg_text.value = '';
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
    var curAut = usersList[usersList.length - 1];
    for(var i = 0; i < messages.length; i++) {
        if(curAut.name == messages[i].author){
            renderMessage(messages[i], 2);
        } else {
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
    }else{
        var element = elementMessageFromTemplateMe();
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

    element.setAttribute('data-massage-id', msg.id);
    element.setAttribute('massage-author-id', msg.authorId);


    element.lastElementChild.textContent = msg.description;
    element.firstElementChild.textContent = msg.author;
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








function checkLog(btnLog){
    var item = usersList[usersList.length-1];
    if(item.me){
        var text = document.getElementById('userName');
        text.readOnly = true;
        text.placeholder = '';
        btnLog.innerText  = "Logout";
        f = false;
    }else{
        btnLog.innerText  = "Login";
        f= true;
    }

}
function onLogButtonClick(element){
    if(f){
        var text = document.getElementById('userName');
        if(text.value == '')
            return;

        var newUsr = newUser(text.value, true);
        usersList.push(newUsr);
        text.value = '';
       // renderUsers([newUsr], 2);
        renderUsers([newUsr]);
        saveUsers(usersList);

    } else{
        var index = usersList.length-1;
        usersList.splice(index, 1);
       // element.parentElement.removeChild(element);
        renderLocalStorage(usersList);
        saveUsers(usersList);

    }



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
	var items = document.getElementsByClassName('users-style-text')[0];
    if(usr.me ){
        var element = elementFromTemplateMe();
    } else{
        var element = elementFromTemplate();
    }


	renderUserState(element, usr);
	items.appendChild(element);
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