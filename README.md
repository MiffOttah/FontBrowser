# font-detect-js

Uses javascript (jQuery or Prototype) + flash to detect your system fonts.

[View a demo](http://font-detect.s3.amazonaws.com/index.html)

![font-detect.png](http://font-detect.s3.amazonaws.com/font-detect.png)

	<!-- element for SWF to load into -->
	<div id="font-detect-swf"></div>

	<script src="javascripts/jquery-1.2.6.pack.js"></script>
	<script src="javascripts/swfobject.js"></script>
	<script src="javascripts/font-detect.js"></script>  
	<script>
	  $(document).ready(function() {
	  
	    var onComplete = function(e) {
	      //onComplete can be used to defind a callback function that is called on both success or failure of creating a Flash plugin
	      //see also, https://code.google.com/p/swfobject/wiki/api
	      //onComplete is supported since SWFObject 2.2
	    }

	    var fontDetect = new FontDetect("font-detect-swf", "flash/FontList.swf", function(fd) {        
	      var fonts = fd.fonts();
       
	      // Do something with fonts, which look like: [ { fontName:'Arial', fontStyle:'regular' fontType:'device' }, .... ]
	      // for(var i = 0, length = fonts.length; i < length; i++) {
	      //   var name = fonts[i].fontName;
	      // }
	    });
   
	  }, onComplete);
	</script>

There is also a Prototype version at font-detect.prototype.js
