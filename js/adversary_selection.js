$(document).ready(
    function() {

        $("#button_select_adversary").on(
            "click",
            function() {

                $("#input_adversary_select_search").val("");
                adversary_select_filter();
                $("#modal_adversaries").modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $("#button_close_modal_adversaries").on(
            "click",
            function() {
                $("#modal_adversaries").modal("hide");
            }
        );
    }
)

function generate_encoded_adversary_image_url(
    adversary_name
) {
    var adversary_image_file_name = adversary_name.split(
        ' '
    ).join(
        '_'
    );

    var new_url = encodeURI(
        "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/adversaries/" + adversary_image_file_name + ".png"
    );

    return new_url.replace(
        /'/g,  "%27"
    ).replace(
        /\(/g, "%28"
    ).replace(
        /\)/g, "%29"
    );
}

function generate_adversary_button_name(
    adversary_name
) {

    var adversary_image_file_name = adversary_name.split(
        ' '
    ).join(
        '_'
    );

    return adversary_image_file_name.replace(
        /'/g,  ''
    ).replace(
        /\(/g, ''
    ).replace(
        /\)/g, ''
    );
}

function generate_adversary_select_list_item_for_adversary(
    adversary_name,
) {

    var adversary_button_name = generate_adversary_button_name(
        adversary_name
    );

    var list_item = $("<li>").attr(
        {
            id: adversary_name,
            class: "adversary_select_list_item"
        }
    );

    var button = $("<button>").attr(
        {
            class : "btn btn-xs",
            id : `button_${
                adversary_button_name
            }`,
            "style" : "padding : 0px;"
        }
    )

    $("<img>").attr(
        {
            "src" : generate_encoded_adversary_image_url(
                adversary_name
            ),
            "style" : "width : 100%;"
        }
    ).appendTo(
        button
    );

    
    $("<div>").css(
        {
            "text-align" : "center",
            "height" : "2lh"
        }
    ).text(
        adversary_name
    ).appendTo(
        button
    );

    button.appendTo(
        list_item
    );

    list_item.appendTo(
        `#list_adversary_select_buttons`
    );

    $(`#button_${adversary_button_name}`).on(
        "click",
        function() {

            $(`#button_select_adversary`).empty();
        
            $("<img>").attr(
                {
                    "src" : generate_encoded_adversary_image_url(
                        adversary_name
                    ),
                    "style" : "width : 100%"
                }
            ).appendTo(
                `#button_select_adversary`
            );

            $(`#button_select_adversary`).css(
                {
                    "background-color": "transparent",
                    "border" : "none"
                }
            );

            $(`#modal_adversaries`).modal("hide");
        }
    );
}

$(document).ready(
    function() {
        $(`#list_adversary_select_buttons`).empty();

        $.ajax({
            url: "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/adversaries.json",
            async: false,
            dataType: "json",
            success: function (json) {
                $.each(
                    json,
                    function(key, value) {

                        generate_adversary_select_list_item_for_adversary(
                            key
                        );
                    }
                )
            }
        });
    }
)

// Pseudo-code: https://www.w3schools.com/howto/howto_js_filter_lists.asp
// Convert to jQuery: https://stackoverflow.com/questions/4511652/looping-through-list-items-with-jquery
function adversary_select_filter() {

    var input = $("#input_adversary_select_search").val().toUpperCase();
    var adversary_select_list_items = $("#list_adversary_select_buttons li");
  
    adversary_select_list_items.each(function(idx, li) {

        var adversary_select_item = $(li);

        if (adversary_select_item.attr("id").toUpperCase().indexOf(input) > -1) {

            adversary_select_item.css(
                "display",
                ""
            );
        } else {

            adversary_select_item.css(
                "display",
                "none"
            );
        }
    })
};

$(document).ready(
    function() {

        $("#button_clear_adversary_select_search").on(
            "click",
            function() {
                $("#input_adversary_select_search").val("");
                adversary_select_filter();
            }
        );
    }
)