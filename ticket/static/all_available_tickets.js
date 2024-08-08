var selectedTicketId =''
$(document).ready(function () {
    const tableBody = $('#ticketTable tbody');

    // Función para obtener los boletos disponibles
    function loadTickets() {
        $.ajax({
            method: "GET",
            url: "http://127.0.0.1:8000/ticket/available/",
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                // Limpiar la tabla antes de añadir nuevas filas
                tableBody.empty();

                // Añadir cada boleto a la tabla
                data.forEach(ticket => {
                    addTicketRow(ticket);
                });
            },
            error: function (xhr, status, error) {
                console.error('Error fetching tickets:', error);
                alert('Error fetching tickets. Please try again.');
            }
        });
    }

    // Función para añadir una fila a la tabla
    function addTicketRow(ticket) {
        const row = `
            <tr>
                <td>${ticket.ticket_number}</td>
                <td>${ticket.title}</td>
                <td>${ticket.date}</td>
                <td>${ticket.time}</td>
                <td>${ticket.location}</td>
                <td>${ticket.quantity_available}</td>
                <td>${ticket.price}</td>
                <td><button class="btn btn-primary purchase-btn" data-id="${ticket.id}">Buy</button></td>
            </tr>
        `;
        tableBody.append(row);
    }

    // Function to handle the purchase of a ticket
    function purchaseTicket() {
        const dataToSend = {
            quantity: $('#quantity').val(),
            card_name: $('#card_name').val(),
            card_number: $('#card_number').val(),
            card_expiry: $('#card_expiry').val(),
            card_cvv: $('#card_cvv').val(),
            assigned_to : idUser
        };

        $.ajax({
            method: "PUT",
            url: `http://127.0.0.1:8000/ticket/buy/${selectedTicketId}/`,
            contentType: 'application/json',
            data: JSON.stringify(dataToSend),
            success: function (data) {
                alert('Ticket purchased successfully!');
                $('#updateTicketModal').modal('hide');
                loadTickets(); // Reload the list of tickets after purchase
            },
            error: function (xhr, status, error) {
                console.error('Error purchasing ticket:', error);
                alert('Error purchasing ticket. Please try again.');
            }
        });
    }

    // Cargar los boletos al cargar la página
    loadTickets();

    tableBody.on('click', '.purchase-btn', function () {
        selectedTicketId = $(this).data('id');
        $('#paymentModal').modal('show');
    });

    // Handle the form submission in the modal

    $(document).on('click', '#buy', purchaseTicket);

});