var backServer = 'http://127.0.0.1:8000'

$(document).ready(function () {
    getTickets();

});


function getTickets() {
    $.ajax({
        method: "GET",
        url: backServer + "/ticket/queue/",
        contentType: 'application/json',
        dataType: 'json',
        success: function (data, status) {
            console.log('response', data);

            // Assuming 'data' is an array of tickets
            data.forEach(ticket => addTicketToQueue(ticket));
        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Error al obtener los tickets.');
        }
    });
}

function acceptTicket(ticket_number) {
    dataToSend = {
        assigned_to : idUser,
    }

    $.ajax({
        method: "PUT",
        url: backServer + "/ticket/acceptTicket/"+ ticket_number +'/',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(dataToSend),
        success: function (data, status) {
            alert("Aceptado")

        },
        error: function (xhr, status, error) {
            console.error('Error:', error);
            console.error('Status:', status);
            console.error('Response:', xhr.responseText);
            alert('Error al obtener los tickets.');
        }
    });
}



function addTicketToQueue(ticket) {
    const tableBody = document.querySelector('#ticketQueueTable tbody');

    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${ticket.ticket_number}</td>
        <td>${ticket.title}</td>
        <td>${ticket.created_by}</td>
        <td><span class="badge ${getStatusBadgeClass(ticket.ticket_status)}">${ticket.ticket_status}</span></td>
        <td><button class="btn btn-sm btn-primary accept-btn">Accept</button></td>
    `;

    row.querySelector('.accept-btn').addEventListener('click', function() {
        acceptTicket(ticket.ticket_number);
    });


    tableBody.appendChild(row);
}

function getStatusBadgeClass(status) {
    switch (status) {
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