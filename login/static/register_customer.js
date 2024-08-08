var exampleinputEmail1,exampleinputPassword1s,exampleinputUsername1,exampleinputPassword2
var backServer = 'http://127.0.0.1:8000'

$(document).ready(function () {

    exampleinputEmail1 = $("#exampleinputEmail1");
    exampleinputUsername1 = $("#exampleinputUsername1");
    exampleinputPassword1 = $("#exampleinputPassword1");
    exampleinputPassword2 = $("#exampleinputPassword2");

    $(document).on('click', '#submit', register_customer);



})

function register_customer() {
    var dataToSend = {email: exampleinputEmail1.val(),username : exampleinputUsername1.val() ,password1: exampleinputPassword1.val(), password2: exampleinputPassword2.val()};
    console.log(dataToSend)
    $.ajax({
        method: "POST",
        url: backServer + "/users/register",
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataToSend),
        success: function (data, status) {

            console.log('response',data)
            alert('registro exitoso')
            window.location.href = '/login';

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            // Aquí puedes agregar cualquier otra lógica para manejar el error
            alert('Error al registrar. Por favor, verifica tus credenciales.');
        }
    });
}