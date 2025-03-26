$(document).ready(
    function() {

        $(`#button_select_leading_adversary`).on(
            "click",
            function() {

                $(`#input_leading_adversary_select_search`).val("");
                adversary_select_filter("leading");
                $(`#modal_leading_adversaries`).modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $(`#button_select_supporting_adversary`).on(
            "click",
            function() {

                $(`#input_supporting_adversary_select_search`).val("");
                adversary_select_filter("supporting");
                $(`#modal_supporting_adversaries`).modal("show");
            }
        );
    }
)

$(document).ready(
    function() {

        $(`#button_remove_leading_adversary`).on(
            "click",
            function() {

                $(`#input_leading_adversary_select_search`).val("");
                adversary_select_filter("leading");
                generate_default_leading_adversary_select_button();
                $("#spirit_island_tracker_body").data(
                    "leading_adversary",
                    ""
                );
                generate_default_supporting_adversary_select_button()
                $("#spirit_island_tracker_body").data(
                    "supporting_adversary",
                    ""
                );
                custom_hide(
                    "#section_supporting_adversary"
                );

                difficulty_calculator();

                $(`#modal_leading_adversaries`).modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $(`#button_remove_supporting_adversary`).on(
            "click",
            function() {

                $(`#input_supporting_adversary_select_search`).val("");
                adversary_select_filter("supporting");
                generate_default_supporting_adversary_select_button();
                $("#spirit_island_tracker_body").data(
                    "supporting_adversary",
                    ""
                );

                difficulty_calculator();
                
                $(`#modal_supporting_adversaries`).modal("hide");
            }
        );
    }
)

$(document).ready(
    function() {

        $.each(
            [
                "leading",
                "supporting"
            ],
            function (idx, adversary_type) {

                $(`#button_close_modal_${adversary_type}_adversaries`).on(
                    "click",
                    function() {
                        $(`#modal_${adversary_type}_adversaries`).modal("hide");
                    }
                );

                $(`#button_close_modal_${adversary_type}_adversary_level`).on(
                    "click",
                    function() {
                        $(`#modal_${adversary_type}_adversaries`).modal("show");
                        $(`#modal_${adversary_type}_adversary_level`).modal("hide");
                    }
                );
            }
        )
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
    adversary_type
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
                adversary_type
            }_${
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
            "font-size" : "0.7em",
            "height" : "4lh",
            "padding-top" : "5px"
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
        `#list_${adversary_type}_adversary_select_buttons`
    );

    $(
        `#button_${
            adversary_type
        }_${
            adversary_button_name
        }`
    ).on(
        "click",
        function() {

            $(`#button_select_${adversary_type}_adversary`).empty();
        
            $("<img>").attr(
                {
                    "src" : generate_encoded_adversary_image_url(
                        adversary_name
                    ),
                    "style" : "width : 100%",
                }
            ).appendTo(
                `#button_select_${adversary_type}_adversary`
            );

            $(`#button_select_${adversary_type}_adversary`).css(
                {
                    "background-color": "transparent",
                    "border" : "none",
                    "height" : "",
                    "aspect-ratio" : ""
                }
            );

            custom_show(
                "#section_supporting_adversary"
            );

            $("#spirit_island_tracker_body").data(
                `${adversary_type}_adversary`,
                adversary_name
            );

            $(`#modal_${adversary_type}_adversary_level`).modal("show");
            $(`#modal_${adversary_type}_adversaries`).modal("hide");

            
        }
    );
}

$(document).ready(
    function() {

        $.each(
            [
                "leading",
                "supporting"
            ],
            function (idx, adversary_type) {

                $.each(
                    Array.from({length: 7}, (x, i) => i),
                    function(key,value) {
                        $(`#col_button_${adversary_type}_adversary_level_${value}`).on(
                            "click",
                            function() {
                                $("#spirit_island_tracker_body").data(
                                    `${adversary_type}_adversary_level`,
                                    value
                                );

                                difficulty_calculator();

                                $(`#modal_${adversary_type}_adversary_level`).modal("hide");
                            }
                        );
                    }
                )
            }
        )
    }
)

function generate_default_leading_adversary_select_button() {

    $(`#button_select_leading_adversary`).empty();

    $(`#button_select_leading_adversary`).css(
        {
            "background-color": "",
            "border" : ""
        }
    );

    $(`#button_select_leading_adversary`).html(
        "&#x2795;"
    );

    $("#spirit_island_tracker_body").data(
        "leading_adversary_level",
        0
    );
}

function generate_default_supporting_adversary_select_button()  {

    $(`#button_select_supporting_adversary`).empty();

    $(`#button_select_supporting_adversary`).css(
        {
            "background-color": "",
            "border" : "",
            "height" : "40%",
            "aspect-ratio" : "1/1"
        }
    );

    $(`#button_select_supporting_adversary`).html(
        "&#x2795;"
    );

    $("#spirit_island_tracker_body").data(
        "leading_supporting_difficulty",
        0
    );
}

$(document).ready(
    function() {

        $.ajax({
            url: "https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/adversaries.json",
            async: false,
            dataType: "json",
            success: function (json) {

                $.each(
                    [
                        "leading",
                        "supporting"
                    ],
                    function (idx, adversary_type) {
        
                        $(`#list_${adversary_type}_adversary_select_buttons`).empty();

                        $.each(
                            json,
                            function(adversary_name, value) {
        
                                generate_adversary_select_list_item_for_adversary(
                                    adversary_name,
                                    adversary_type
                                );
                            }
                        )
                    }
                )
            }
        });
    }
)

// Pseudo-code: https://www.w3schools.com/howto/howto_js_filter_lists.asp
// Convert to jQuery: https://stackoverflow.com/questions/4511652/looping-through-list-items-with-jquery
function adversary_select_filter(
    adversary_type
) {

    var input = $(`#input_${adversary_type}_adversary_select_search`).val().toUpperCase();
    var adversary_select_list_items = $(`#list_${adversary_type}_adversary_select_buttons li`);
  
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

        $.each(
            [
                "leading",
                "supporting"
            ],
            function (idx, adversary_type) {

                $(`#button_clear_${adversary_type}_adversary_select_search`).on(
                    "click",
                    function() {
                        $(`#input_${adversary_type}_adversary_select_search`).val("");
                        adversary_select_filter(adversary_type);
                    }
                );
            }
        )
    }
)