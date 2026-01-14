// Generate element tracker counters
$(document).ready(
    function () {

        $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

            $("#spirit_island_tracker_body").data(
                "elements", data["elements"]
            )

            $.each(
                data["elements"],
                function (key, element) {

                    if (element != "any") {

                        const toggle_element = localStorage.getItem(`toggle_${element}`) ? localStorage.getItem(`toggle_${element}`) : null;

                        if (toggle_element == "hide") {
                            var display_var = "none";
                        }
                        else {
                            var display_var = "block";
                        }

                        var col_for_element = $("<div>").attr(
                            {
                                class: "col p-0",
                                id: `col_${element}_element_counter`,
                                style:`display:${display_var};`
                            }
                        ).data(
                            "locked_count", 0
                        );

                        // var row_for_plus_button = $("<div>").attr(
                        //     {
                        //         class: "row p-0 justify-content-center margin_auto"
                        //     }
                        // );

                        var row_for_element_img = $("<div>").attr(
                            {
                                class: "row justify-content-center",
                                style: "position: relative;"
                            }
                        );

                        // var row_for_minus_button = $("<div>").attr(
                        //     {
                        //         class: "row p-0 justify-content-center margin_auto"
                        //     }
                        // );

                        // $("<button>").attr(
                        //     {
                        //         class: "col mb-1 btn astext btn-outlineless",
                        //         id: `button_${element}_plus`,
                        //         type: "button",
                        //         style: "width:100%;display: flex;justify-content: center;"
                        //     }
                        // ).html(
                        //     '<div class="plus"></div></div>'
                        // ).appendTo(
                        //     row_for_plus_button
                        // );

                        // $("<img>").attr(
                        //     {
                        //         class: "col-1 element_img",
                        //         src: `https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/elements/${element}.png`,
                        //         id: `element_${element}`
                        //     }
                        // ).data(
                        //     "counter", 0
                        // ).appendTo(
                        //     row_for_element_img
                        // );

                        var element_button = $("<button>").attr(
                            {
                                class: "col btn astext btn-outlineless",
                                id: `button_${element}_plus`,
                                type: "button",
                                style: "width:100%;display: flex;justify-content: center;"
                            }
                        ).html(
                            $("<img>").attr(
                                {
                                    class: "col-1 element_img",
                                    src: `https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/static/elements/${element}.png`,
                                    id: `element_${element}`,
                                    style: "width:60%;height:auto;"
                                }
                            ).data(
                                "counter", 0
                            )
                        ).appendTo(
                            row_for_element_img
                        );

                        $("<div>").attr(
                            {
                                class: "element_img_text_overlay",
                                id: `element_${element}_overlay_text`
                            }
                        ).appendTo(
                            element_button
                        );

                        // $("<button>").attr(
                        //     {
                        //         class: "col btn astext btn-outlineless",
                        //         id: `button_${element}_minus`,
                        //         type: "button",
                        //         style: "width:100%; display:flex; justify-content:center;"
                        //     }
                        // ).html(
                        //     '<div class="minus"</div>'
                        // ).appendTo(
                        //     row_for_minus_button
                        // );

                        // row_for_plus_button.appendTo(
                        //     col_for_element
                        // );

                        row_for_element_img.appendTo(
                            col_for_element
                        );

                        // row_for_minus_button.appendTo(
                        //     col_for_element
                        // );

                        if (
                            [
                                "sun",
                                "moon",
                                "fire",
                                "air"
                            ].indexOf(element) >= 0
                        ) {
                            col_for_element.appendTo(
                                $("#row_counters_element_tracker_sun_to_air")
                            );
                        } else {
                            col_for_element.appendTo(
                                $("#row_counters_element_tracker_water_to_animal")
                            );
                        }

                        

                    }
                }
            )
        });
    }
)

// Set an event listener for increasing the element data counters by 1 when the plus button is pressed
$(document).ready(
    function () {
        $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

            $.each(
                data["elements"],
                function (key, element) {

                    $(`#button_${element}_plus`).on(
                        "click",
                        function () {

                            // Increase the data counter by 1
                            $(`#element_${element}`).data(
                                "counter",
                                $(`#element_${element}`).data(
                                    "counter"
                                ) + 1
                            );

                            // Display counter value is the value is 2 or greater
                            if ($(`#element_${element}`).data("counter") >= 2) {
                                $(`#element_${element}_overlay_text`).text(
                                    $(`#element_${element}`).data("counter")
                                )
                            } else {
                                $(`#element_${element}_overlay_text`).empty()
                            }


                            // If element counter is greater than zero, remove image opacity
                            if ($(`#element_${element}`).data("counter") > 0) {

                                $(`#element_${element}`).css(
                                    "opacity",
                                    1
                                )
                            }

                            check_tier_availabilities();

                            const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

                            if (accepts_cookies) {
                                localStorage.setItem(
                                    `${element}_value`,
                                    $(`#element_${element}`).data("counter")
                                );
                            }
                        }
                    );
                }
            );
        });
    }
);

