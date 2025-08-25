function difficulty_calculator() {
    $.getJSON('https://raw.githubusercontent.com/NoahBolohan/spirit-island-submitter/refs/heads/master/data/adversaries.json', function(adversaries) {
        $.getJSON('https://raw.githubusercontent.com/NoahBolohan/spirit-island-submitter/refs/heads/master/data/scenarios.json', function(scenarios) {

            var total_difficulty = 0;

            // Compute leading adversary difficulty
            if ($("#spirit_island_tracker_body").data("leading_adversary") == "") {
                var leading_adversary_difficulty = 0;
            }
            else {
                leading_adversary_difficulty = adversaries[
                    $("#spirit_island_tracker_body").data("leading_adversary")
                ]["difficulty"][
                    $("#spirit_island_tracker_body").data("leading_adversary_level")
                ];
            }

            total_difficulty += leading_adversary_difficulty;

            // Compute supporting adversary difficulty
            if ($("#spirit_island_tracker_body").data("supporting_adversary") == "") {
                var supporting_adversary_difficulty = 0;
            }
            else {
                supporting_adversary_difficulty = adversaries[
                    $("#spirit_island_tracker_body").data("supporting_adversary")
                ]["difficulty"][
                    $("#spirit_island_tracker_body").data("supporting_adversary_level")
                ];
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
    })
}