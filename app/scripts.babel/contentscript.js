'use strict';

var keys = [];
var isShiftGPressed = function(){
    if(keys.length === 2) {
        if(keys[0] !== keys[1]){
            openNewTabWithSearchTerm(window.getSelection().toString());
        }else{
            keys.pop();
        }
        emptyKeys();  
    }
};
var openNewTabWithSearchTerm = function(query){
    var guglSearchUrl = 'https://www.google.com/search?q=';
    window.open(guglSearchUrl + query, '_blank');
}
var emptyKeys = function(){
    while(keys.length > 0) {
        keys.pop();
    }
};
var handleKeyDown = function(e){
        if(e.keyCode === 16 || e.keyCode === 71){
            keys.push(e.keyCode);
            if(keys.length === 2) {
                isShiftGPressed();
            }
        }
};

window.addEventListener('keydown',handleKeyDown,true);
