$(function(){
    $(".temp").load("../index.html #navbar", function(){
        $.getScript("../js/websocket.js", complete = current);
        $("#navbar").clone().contents().appendTo("#nav");
        $(".temp").remove();
    });
});


function current(){
    let URL = window.location.href;

    $(".navbar_links ul li a").each(function(){
        if(this.href == URL){
            $(this).closest("li").addClass("current");
        }
    });

}