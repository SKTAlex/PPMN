$(document).ready(function () {

    $(document).on('click', '#ticketForm', createTicket);


});

function createTicket() {
    const dataToSend = {
        title: $('#title').val(),
        price: $('#price').val(),
        date: $('#date').val(),
        time: $('#time').val(),
        location: $('#location').val(),
        quantity_available: $('#quantity_available').val(),
        ticket_status : 'pending',
        created_by : idUser
    };
    console.log(dataToSend)
    $.ajax({
        method: "POST",
        url: "http://127.0.0.1:8000/ticket/",  // Reemplaza con la URL adecuada para tu backend
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataToSend),

        success: function (data, status) {
            console.log('Ticket creado con éxito:', data);
            alert('Ticket creado con éxito.');
            // Aquí puedes agregar lógica adicional, como redireccionar o limpiar el formulario
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Error al crear el ticket. Por favor, intenta nuevamente.');
        }
    });
}


