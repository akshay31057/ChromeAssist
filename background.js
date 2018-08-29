chrome.browserAction.onClicked.addListener(function(tab) { 
  alert();
  //////////////////////////////////////Google Analytics////////////////////////////////////  
});
/////////////////////events///////////////////////////
var doGroup = function() {
  // Make use of clustering algorithms to group tabs on the basis of the similarity of the content 
  // You may use the API: http://api.meaningcloud.com/clustering-1.1
};




$(document).ready(function(){
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-97189820-2', 'auto');
  ga('send', 'pageview');
  ////////////////////////////////////////////////////////////////////////////////
    var accessToken = "326a6c78dc86439ba21c9cf3cb8a0cf0";
    var timevocal = 0;
    var baseUrl = "https://api.api.ai/v1/";
    var talking = true;
    var nlp = window.nlp_compromise;
    var recognition;
    var txt;
    var voicetrigger;
    startRecognition();
    checkOnline(); 

    //first time when application will be loaded
    chrome.runtime.setUninstallURL("https://goo.gl/forms/7EIjOCgMqZSAsIj92", function(){

    });

     chrome.storage.local.get(/* String or Array */["firsttime"], function(items2){
        if(items2.firsttime === undefined || items2.firsttime === 2){
          chrome.storage.local.set({ "firsttime": 3 }, function(){
              chrome.tabs.create({'url': 'chrome://newtab'});
              chrome.tabs.create({'url': '/man.html#html1-structure'});
          });
        }
     });
/*var tabid=0;
     chrome.tabs.onHighlighted.addListener(function(hi){
      console.log(hi.tabIds[0]);
       tabid=hi.tabIds[0];
       myfun();
     });
     selectionontab="";
   function myfun(){
      if(tabid!=0){
      chrome.tabs.executeScript(tabid,{
          code: "window.getSelection().toString();"
        },function(selection){
          if(selectionontab!=selection[0]){
            console.log(selectionontab);
           // Speech(selection[0]);
            selectionontab=selection[0];
            myfun();
          }
          else
            myfun();
        }
        );
    } 
    }*/

     //function for giving sleep 
    function sleep(milliseconds) {
      var start = new Date().getTime();
      for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
      break;
      }
    }
  }
