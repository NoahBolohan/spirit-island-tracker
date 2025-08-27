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
                generate_default_supporting_adversary_select_button();
                $("#spirit_island_tracker_body").data(
                    "supporting_adversary",
                    ""
                );
                custom_hide(
                    "#section_supporting_adversary"
                );

                append_invader_rules_and_difficulty();

                $(`#button_select_leading_adversary`).removeClass(
                    "btn-outlineless"
                );

                $(`#button_select_leading_adversary`).addClass(
                    "btn-settings"
                );

                $(`#modal_leading_adversaries`).modal("hide");

                custom_hide(
                    "#button_invader_rules"
                );

                localStorage.removeItem(
                    "leading_adversary_button_name"
                );

                localStorage.removeItem(
                    "leading_adversary_level"
                );
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

                append_invader_rules_and_difficulty();

                $(`#button_select_supporting_adversary`).removeClass(
                    "btn-outlineless"
                );

                $(`#button_select_supporting_adversary`).addClass(
                    "btn-settings"
                );
                
                $(`#modal_supporting_adversaries`).modal("hide");

                localStorage.removeItem(
                    "supporting_adversary_button_name"
                );

                localStorage.removeItem(
                    "supporting_adversary_level"
                );
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
            class : "btn btn-outlineless",
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

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    $("<div>").attr(
        {
            class : `text-line ${dark_mode_flag}`
        }
    ).css(
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

            button_set_adversary_content(
                adversary_name,
                adversary_type
            );

            $(`#modal_${adversary_type}_adversary_level`).modal("show");
            $(`#modal_${adversary_type}_adversaries`).modal("hide");

            const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

            if (accepts_cookies) {
                localStorage.setItem(
                    `${adversary_type}_adversary_button_name`,
                    adversary_name
                );
            }
        }
    );
}

function button_set_adversary_content(
    adversary_name,
    adversary_type
) {

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

    $(`#button_select_${adversary_type}_adversary`).removeClass(
        "btn-settings"
    );

    $(`#button_select_${adversary_type}_adversary`).addClass(
        "btn-outlineless"
    );

    $(`#button_select_${adversary_type}_adversary`).css(
        {
            "height" : "",
            "aspect-ratio" : ""
        }
    );

    custom_show(
        "#button_invader_rules"
    );

    custom_show(
        "#section_supporting_adversary"
    );

    $("#spirit_island_tracker_body").data(
        `${adversary_type}_adversary`,
        adversary_name
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

                                append_invader_rules_and_difficulty();

                                const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

                                if (accepts_cookies) {
                                    localStorage.setItem(
                                        `${adversary_type}_adversary_level`,
                                        value
                                    );
                                }

                                $(`#modal_${adversary_type}_adversary_level`).modal("hide");
                            }
                        );
                    }
                )
            }
        )
    }
)

function append_invader_rules_and_difficulty() {
    $.getJSON('https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/adversaries.json', function(adversaries) {
        $.getJSON('https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/scenarios.json', function(scenarios) {

            var total_difficulty = 0;

            // Compute leading adversary difficulty
            if ($("#spirit_island_tracker_body").data("leading_adversary") == "") {
                var leading_adversary_difficulty = 0;
            }
            else {
                leading_adversary_difficulty = adversaries[
                    $("#spirit_island_tracker_body").data("leading_adversary")
                ]["level"][
                    $("#spirit_island_tracker_body").data("leading_adversary_level")
                ]["difficulty"];
            }

            total_difficulty += leading_adversary_difficulty;

            // Compute supporting adversary difficulty
            if ($("#spirit_island_tracker_body").data("supporting_adversary") == "") {
                var supporting_adversary_difficulty = 0;
            }
            else {
                supporting_adversary_difficulty = adversaries[
                    $("#spirit_island_tracker_body").data("supporting_adversary")
                ]["level"][
                    $("#spirit_island_tracker_body").data("supporting_adversary_level")
                ]["difficulty"];
            }

            total_difficulty += supporting_adversary_difficulty;

            // // Compute scenario difficulty
            // if ($("#col_select_scenario").val() == "Second Wave") {
            //     total_difficulty = `${total_difficulty + 1}/${total_difficulty - 1}`;
            // }
            // else {
            //     if ($("#col_select_scenario").val() == null) {
            //         var scenario_difficulty = 0;
            //     }
            //     else {
            //         var scenario_difficulty = scenarios[$("#col_select_scenario").val()]["difficulty"];
            //     }

            //     total_difficulty += scenario_difficulty;
            // }

            // Assign the difficulty value to the difficulty display div
            $("#button_invader_rules").text(
                "Difficulty: " + total_difficulty
            )
        })

        append_invader_rules_to_modal(
            adversaries[
                $("#spirit_island_tracker_body").data("leading_adversary")
            ],
            adversaries[
                $("#spirit_island_tracker_body").data("supporting_adversary")
            ],
            18
        );
    })
}

