function difficulty_calculator() {
    $.getJSON('https://raw.githubusercontent.com/NoahBolohan/spirit-island-submitter/refs/heads/master/data/adversaries.json', function(adversaries) {
        $.getJSON('https://raw.githubusercontent.com/NoahBolohan/spirit-island-submitter/refs/heads/master/data/scenarios.json', function(scenarios) {

            var total_difficulty = 0;

            // Compute adversary 1 difficulty
            if ($("#spirit_island_tracker_body").data("leading_adversary") == "") {
                var adv_1_difficulty = 0;
            }
            else {
                if ($("#row_select_adversary_1_level").val() == null) {
                    var adv_1_difficulty = adversaries[$("#spirit_island_tracker_body").data("leading_adversary")]["difficulty"]["0"];
                }
                else {
                    var adv_1_difficulty = adversaries[$("#spirit_island_tracker_body").data("leading_adversary")]["difficulty"][$("#row_select_adversary_1_level").val()];
                }
            }

            total_difficulty += adv_1_difficulty;

            // Compute adversary 2 difficulty
            if ($("#spirit_island_tracker_body").data("supporting_adversary") == "") {
                var adv_2_difficulty = 0;
            }
            else {
                if ($("#row_select_adversary_2_level").val() == null) {
                    var adv_2_difficulty = adversaries[$("#spirit_island_tracker_body").data("supporting_adversary")]["difficulty"]["0"];
                }
                else {
                    var adv_2_difficulty = adversaries[$("#spirit_island_tracker_body").data("supporting_adversary")]["difficulty"][$("#row_select_adversary_2_level").val()];
                }
            }

            total_difficulty += adv_2_difficulty;

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
            $("#col_difficulty_number").text(
                total_difficulty
            )
        })
    })
}