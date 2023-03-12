let select_bar = false
let select_bar_idx = 0

function home_display(){
    $.ajax({
        type: 'POST',
        url: "http://127.0.0.1:5000/init_home",
        data: {},
        success: function(response){
            console.log()
        },
        error: function(error){
            console.log(error)
        }
    });
}

$(document).ready(function(){

    $(".home").show()
    $(".scree-plot").hide()
    $(".biplot").hide()
    $(".col-md-10 col-xl-10 col-lg-sm-12 col-xs-12").hide()

    home_display()
    $("#nav-home").click(function(){
        $(".home").show()
        $(".scree-plot").hide()
        $(".col-md-10 col-xl-10 col-lg-10 col-sm-12 col-xs-12").hide()
        $(".biplot").hide()
    });

    $("#nav-screeplot").click(function(){
        $(".home").hide()
        $(".scree-plot").show()
        $(".col-md-10 col-xl-10 col-lg-10 col-sm-12 col-xs-12").hide()
        $(".biplot").hide()

        $.ajax({
            type: 'POST',
            url: "http://127.0.0.1:5000/screeplot",
            data: {},
            success: function(response){
                scree_plot(response)
            },
            error: function(error){
                console.log(error);
            }
        });
    });

    $("#nav-elbow").click(function(){
        $(".home").hide()
        $(".scree-plot").hide()
        $(".col-md-10 col-xl-10 col-lg-10 col-sm-12 col-xs-12").show()
        $(".biplot").hide()

        $.ajax({
            type: 'POST',
            url: "http://127.0.0.1:5000/elbow",
            data: {},
            dataType: 'json',
            success: function(response){
                console.log(response)
                draw_line_plot(response)
            },
            error: function(error){
                console.log("abbc");
                console.error(error);
            }
        });
    });

    $("#nav-biplot").click(function(){
        $(".home").hide()
        $(".scree-plot").hide()
        $(".biplot").show()
        $(".col-md-10 col-xl-10 col-lg-10 col-sm-12 col-xs-12").hide()

        $.ajax({
            type: 'POST',
            url: "http://127.0.0.1:5000/biplot",
            data: {},
            success: function(response){
                biplot(response)
            },
            error: function(error){
                console.error(error);
            }
        });

    });
});