function append_invader_rules_to_modal(
    leading_adversary_config,
    supporting_adversary_config
) {

    $("#modal_invader_rules_body").empty();

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        var dark_mode_flag = "dark-mode";
    } else {
        var dark_mode_flag = "";
    }

    // Loss Condition

    var top_row = $("<div>").attr(
        {
            class:"row"
        }
    );

    var leading_loss_condition_div = $("<div>").attr(
        {
            class:"col-6"
        }
    );

    leading_loss_condition_div.append(
        $("<b>").attr(
            {
                class:`text-line ${dark_mode_flag}`
            }
        ).text("Additional Loss Condition")
    );

    if (leading_adversary_config["additional_loss_condition"]["title"] != "") {

        leading_loss_condition_div.append(
            $("<b>").html(
                spirit_text_keyword_converter(
                    leading_adversary_config["additional_loss_condition"]["title"],
                    18
                )
            )
        );

        leading_loss_condition_div.append(
            spirit_text_keyword_converter(
                leading_adversary_config["additional_loss_condition"]["effect"],
                18
            )
        );
    }
    else {
        leading_loss_condition_div.append(
            $("<p>").html(
                $("<i>").attr(
                    {
                        class:`text-line ${dark_mode_flag}`
                    }
                ).text("None")
            )
        )
    };
    
    // Stage 2 Escalation

    var leading_stage_2_escalation_div = $("<div>").attr(
        {
            class:"col-6"
        }
    );

    leading_stage_2_escalation_div.append(
        $("<b>").attr(
            {
                class:`text-line ${dark_mode_flag}`
            }
        ).text("Stage II Escalation")
    );

    leading_stage_2_escalation_div.append(
        $("<b>").html(
            spirit_text_keyword_converter(
                leading_adversary_config["stage_2_escalation"]["title"],
                18
            )
        )
    );

    leading_stage_2_escalation_div.append(
        spirit_text_keyword_converter(
            leading_adversary_config["stage_2_escalation"]["effect"],
            18
        )
    );

    // Rules

    var leading_rules_div = $("<div>").attr(
        {
            class:"row"
        }
    );

    var leading_rules_table  = $("<div>").attr(
        {
            class:`table ${dark_mode_flag} table-background`,
            style:"margin:0;padding:1vh;"
        }
    ).html(
        $("<thead>").attr(
            {
                style: "width: 100%;display: table;"
            }
        ).html(
            $("<tr>").append(
                $("<th>").attr(
                    {
                        scope:"col",
                        style:"width:15%",
                        class:`text-line ${dark_mode_flag} table-header`
                    }
                ).text("Level")
            ).append(
                $("<th>").attr(
                    {
                        scope:"col",
                        style:"width:25%",
                        class:`text-line ${dark_mode_flag} table-header`
                    }
                ).text("Fear")
            ).append(
                $("<th>").attr(
                    {
                        scope:"col",
                        class:`text-line ${dark_mode_flag} table-header`,
                        style:"display:flex;"
                    }
                ).append(
                    $("<div>").attr(
                        {
                            style:"align-self: flex-end;",
                            class:`text-line ${dark_mode_flag} table-header`
                        }
                    ).text("Game Effects")
                ).append(
                    $("<button>").attr(
                        {
                            id: `button_leading_adversary_toggle_all_rules`,
                            class:`p-1 btn btn-reset-page ${dark_mode_flag}`,
                             style:"margin-left: auto;"
                        }
                    ).text(
                        "Show all"
                    )
                )
            )
        )
    );

    var leading_rules_table_body = $("<tbody>").attr(
        {
            style: "width: 100%;display: table;"
        }
    );

    $.each(
        leading_adversary_config["level"],
        function (
            level,
            level_config
        ) {
            if (parseInt(level) > 0) {
                leading_rules_table_body.append(
                    $("<tr>").attr(
                        {
                            class:"table-body"
                        }
                    ).append(
                        $("<td>").attr(
                            {
                                style:"width:15%",
                                class:`text-line ${dark_mode_flag} table-body`
                            }
                        ).html(level)
                    ).append(
                        $("<td>").attr(
                            {
                                style:"width:25%",
                                class:`text-line ${dark_mode_flag} table-body`
                            }
                        ).html(
                            level_config["fear_cards"]
                        )
                    ).append(
                        $("<td>").attr(
                            {
                                style:"width:60%",
                                class:`text-line ${dark_mode_flag} table-body`
                            }
                        ).append(
                            $("<button>").attr(
                                {
                                    id: `button_leading_adversary_rule_${level}_toggle`,
                                    class:`w-100 btn btn-reset-page ${dark_mode_flag}`
                                }
                            ).html(
                                spirit_text_keyword_converter(
                                    level_config["game_effects"]["title"],
                                    18
                                )
                            )
                        )
                    )
                )

                leading_rules_table_body.append(
                    $("<tr>").attr(
                        {
                            id: `row_leading_adversary_rule_${level}`,
                            style:"visibility:collapse;"
                        }
                    ).append(
                        $("<td>").attr(
                            {
                                style:"width:100%",
                                class:`text-line ${dark_mode_flag} table-body`,
                                colspan:"3"
                            }
                        ).append(
                            $("<p>").attr(
                                {
                                    class:`${dark_mode_flag}`
                                }
                            ).html(
                                spirit_text_keyword_converter(
                                    level_config["game_effects"]["effect"],
                                    18
                                )
                            )
                        )
                    )
                )
            }
        }
    )

    leading_rules_table_body.appendTo(
        leading_rules_table
    );

    // Appending

    leading_loss_condition_div.appendTo(
        top_row
    );

    leading_stage_2_escalation_div.appendTo(
        top_row
    );

    top_row.appendTo(
        $("#modal_invader_rules_body")
    );

    leading_rules_table.appendTo(
        leading_rules_div
    );

    leading_rules_div.appendTo(
        $("#modal_invader_rules_body")
    )

    $.each(
        leading_adversary_config["level"],
        function(
            level
        ) {
            $(`#button_leading_adversary_rule_${level}_toggle`).on(
                "click",
                function () {
                    if (
                        $(`#row_leading_adversary_rule_${level}`).css("visibility") == "collapse"
                    ) {
                        $(`#row_leading_adversary_rule_${level}`).css(
                            "visibility",
                            "visible"
                        );
                    } else {
                        $(`#row_leading_adversary_rule_${level}`).css(
                            "visibility",
                            "collapse"
                        );
                    }
                    
                }
            )
        }
    )

    $(`#button_leading_adversary_toggle_all_rules`).on(
        "click",
        function () {
            if (
                $(`#button_leading_adversary_toggle_all_rules`).text() == "Show all"
            ) {
                $.each(
                    leading_adversary_config["level"],
                    function(
                        level
                    ) {
                        $(`#row_leading_adversary_rule_${level}`).css(
                            "visibility",
                            "visible"
                        );
                    }
                )
                
                $(`#button_leading_adversary_toggle_all_rules`).text("Hide all");
            }
            else {
                $.each(
                    leading_adversary_config["level"],
                    function(
                        level
                    ) {
                        $(`#row_leading_adversary_rule_${level}`).css(
                            "visibility",
                            "collapse"
                        );
                    }
                )

                $(`#button_leading_adversary_toggle_all_rules`).text("Show all");
            }
        }
    )
}


