var backServer = 'http://127.0.0.1:8000'

$(document).ready(function () {
    getTickets();


    $(document).on('click', '.update-ticket-btn', function () {
        const ticketId = $(this).data('id'); // Obtener el ID del ticket desde el atributo data-id
        $.ajax({
            method: "GET",
            url: `http://127.0.0.1:8000/ticket/${ticketId}/`,
            success: function (ticket) {
                // Llenar el formulario con los datos del ticket
                $('#ticket_id').val(ticket.id);
                $('#Edittitle').val(ticket.title);
                $('#Editprice').val(ticket.price);
                $('#Editdate').val(ticket.date);
                $('#Edittime').val(ticket.time);
                $('#Editlocation').val(ticket.location);
                $('#Editquantity_available').val(ticket.quantity_available);
    
                // Mostrar el modal
                $('#updateTicketModal').modal('show');
            },
            error: function (xhr, status, error) {
                console.error('Error fetching ticket details:', error);
                alert('Error fetching ticket details.');
            }
        });
    });

    $('#saveChangesButton').on('click', function () {
        updateTicket(); 
    });

});

function getTickets() {
    $.ajax({
        method: "GET",
        url: backServer + "/ticket",
        contentType: 'application/json',
        dataType: 'json',
        success: function (data, status) {
            console.log('response', data);

            // Assuming 'data' is an array of tickets
            data.forEach(ticket => addTicketRow(ticket));
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Error al obtener los tickets.');
        }
    });
}

function addTicketRow(ticket) {
    const tableBody = document.querySelector('#ticketTable tbody');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${ticket.ticket_number}</td>
        <td>${ticket.title}</td>
        <td>${ticket.date}</td>
        <td>${ticket.time}</td>
        <td>${ticket.location}</td>
        <td>${ticket.quantity_available}</td>
        <td>${ticket.price}</td>
        <td><button class="btn btn-primary update-ticket-btn" data-id="${ticket.id}">Update</button></td>
        <td><span class="badge ${getStatusBadgeClass(ticket.ticket_status)}">${ticket.ticket_status}</span></td>
    `;

    tableBody.appendChild(row);
}

function getStatusBadgeClass(status) {
    switch(status) {
        case 'accepted':
            return 'bg-success';
        case 'pending':
            return 'bg-warning';
        case 'completed':
            return 'bg-danger';
        default:
            return '';
    }
}

function updateTicket() {
    const ticketId = $('#ticket_id').val(); // Obtener el ID del ticket
    const dataToSend = {
        title: $('#Edittitle').val(),
        price: $('#Editprice').val(),
        date: $('#Editdate').val(),
        time: $('#Edittime').val(),
        location: $('#Editlocation').val(),
        quantity_available: $('#Editquantity_available').val(),
    };

    console.log('Updating ticket:', dataToSend);

    $.ajax({
        method: "PUT",
        url: `http://127.0.0.1:8000/ticket/${ticketId}/`, // Incluir el ID del ticket en la URL
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataToSend),

        success: function (data, status) {
            console.log('Ticket updated successfully:', data);
            alert('Ticket updated successfully.');
            $('#updateTicketModal').modal('hide');

            // Recargar la página
            location.reload();

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Error updating ticket. Please try again.');
        }
    });
}