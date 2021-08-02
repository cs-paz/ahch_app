$("#button-send").click(sendFormData);

function sendFormData(){
    var formData = new FormData($("#form-demo").get(0));
    
    $.ajax({
        url : '/addcase/fillIntake/',
        type : "POST",
        data : formData,
        // both 'contentType' and 'processData' parameters are
        // required so that all data are correctly transferred
        contentType : false,
        processData : false
    }).done(function(response){
        // In this callback you get the AJAX response to check
        // if everything is right...
    }).fail(function(){
        // Here you should treat the http errors (e.g., 403, 404)
    }).always(function(){
        alert("AJAX request finished!");
    });
}

function onUpload(input) {  
    console.log(input)
    let originalFile = input.files[0];
    console.log('here')
    $.ajax({
        url: '/addcase/fillIntake/',
        type: 'POST',
        data: input,
        processData: false, 
        contentType: false,
    });
    
};