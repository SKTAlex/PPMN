var exampleinputEmail1,exampleinputPassword1s
var backServer = 'http://127.0.0.1:8000'

$(document).ready(function () {

    exampleinputEmail1 = $("#exampleinputEmail1");
    exampleinputPassword1 = $("#exampleinputPassword1");

    $(document).on('click', '#loginButton', login);



})

function login() {
    var dataToSend = {email: exampleinputEmail1.val(), password: exampleinputPassword1.val()};
    console.log(dataToSend)
    $.ajax({
        method: "POST",
        url: backServer + "/users/login",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataToSend),
        success: function (data, status) {

            console.log('response',data)
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            // Aquí puedes agregar cualquier otra lógica para manejar el error
            alert('Error en la autenticación. Por favor, verifica tus credenciales.');
        }
    });
}
