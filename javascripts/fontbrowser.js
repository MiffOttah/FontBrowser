$(function(){
    // Check Flash version
    if (swfobject.hasFlashPlayerVersion("9.0.0")){
        console.log('Loading...');

        var fontDetect = new FontDetect("font-detect-swf", "flash/FontList.swf", function(fd) {        
            var fonts = fd.fonts();

            console.log('Loaded %d fonts!', fonts.length);
            window.FontNames = [];
            for (var i = 0; i < fonts.length; i++){
                window.FontNames.push(fonts[i].fontName);
            }

            $('body').removeClass('loading');

            var fontComboBox = $('#font-combobox');
            var fcbInput = $('<input type="text">').appendTo(fontComboBox);
            fcbInput.autocomplete({
                source: window.FontNames
            });
            fcbInput.on('blur', function(){
                $('#lipsum').css('font-family', '"' + fcbInput.val() + '"');
            });

            //var text = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
            //var size = "32px";
            //
            //for(var i = 0; i < fonts.length; i++) {
            //    var node = document.createElement("p");        
            //    $(node).css("font-family", "'" + fonts[i].fontName + "'");
            //    $(node).css("font-size", size);
            //    $(node).addClass("sample-text");
            //    $(node).html(text);
            //    $("#content").append(node);
            //
            //    var nameNode = document.createElement("p");
            //    $(nameNode).addClass("sample-text-name");
            //    $(nameNode).html("[" + fonts[i].fontName + "]");
            //    $("#content").append(nameNode);
            //}
        });

    } else {
        console.log('Incompatible flash version');
    }
});    
