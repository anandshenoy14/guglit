'use strict';

    console.log('Reading the list');
    var arrayOfUrls, arrayOfSearchItems;
    chrome.storage.sync.get(['searchUrlsOnGuglitv5','searchTermsOnGuglitv5'], function(items) {
        console.log('The type of items is '+typeof items);
        //console.log('items '+JSON.stringify(items));
        arrayOfUrls = items.searchUrlsOnGuglitv5.split('<<>>');
        arrayOfSearchItems = items.searchTermsOnGuglitv5.split('<??>');
        var ul = document.getElementById('listOfUrls');
        for(var i=0;i< arrayOfUrls.length - 1;i++){
            var li = document.createElement('li');
            var hyperlink = document.createElement('a');
            hyperlink.setAttribute('href',arrayOfUrls[i]);
            hyperlink.appendChild(document.createTextNode(arrayOfSearchItems[i]));
            li.appendChild(hyperlink);
            ul.appendChild(li);
        }
        if(arrayOfUrls.length > 0){
            var listOfUrlsTextPlaceholderEl = document.getElementById('lblOfList');
            listOfUrlsTextPlaceholderEl.appendChild(document.createTextNode('Here is the list of URLS Searched : '));
        }
    });