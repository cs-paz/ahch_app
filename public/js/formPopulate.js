(function($) { // not done and probably never going to get done but keeping it for now unless we add an api
    var populateFamily = $("#populateFamily")
    var populatePatient = $("#populatePatient")

    populateFamily.submit((e) => {
        console.log("here")

        var medicalRefNum = $("#medicalRefNum")
        var firstName = $("#firstName")
        var lastName = $("#lastName")
        var middleInitial = $("#middleInitial")
        var legalFamilyCustodian = $("#legalFamilyCustodian")
        var location_for_relationship = $("#location-for-relationship") // this is a hidden div at first
        var custodianRelationship = $("#custodianRelationship")

        e.preventDefault();
    });

})(window.jQuery);
