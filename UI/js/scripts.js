'use strict';
var usersList = [];
var f= false;
function run(){
	var btnLog = document.getElementById('Logger');
    //if(f){
    //    btnLog.innerText  = "Logout";
    //}else{
    //    btnLog.innerText  = "Login";
    //}
	btnLog.addEventListener('click',onLogButtonClick);
	usersList = loadUsers() || [
			newUser('User', false),
			newUser('User2', false)
		];

	renderUsers(usersList);
    checkLog(btnLog)
}
function checkLog(btnLog){
    var item = usersList[usersList.length-1];
    if(item.me){
        btnLog.innerText  = "Logout";
        f = false;
    }else{
        btnLog.innerText  = "Login";
        f= true;
    }

}
function onLogButtonClick(){
    var btn = document.getElementById('Logger');
    if(f){
        var text = document.getElementById('userName');
        if(text.value == '')
            return;

        var newUsr = newUser(text.value, true);
        usersList.push(newUsr);
        text.value = '';
        renderUsers([newUsr], 2);
        saveUsers(usersList);

    } else{

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