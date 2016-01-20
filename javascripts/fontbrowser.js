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
                setFont(fcbInput.val());
            });
            var fcbButton = $('<button type="button" class="combobutton"><span class="ui-icon ui-icon-triangle-1-s"></span></button>').appendTo(fontComboBox);

            var stComboBox = $('#sampletext-combobox');
            var stcbInput = $('<input type="text" value="The quick onyx goblin jumps over the lazy dwarf.">').appendTo(stComboBox);
            stcbInput.on('blur', function(){
                $('#lipsum').text(stcbInput.val());
            });
            var stcbButton = $('<button type="button" class="combobutton"><span class="ui-icon ui-icon-triangle-1-s"></span></button>').appendTo(stComboBox);

            var fontsizeSpinner = $('#fontsize-spinner');
            var fssInput = $('<input type="text" value="12">').appendTo(fontsizeSpinner);
            fssInput.spinner({
                change: function(){ $('#lipsum').css({'font-size': fssInput.val() + 'pt'}); },
                spin: function(){ $('#lipsum').css({'font-size': fssInput.val() + 'pt'}); }
            });

            setFont(window.FontNames[Math.floor(Math.random() * window.FontNames.length)]);

            $('#lipsum').css({
                'width': ($(window).width() / 2) + 'px',
                'left': ($(window).width() / 4) + 'px'
            }).resizable().draggable();
        });

    } else {
        console.log('Incompatible flash version');
    }
});    

function setFont(face){
    $('#font-combobox input').val(face);
    $('#lipsum').css('font-family', '"' + face + '"');
}