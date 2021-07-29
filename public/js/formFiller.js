let fs = require('fs'),
PDFParser = require("pdf2json");

let pdfParser = new PDFParser(); // pdf parsing stuff

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
fs.writeFile("./AHCHFormFilled.fields.json", JSON.stringify(pdfParser.getAllFieldsTypes()), ()=>{console.log("Done.");});
});

pdfParser.loadPDF("./AHCHFormFilled.pdf");

($(document).on('click','#form-filler-button',function(e){
    e.preventDefault();

    let data = {}; // will get this from ajax request

    // services requested
    if (data["Child Abuse  Neglect Medica"] == "/On") { $("#childAbuseAndNeglectMedicalExam").prop('checked', true) }
    if (data["Child Abuse  Neglect"] == "/On") { $("#childAbuseAndNeglectPsychEval").prop('checked', true) }
    if (data["Medical Record Review"] == "/On") { $("medRecRev").prop('checked', true) }
    if (data["TherapyCounseling"] == "/On") { $("therapyCounseling").prop('checked', true) }
    if (data["Child Psychiatric Evaluation"] == "/On") { $("childPsychEval").prop('checked', true) }
    // person referred for services
    // input-eligible-health-insurance
    // allegations
    if (data["Physical Abuse"] == "/On") { $("input-abuse-physical").prop('checked', true) }
    if (data["Emotional Abuse"] == "/On") { $("input-abuse-emotional").prop('checked', true) }
    if (data["Sexual Abuse"] == "/On") { $("input-abuse-sexual").prop('checked', true) }
    if (data["Neglect Abuse"] == "/On") { $("input-abuse-neglect").prop('checked', true) }
    // findings
    if (data["Unfounded"] == "/On") { $("input-unfounded").prop('checked', true) }
    if (data["Pend"] == "/On") { $("input-pending").prop('checked', true) }
    if (data["Substant"] == "/On") { $("input-substantiated").prop('checked', true) }
    if (data["Established"] == "/On") { $("input-established").prop('checked', true) }
    if (data["Not Established"] == "/On") { $("input-not-established").prop('checked', true) }
    // alleged perp contact
    if (data["Last known contact Click or tap to enter a date"].includes("Yes")) { $("input-yes-perp").prop('checked', true) }
    else if (data["Last known contact Click or tap to enter a date"].includes("No")) { $("input-no-perp").prop('checked', true) }
    else if (data["Last known contact Click or tap to enter a date"].includes("Unknown")) { $("input-unknown-perp").prop('checked', true) }
    // inhome/outofhome
    if (data["InHome custody remains with legal guardians"].includes("On")) { $("input-home").prop('checked', true) }
    if (data["Out of Home CPP has care custody and supervis"].includes("On")) { $("input-out-of-home").prop('checked', true) }
    if (data["Kinship"].includes("On")) { $("input-out-of-home-kinship").prop('checked', true) }
    else if (data["Unrelated Resource"].includes("On")) { $("input-out-of-home-unrelated").prop('checked', true) }
    else if (data["Res"].includes("On")) { $("input-out-of-home-residential").prop('checked', true) }
    else if (data["Other_2"].includes("On")) { $("input-out-of-home-other").prop('checked', true) }
    if (data["Is CPP involved in litigation with this family"].includes("Yes")) { $("input-yes-litigation").prop('checked', true) }
    else if (data["Is CPP involved in litigation with this family"].includes("No")) { $("input-no-litigation").prop('checked', true) }
    // Have parental rights been terminated and DCP&P has legal guardianship?
    if (data["Yes mother"].includes("On")) { $("input-yes-mother").prop('checked', true) }
    else if (data["Yes father"].includes("On")) { $("input-yes-father").prop('checked', true) }
    else if (data["Yes both"].includes("On")) { $("input-yes-both").prop('checked', true) }
    else if (data["No_4"].includes("On")) { $("input-no-termination").prop('checked', true) }


}));