function generate_default_leading_adversary_select_button() {

    $(`#button_select_leading_adversary`).empty();

    if (
        $("body").data(
            "colour_scheme"
        ) == "dark"
    ) {
        $(`#button_select_leading_adversary`).addClass(
            "dark-mode"
        );
    } else {
        $(`#button_select_leading_adversary`).removeClass(
            "dark-mode"
        );
    }

    $(`#button_select_leading_adversary`).css(
        {
            "background-color": "",
            "border" : ""
        }
    );

    $(`#button_select_leading_adversary`).text(
        "Select adversary"
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

                        const leading_adversary_button_name = localStorage.getItem("leading_adversary_button_name") ? localStorage.getItem("leading_adversary_button_name") : null;

                        const leading_adversary_level = localStorage.getItem("leading_adversary_level") ? localStorage.getItem("leading_adversary_level") : null;

                        if (leading_adversary_button_name) {
                            button_set_adversary_content(
                                leading_adversary_button_name,
                                "leading"
                            )

                            $(
                                `#col_button_leading_adversary_level_${leading_adversary_level}`
                            ).trigger("click");
                        }

                        const supporting_adversary_button_name = localStorage.getItem("supporting_adversary_button_name") ? localStorage.getItem("supporting_adversary_button_name") : null;

                        const supporting_adversary_level = localStorage.getItem("supporting_adversary_level") ? localStorage.getItem("supporting_adversary_level") : null;

                        if (supporting_adversary_button_name) {
                            button_set_adversary_content(
                                supporting_adversary_button_name,
                                "supporting"
                            )

                            $(
                                `#col_button_supporting_adversary_level_${supporting_adversary_level}`
                            ).trigger("click");
                        }
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