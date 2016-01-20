'use strict';
window.PreventHideMenu = false;
window.FontNames = ['Andale Mono', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Georgia', 'Impact', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Webdings'];

$(function(){
    $('body').click(function(){
        if (window.PreventHideMenu){
            window.PreventHideMenu = false;
        } else {
            $('.menu').hide();
        }
    } );

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

            ready();
        });

    } else {
        // fall back to cfw
        ready();
    }
});

function ready(){
    for (var i = 0; i < window.FontNames.length; i++){
        $('<li></li>').text(window.FontNames[i]).appendTo('#fontlist-menu');
    }

    var fontComboBox = $('#font-combobox');
    var fcbInput = $('<input type="text">').appendTo(fontComboBox);
    fcbInput.autocomplete({
        source: window.FontNames
    });
    fcbInput.on('blur', function(){
        setFont(fcbInput.val());
    });
    var fcbButton = $('<button type="button" class="combobutton"><span class="ui-icon ui-icon-triangle-1-s"></span></button>').appendTo(fontComboBox);
    fcbButton.click(function(){
        comboBoxMenu($('#fontlist-menu'), fcbButton, fcbInput, function(){ setFont(fcbInput.val()); });
    });

    var stComboBox = $('#sampletext-combobox');
    var stcbInput = $('<input type="text" value="The quick onyx goblin jumps over the lazy dwarf.">').appendTo(stComboBox);
    stcbInput.on('blur', function(){ $('#lipsum > p').text(stcbInput.val()); });
    var stcbButton = $('<button type="button" class="combobutton"><span class="ui-icon ui-icon-triangle-1-s"></span></button>').appendTo(stComboBox);
    stcbButton.click(function(){
        comboBoxMenu($('#sampletext-menu'), stcbButton, stcbInput, function(){ $('#lipsum > p').text(stcbInput.val()); });
    });

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

    $('body').removeClass('loading');
}

function comboBoxMenu(menuEl, button, input, callback){
    var offset = input.offset();
    var left = offset.left;
    var top = offset.top + button.height();

    menuEl.css({
        'display': 'block',
        'left': left,
        'top': top
    });

    if (!menuEl.hasClass('ui-menu')){
        menuEl.menu();
        menuEl.find('li').click(function(){
            input.val($(this).text());
            callback();
        });
    }

    window.PreventHideMenu = true;
}

function setFont(face){
    $('#font-combobox input').val(face);
    $('#lipsum').css('font-family', '"' + face + '"');
}