// check if browser if online or offline
var offline = false;
checkOnline(); 
  function checkOnline() {
    if (!navigator.onLine && !offline) {
        offline = true;
        chrome.storage.local.set({ "onoffswitch": "false"}, function(){
          
          });             
    }
    if (navigator.onLine) {
        offline = false;
    }
    setTimeout(checkOnline, 1000);
}
//function for recognition
    function startRecognition() {
      chrome.storage.local.get(/* String or Array */["onoffswitch"], function(items){
        if(items.onoffswitch === "true"){
      recognition = new webkitSpeechRecognition();
      recognition.onstart = function(event) {
        updateRec();
      };  
      var text = "";
      recognition.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
            }
          
          //setInput(text);

        //stopRecognition();
      };
      recognition.onend = function() {
        
        chrome.storage.local.get(/* String or Array */["trigger"], function(items2){
            if(text.toLowerCase() === items2.trigger.toLowerCase()){
            // alert(text);
            Speech("Yes Sir");
            sleep(1500);
            /*chrome.storage.local.clear(function() {
            var error = chrome.runtime.lastError;
            if (error) {
            console.error(error);
            }
            });*/
          recognition.stop();
            startRecognitionaftertrigger();
        }
          else
            if(text.toLowerCase().startsWith(items2.trigger.toLowerCase())){
             var str = text.toLowerCase().replace(items2.trigger.toLowerCase()+" ","");
             setInput(str);
             recognition.stop();
             startRecognition();
            }
            else 
          {
            recognition.stop();
        startRecognition();
          }
        });
       // stopRecognition();
      };
      recognition.lang = "en-US";
      recognition.start();
    } 
    else{
     
      startRecognition();
    }
    });
    }
    //start recognition after trigger
  function startRecognitionaftertrigger(){
    recognition = new webkitSpeechRecognition();
      recognition.onstart = function(event) {
        //updateRec();
      };  
      var text = "";
      recognition.onresult = function(event) {
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            text += event.results[i][0].transcript;
          }
          //setInput(text);
          
        //stopRecognition();
      };
      recognition.onend = function() {
        if(text === ""){
          recognition.stop();
          startRecognition();
        }
        else{
          recognition.stop();
          setInput(text);
          startRecognition();
      }
      };
      recognition.lang = "en-US";
      recognition.start();
  }
  //to stop recognition
    function stopRecognition() {
      if (recognition) {
        recognition.stop();
        recognition = null;
      }
     // updateRec();
    }
    //to switch 
    function switchRecognition() {
      if (recognition) {
        stopRecognition();

      } else {
        startRecognition();
      }
    }
    //to set input 
    function setInput(text) {
      txt = text;
      send();
    }
    function updateRec() {
      
    }
  function provideJoke(){
    // Complete the execution of this function to return a joke 
    // You may use APIs like http://api.icndb.com/jokes/random
		
	};
    //sending the data to server
    function send() {
      if((txt.indexOf('.com') == -1) && (txt.indexOf('.in') == -1) && (txt.indexOf('.org') == -1) && (txt.indexOf('.io') == -1) && (txt.indexOf('.io') == -1)){
      $.ajax({
        type: "POST",
        url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        headers: {
          "Authorization": "Bearer " + accessToken
        },
        data: JSON.stringify({ query: txt, lang: "en", sessionId: "somerandomthing" }),
        success: function(data) {
            if(data.result.metadata.intentName === "call me"){
          chrome.storage.local.set({ "username": data.result.parameters.any }, function(){
            //  Data's been saved boys and girls, go on home
          });
      }else
      if(data.result.metadata.intentName === "youtube search"){
        chrome.tabs.create({'url':'https://www.youtube.com/results?search_query='+ data.result.parameters.any });
      }
              if(data.result.fulfillment.speech !== 'i am searching this on google'){
            var speech =  data.result.fulfillment.speech;
             if(data.result.fulfillment.speech === '@time'){
              var now = new Date($.now());
              var ampm = (now.getHours() >= 12) ? "PM" : "AM";
              var time = now.getHours()-12+":"+now.getMinutes()+" "+ampm;
              timevocal = 1;
              Speech(time);
             }
             else{
              if((speech.indexOf('.com') != -1) || (speech.indexOf('.in') != -1) || (speech.indexOf('.org') !== -1) || (speech.indexOf('.io') != -1)){
                Speech("opening. Sir");
                chrome.tabs.create({'url':'http://'+speech});
              }
              else
                if(data.result.fulfillment.speech === '@close'){
                  chrome.tabs.getSelected(null, function(tab) {
                  tab = tab.id;
                  chrome.tabs.remove(tab,function(){});
                  tabUrl = tab.url;
                  //alert(tab.url);
                });
                Speech("closing");
              }
              else if (data.result.fulfillment.speech === '@refresh') {
                            chrome.tabs.reload();
                            Speech("reloading");
              }
              else if(data.result.fulfillment.speech === '@exit'){
                Speech("closing, Sir");
                setTimeout(function(){
                  }, 500); 
                chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                chrome.tabs.remove(tabs[i].id);
                }
                });
              }
              else 
                if (data.result.fulfillment.speech === '@bookmark') {           
                            chrome.tabs.getSelected(function(tab) { //<-- "tab" has all the information
                                      chrome.bookmarks.create({ 'title': tab.title,'url': tab.url});
                                     });
                            Speech("I have Added this page to favourites");
              }
              else
                if(data.result.fulfillment.speech === '@keepthis'){
                  Speech("closing , Sir");
                  var currenttab;
                  chrome.tabs.getSelected(null, function(tab) {
                  currenttab = tab.id;
                    chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                  if(tabs[i].id == currenttab){
                    continue;
                  }
                chrome.tabs.remove(tabs[i].id);
                }
                });
                });
                }
               
              else
                if(data.result.fulfillment.speech === '@open'){
                Speech("opening");
                chrome.tabs.create({'url': 'chrome://newtab'});
              }
              else
                 if(data.result.fulfillment.speech === "@downloads"){
                chrome.tabs.create({'url': 'chrome://downloads'});
                Speech("opening! Downloads");
                }
                else
                 if(data.result.fulfillment.speech === "@next"){
                var currenttab;
                  chrome.tabs.getSelected(null, function(tab) {
                  currenttab = tab.id;
                    chrome.tabs.query({}, function (tabs) {
                for (var i = 0; i < tabs.length; i++) {
                  if(tabs[i].id == currenttab){
                   chrome.tabs.update(tabs[i+1].id, { active: true});
                  }

                }
                  });
                  });
                Speech("opening! next");
                }
               
						else if(data.result.metadata.intentName === "setting")
						{
							Speech("opening! Settings.");
							// Add code for opening settings
							
						}
						else if(data.result.metadata.intentName === "open history")
						{
							Speech("opening! History.");
							// Add code for opening history
            }
            else
                 if(data.result.fulfillment.speech === "@prev"){
                 // Add code for moving to tab to immediate left
                   //(you may ignore the case where current tab is the leftmost).
                Speech("opening! prev");
                }
            else {
             			if(data.result.metadata.intentName === "users_name"){
								chrome.storage.local.get(/* String or Array */["username"], function(items){
								if(items.username === undefined ){
									Speech("you didn't told me your name Yet . Please Tell me your name . ");
								}
								else
									Speech(speech+" "+items.username);
								});
						
							}
							
						}
					}
				}
          
     			else {
					var idx;
					if((idx = (txt.toLowerCase()).lastIndexOf("Wikipedia".toLowerCase())) !==-1)
					{
						Speech("I am searching this on wikipedia.");
					//Code to search content directly on wikipedia.	
					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("change background".toLowerCase())) !==-1)
					{
            // Code to change body backgroud color
            // HINT: use simple DOM commands for this.
					}
					else if((idx = (txt.toLowerCase()).indexOf("let us".toLowerCase())) !==-1){
						Speech("enjoy tetris");
            // Open tetris game in new tab.
            // HINT: You may use tetris.com 
					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("print".toLowerCase())) !==-1)
					{
						//alert(txt);
            // Code to print the current tab
          }
            // YOUTUBE SPECIFIC feature
					else if((idx = (txt.toLowerCase()).lastIndexOf("halt".toLowerCase())) !==-1)
					{
						//alert(txt);
						// Code to pause currently playing video.
					}
             // YOUTUBE SPECIFIC feature
					else if((idx = (txt.toLowerCase()).lastIndexOf("play".toLowerCase())) !==-1)
					{
						//alert(txt);
						// Code to play currently playing video.
					}
             // YOUTUBE SPECIFIC feature
					else if((idx = (txt.toLowerCase()).lastIndexOf("next video".toLowerCase())) !==-1)
					{
						//alert(txt);
				
						// Code to play NEXT video.

					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("news".toLowerCase())) !==-1)
					{
						Speech("Opening");
						//  Code to open google news.
					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("incognito".toLowerCase())) !==-1)
					{
						Speech("Opening incognito window.");
					  // Code to open incognito window
            						
					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("backward".toLowerCase())) !==-1)
					{
						Speech("Going backwards in history.");
						// Code to perform functionality of back button.
					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("minimise".toLowerCase())) !==-1)
					{
						Speech("Minimizing window.");
						// Code to minimize window.
					}
					else if((idx = (txt.toLowerCase()).lastIndexOf("maximize".toLowerCase())) !==-1)
					{
						Speech("Maximizing window.");
						// Code to minimize window.
            
					}
					else if((idx = (txt.toLowerCase()).indexOf("tab".toLowerCase())) !==-1)
					{
						var integer = parseInt(txt.substring(4));
						Speech("Moving to tab"+integer);
						// Code to move to a particular indexed tab
          }
					else if((idx = (txt.toLowerCase()).indexOf("arrange heading".toLowerCase())) !==-1)
					{
						Speech("Arranging the headings of the tab");
            // Code to arrange tabs alphabetically 
					}
					else if((idx = (txt.toLowerCase()).indexOf("group content".toLowerCase())) !==-1)
					{
						Speech("Grouping the contents of tabs.");
            //Code to group tabs on the basis of their functionality
            //Perform the functionlity in doGroup() function.
						doGroup();
					}
					else if((idx = (txt.toLowerCase()).indexOf("zoom in".toLowerCase())) !==-1)
					{
						Speech("Zooming in.");
            // Code to zoom in 
          }
					else if((idx = (txt.toLowerCase()).indexOf("zoom out".toLowerCase())) !==-1)
					{
						Speech("Zooming out.");
						// Code to zoom out 
					}
					else if((idx = (txt.toLowerCase()).indexOf("tell me a joke".toLowerCase())) !==-1)
					{
						Speech("Hope you like this one.");
            // Implement provideJoke() function to return a joke.
						provideJoke();
						Speech("Isn't it good?");
					}
					else
					{
						setResponse(data.result.fulfillment.speech);
						chrome.tabs.create({'url': 'http://google.com/search?q='+txt});					
						chrome.tabs.executeScript({
							code: "document.getElementsByClassName('_XWk')[0].innerHTML;"
							},function(selection){//_XW//alert(selection[0]);
								if(selection[0]===null){
									chrome.tabs.executeScript({
										code:"var rex = /(<([^>]+)>)/ig; document.getElementsByClassName('_Tgc')[0].innerHTML.replace(rex,'').split('.')[0];"
									},function(sl){
										if(sl[0]===null){
											chrome.tabs.executeScript({
												code:"var rex = /(<([^>]+)>)/ig; document.getElementsByClassName('st')[0].innerHTML.replace(rex,'').split('.')[0];"
											},function(sl2){
												Speech("According to Google "+sl2[0]);
											});
										}
										else
											Speech("According to Google "+sl[0]);
									});
								}
								else
									Speech(selection[0]); 
							}
						);
				    }
				}
			},
			error: function() {
				setResponse("Sorry ! we are having some internal problem. Please Try again.");
			}
			});
		}
		else{
			Speech("opening");
			chrome.tabs.create({'url': "http://www."+txt });
		}
    }
    function setResponse(val) {
      Speech(val);
    }
    //to speech 
  
    //to speech 
    function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var language = window.navigator.userLanguage || window.navigator.language;
    var utterance = new SpeechSynthesisUtterance(say);
    //msg.voice = voices[10]; // Note: some voices don't support altering params
    //msg.voiceURI = 'native';
    if(timevocal == 1){
      utterance.volume = 1; // 0 to 1
      utterance.pitch = 0; //0 to 2
    utterance.voiceURI = 'native';
    utterance.lang = "en-IN";
    speechSynthesis.speak(utterance);
    timevocal=0
    }
    else{
    utterance.volume = 1; // 0 to 1
    utterance.rate = 0.9; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    //utterance.text = 'Hello World';
    utterance.voiceURI = 'native';
    utterance.lang = "hi-IN";
    speechSynthesis.speak(utterance);
    }
  }
  }
});