// Set an event listener for decreasing the element data counters by 1 when the minus button is pressed
$(document).ready(
    function () {
        $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

            $.each(
                data["elements"],
                function (key, element) {

                    $(`#button_${element}_minus`).on(
                        "click",
                        function () {

                            // Increase the data counter by 1
                            $(`#element_${element}`).data(
                                "counter",
                                Math.max(
                                    0,
                                    $(`#element_${element}`).data(
                                        "counter"
                                    ) - 1
                                )
                            );

                            // Display counter value is the value is 2 or greater
                            if ($(`#element_${element}`).data("counter") >= 2) {
                                $(`#element_${element}_overlay_text`).text(
                                    $(`#element_${element}`).data("counter")
                                )
                            } else {
                                $(`#element_${element}_overlay_text`).empty()
                            }

                            // If element counter is zero, restore image opacity
                            if ($(`#element_${element}`).data("counter") == 0) {

                                $(`#element_${element}`).css(
                                    "opacity",
                                    0.3
                                )
                            }

                            check_tier_availabilities();

                            const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

                            if (accepts_cookies) {
                                localStorage.setItem(
                                    `${element}_value`,
                                    $(`#element_${element}`).data("counter")
                                );
                            }
                        }
                    );
                }
            );
        });
    }
);

// Set an event listener for resetting the element data counters when the reset button is pressed
$(document).ready(
    function () {
        $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

            $.each(
                data["elements"],
                function (key, element) {

                    $("#button_reset_element_tracker").on(
                        "click",
                        function () {
                            reset_element_tracker(
                                element
                            );
                        }
                    );
                }
            );
        });
    }
);

function reset_element_tracker(
    element
) {

    localStorage.removeItem(
        `${element}_value`
    );
    
    // Reset each element counter to its locked value
    $(`#element_${element}`).data(
        "counter",
        $(`#col_${element}_element_counter`).data("locked_count")
    );

    // Display counter value is the value is 2 or greater
    if ($(`#element_${element}`).data("counter") >= 2) {
        $(`#element_${element}_overlay_text`).text(
            $(`#element_${element}`).data("counter")
        )
    } else {
        $(`#element_${element}_overlay_text`).empty()
    }

    // If element counter is zero, restore image opacity
    if ($(`#element_${element}`).data("counter") == 0) {

        $(`#element_${element}`).css(
            "opacity",
            0.3
        )
    }
    else {

        $(`#element_${element}`).css(
            "opacity",
            1
        )
    }

    check_tier_availabilities();

    const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

    if (accepts_cookies) {
        localStorage.setItem(
            `${element}_value`,
            $(`#element_${element}`).data("counter")
        );
    }
}

function set_element_tracker(
    element,
    value
) {

    // Reset each element counter to its locked value
    $(`#element_${element}`).data(
        "counter",
        value
    );

    // Display counter value is the value is 2 or greater
    if ($(`#element_${element}`).data("counter") >= 2) {
        $(`#element_${element}_overlay_text`).text(
            $(`#element_${element}`).data("counter")
        )
    } else {
        $(`#element_${element}_overlay_text`).empty()
    }

    // If element counter is zero, restore image opacity
    if ($(`#element_${element}`).data("counter") == 0) {

        $(`#element_${element}`).css(
            "opacity",
            0.3
        )
    }
    else {

        $(`#element_${element}`).css(
            "opacity",
            1
        )
    }

    check_tier_availabilities();
}

$(document).ready(
    function () {

        $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

            $.each(
                data["elements"],
                function (key, element) {

                    const element_value = localStorage.getItem(`${element}_value`) ? localStorage.getItem(`${element}_value`) : null;

                    if (element_value) {
                        set_element_tracker(
                            element,
                            parseInt(element_value)
                        );
                    }
                }
            );
        });

        const lock_element_tracker_cookie = localStorage.getItem("lock_element_tracker") ? localStorage.getItem("lock_element_tracker") : null;

        if (lock_element_tracker_cookie) {
            lock_element_tracker();
        }
    }
)

// Set an event listener for locking the elemental counters when the toggle lock button is pressed
$(document).ready(
    function () {
        $("#button_toggle_lock_element_tracker").on(
            "click",
            function () {

                if (
                    $("#button_toggle_lock_element_tracker").data("lock_status") == "locked"
                ) {

                    unlock_element_tracker();
                }
                else {
                    lock_element_tracker();
                }
            }
        );
    }
);

function unlock_element_tracker() {
    $("#button_toggle_lock_element_tracker").text(
        "Lock"
    );

    $("#button_toggle_lock_element_tracker").addClass("btn-lock-elements").removeClass("btn-reset-page");

    $("#button_toggle_lock_element_tracker").data("lock_status", "unlocked");

    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

        $.each(
            data["elements"],
            function (key, element) {

                $(`#col_${element}_element_counter`).data("locked_count", 0);

                localStorage.removeItem(
                    `${element}_locked_value`
                );
            }
        );
    });

    localStorage.removeItem(
        "lock_element_tracker"
    );
}

function lock_element_tracker() {
    $("#button_toggle_lock_element_tracker").text(
        "Unlock"
    );

    $("#button_toggle_lock_element_tracker").addClass("btn-reset-page").removeClass("btn-lock-elements");

    $("#button_toggle_lock_element_tracker").data("lock_status", "locked");

    $.getJSON("https://raw.githubusercontent.com/NoahBolohan/spirit-island-tracker/refs/heads/main/data/config.json", function (data) {

        $.each(
            data["elements"],
            function (key, element) {

                $(`#col_${element}_element_counter`).data(
                    "locked_count",
                    $(`#element_${element}`).data("counter")
                );

                const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

                if (accepts_cookies) {
                    localStorage.setItem(
                        `${element}_locked_value`,
                        $(`#element_${element}`).data("counter")
                    );
                }
            }
        );
    });

    const accepts_cookies = localStorage.getItem("accepts_cookies") ? localStorage.getItem("accepts_cookies") : null;

    if (accepts_cookies) {
        localStorage.setItem(
            "lock_element_tracker",
            true
        );
    }
}