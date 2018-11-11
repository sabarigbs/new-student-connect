$(document).ready(function () {

    let formHeight = $(".loginComponentWrapper").height() / 2;
    let windowHeight = $(window).height() / 2;
    $('.container').css('padding-top', windowHeight - formHeight);

    $(window).resize(function () {
        let formHeight = $("#form-container").height() / 2;
        let windowHeight = $(window).height() / 2;
        $('.container').css('padding-top', windowHeight - formHeight);
    });


    

});