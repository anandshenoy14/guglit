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
    var localArrayOfUrlsSearched, localArrayOfTermsSearched;
    chrome.storage.sync.get(['searchUrlsOnGuglitv5','searchTermsOnGuglitv5'], function(items) {
        localArrayOfUrlsSearched = items.searchUrlsOnGuglitv5;
        localArrayOfTermsSearched = items.searchTermsOnGuglitv5;
        if(localArrayOfUrlsSearched === null || localArrayOfUrlsSearched === undefined){
            localArrayOfUrlsSearched = '';
        }
        if(localArrayOfTermsSearched === null || localArrayOfTermsSearched === undefined){
            localArrayOfTermsSearched = '';
        }
        localArrayOfUrlsSearched = localArrayOfUrlsSearched + guglSearchUrl + query + '<<>>';
        localArrayOfTermsSearched = localArrayOfTermsSearched + query + '<??>';
        chrome.storage.sync.set({'searchUrlsOnGuglitv5': localArrayOfUrlsSearched,'searchTermsOnGuglitv5':localArrayOfTermsSearched}, function() {
            // Notify that we saved.
            message('Settings saved');
        });
    });
    
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
