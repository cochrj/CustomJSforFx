// 'Classic autocomplete popup with two lined results' script for Firefox 60+ by Aris
// CSS code based on https://github.com/Aris-t2/CustomCSSforFx/blob/master/classic/css/locationbar/ac_popup_classic_with_url_only_fx64.css
// popup width gets adjusted automatically when switching between normal, maximized and fullscreen window modes
// popup width does not get adjusted automatically when switchting between compact, normal and touch toolbar modes

// [!] option: 'Visit...' and 'Search with...' items can be hidden using 'hide_visit_search_items' variable
// [!] option: type icons like boomarks star, switch to tab etc. can be moved to the right using 'move_bookmarks_star_to_the_end' variable


var {Services} = Components.utils.import("resource://gre/modules/Services.jsm", {});
var sss = Components.classes["@mozilla.org/content/style-sheet-service;1"].getService(Components.interfaces.nsIStyleSheetService);

var hide_visit_search_items = false;
var move_bookmarks_star_to_the_end = false;

setTimeout(function(){
  try{
	
	classicAcpopup();
	
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
		classicAcpopup();
	  });    
	});
	
	observer.observe(document.getElementById("main-window"), { attributes: true, attributeFilter: ['sizemode'] });
	
	function classicAcpopup(event){
	
	  var urlbar_width = Math.round(document.getElementById("urlbar").getBoundingClientRect().width);
	  var urlbar_results = 10;
	  
	  try{
	    urlbar_results = Services.prefs.getBranch("browser.urlbar.").getIntPref("maxRichResults");
	  } catch(e){}
	  
	  var hide_visit_search_items_code = '';
	  
	  if(hide_visit_search_items)
		hide_visit_search_items_code = '\
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistbox { \
			  min-height: 0 !important; \
			  height: auto !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:first-of-type:-moz-any([type*="heuristic"],[actiontype="searchengine"],[actiontype="visiturl"],[actiontype="keyword"],[actiontype="switchtab"]), \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:-moz-any([type*="heuristic"],[actiontype="searchengine"],[actiontype="visiturl"],[actiontype="keyword"],[actiontype="switchtab"]), \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem[anonid="type-icon-spacer"], \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:first-of-type[actiontype="visiturl"] + richlistitem[actiontype="searchengine"], \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:first-of-type:last-of-type[actiontype="searchengine"] { \
			  z-index: -1000000000 !important; \
			  position: fixed !important; \
			  opacity: 0 !important; \
			  visibility: collapse !important; \
			  min-height: 0 !important; \
			  height: 0 !important; \
			  max-height: 0 !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:not([collapsed="true"]) + richlistitem:-moz-any([type*="heuristic"],[actiontype="searchengine"],[actiontype="visiturl"],[actiontype="keyword"],[actiontype="switchtab"]), \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:-moz-any([type*="heuristic"],[actiontype="searchengine"],[actiontype="visiturl"],[actiontype="keyword"],[actiontype="switchtab"]) + richlistitem:-moz-any([type*="heuristic"],[actiontype="searchengine"],[actiontype="visiturl"],[actiontype="keyword"],[actiontype="switchtab"]) { \
			  display: none !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > richlistbox { \
			  overflow: auto !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > richlistbox { \
			  overflow-x: hidden !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > richlistbox, \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] scrollbox, \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > .autocomplete-richlistbox { \
			  overflow-y: auto !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem:first-of-type:-moz-any([type*="heuristic"],[actiontype="searchengine"],[actiontype="visiturl"],[actiontype="keyword"]), \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] richlistitem[anonid="type-icon-spacer"] { \
			  display: none !important; \
			} \
		  \
		';
	  
	  var move_bookmarks_star_to_the_end_code = '';
	  
	  if(move_bookmarks_star_to_the_end)
		 move_bookmarks_star_to_the_end_code = ' \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-type-icon { \
			  -moz-margin-start: '+ (urlbar_width-26) +'px !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-site-icon { \
			  -moz-margin-start: -'+ (urlbar_width-10) +'px !important; \
			} \
			#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-type-icon { \
			  margin-bottom: 20px !important; \
			} \
	 ';

	  var uri = Services.io.newURI("data:text/css;charset=utf-8," + encodeURIComponent('\
		\
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] { \
		  --item-padding-start: 0 !important; \
		  --item-padding-end: 0 !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] { \
		  min-width: '+urlbar_width+'px !important; \
		  width: '+urlbar_width+'px !important; \
		  max-width: '+urlbar_width+'px !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-title-text,  \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-url-text { \
		  min-width: calc( '+urlbar_width+' - 50px) !important; \
		  width: calc( '+urlbar_width+' - 50px) !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] { \
		  -moz-margin-start: 0 !important; \
		  margin-top: -5px !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistbox { \
		  padding: 0 !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistbox { \
		  height: auto !important; \
		  max-height: calc(47.5px * '+urlbar_results+') !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem { \
		  position: relative !important; \
		  height: 44px !important; \
		  border-bottom-color: transparent !important; \
		  -moz-margin-start: 0 !important; \
		  -moz-padding-start: 0 !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(ltr) .autocomplete-richlistitem { \
		  left: 0 !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(rtl) .autocomplete-richlistitem { \
		  right: 0 !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-title { \
		  position: absolute !important; \
		  top: 1px; \
		  font-size: 14px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(ltr) .autocomplete-richlistitem .ac-title { \
		  left: 30px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(rtl) .autocomplete-richlistitem .ac-title { \
		  right: 30px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-url, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-action { \
		  position: absolute !important; \
		  top: 24px; \
		  font-size: 12px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(ltr) .autocomplete-richlistitem .ac-url, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(ltr) .autocomplete-richlistitem .ac-action { \
		  left: 30px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(rtl) .autocomplete-richlistitem .ac-url, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(rtl) .autocomplete-richlistitem .ac-action { \
		  right: 30px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-tags { \
		  position: absolute !important; \
		  top: 3px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(ltr) .autocomplete-richlistitem .ac-tags { \
		  right: 0px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"]:-moz-locale-dir(rtl) .autocomplete-richlistitem .ac-tags { \
		  left: 0px; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem spacer, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-separator {  \
		  display: none !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-type-icon { \
		  margin-bottom: -20px !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem .ac-site-icon { \
		  -moz-margin-start: -22px !important; \
		  margin-top: -20px !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem[selected=true] { \
		  background-color: Highlight !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem[selected=true] .ac-action-text, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem[selected=true] .ac-title,  \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .ac-title[selected], \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem[selected=true] .ac-url,  \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .ac-url[selected], \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem[selected=true] .ac-action, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .ac-action[selected], \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem[selected=true] .ac-separator, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .ac-separator[selected] { \
		  color: HighlightText !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem:not([selected]):not(:hover) > .ac-action[actiontype=searchengine] { \
		  display: block !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] .autocomplete-richlistitem { \
		  border-inline-end: 0px solid transparent !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > richlistbox { \
		  overflow-x: hidden !important; \
		} \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > richlistbox, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] scrollbox, \
		#PopupAutoCompleteRichResult[autocompleteinput="urlbar"] > .autocomplete-richlistbox { \
		  overflow-y: auto !important; \
		} \
		'+hide_visit_search_items_code+' \
		'+move_bookmarks_star_to_the_end_code+' \
	  '), null, null);
	  

	  if (sss.sheetRegistered(uri,sss.AGENT_SHEET)) sss.unregisterSheet(uri,sss.AGENT_SHEET);

	  sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);

	}
	  
  } catch(e){}
},1000);
