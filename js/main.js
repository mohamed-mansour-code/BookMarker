var webName = document.getElementById("webName");
var webUrl = document.getElementById("webUrl");
var boxItem = document.getElementById("boxItem");
var alert1 = document.getElementById("alert1");
var alert2 = document.getElementById("alert2");
var alert3 = document.getElementById("alert3");


// ========== container ==========
var links =[];

if(localStorage.getItem("links") != null){
    links = getStorage();
    display();
}


// ========== Add ==========
function add(){
    var web = {
        name:webName.value,
        link:webUrl.value
    }

    if(matchName(web.name) && matchUrl(web.link) && exist() == false){
        links.push(web);
        reset();
        display();
        hiddenAlert();
        setStorage(links);
    }else{
        visibleAlert();
    }
}

// ========== reset ==========
function reset(){
    webName.value = "";
    webUrl.value = "";
}

// ========== display ==========
function display(){
    var result = ``;
    for(i=0 ; i < links.length ; i++){
        result += `<div class="item d-flex align-items-center py-4 px-3">
        <h3 class="col-6 fs-25 fw-700">${links[i].name}</h3>
        <a class="btn btn-primary me-2" href="${links[i].link}" target="_blank">visit</a>
        <button onclick="deleted(${i})" class="btn btn-danger">Delete</button>
     </div>`;
    }
    boxItem.innerHTML = result;
}

// ========== deleted ==========
function deleted(index){
    links.splice(index,1);
    display();
    setStorage(links);
}

// ========== match name ==========
function matchName(index){
    var regex = /^\w{3,12}$/;
    return regex.test(index);
}

// ========== match url ==========
function matchUrl(index){
    var regex = /^https?:\/\/(www\.)?(\w+|\w+\.\w+)\.(com|io)/;
    return regex.test(index);
}

// ========== hidden alert ==========
function hiddenAlert(){
    if(alert1.classList.contains("d-block")){
        alert1.classList.replace("d-block" , "d-none");
    };
    if(alert2.classList.contains("d-block")){
        alert2.classList.replace("d-block" , "d-none");
    };
    if(alert3.classList.contains("d-block")){
        alert3.classList.replace("d-block" , "d-none");
    };
}

// ========== visible alert ==========
function visibleAlert(){
     if(matchName(webName.value) == false){
        alert1.classList.replace("d-none" , "d-block");
    }else if(alert1.classList.contains("d-block")){
        alert1.classList.replace("d-block" , "d-none");
    };
    if(matchUrl(webUrl.value) == false){
        alert2.classList.replace("d-none" , "d-block");
    }else if(alert2.classList.contains("d-block")){
        alert2.classList.replace("d-block" , "d-none");
    };
    if(exist()){
        alert3.classList.replace("d-none" , "d-block");
    }else if(exist() == false){
            if(alert3.classList.contains("d-block")){
                alert3.classList.replace("d-block" , "d-none");
            }
    };
}

// ========== set storage ==========
function setStorage(index){
    localStorage.setItem("links",JSON.stringify(index));
}

// ========== get storage ==========
function getStorage(){
    return JSON.parse(localStorage.getItem("links"));
}

// ========== check url exist ==========
function exist(){
    var ex = false;
    for(i=0 ; i < links.length ; i++){
        if(links[i].link == webUrl.value){
            ex= true;
        }
    }
    return ex;
}
