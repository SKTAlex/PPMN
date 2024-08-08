from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('ticketByuser',views.TicketDetailByUser, basename='ticketbyuser')
router.register('ticketPurchase',views.PurchasedTickets, basename='ticketPurchase')
router.register('available',views.AllAvailableTickets, basename='available')
router.register('acceptTicket',views.AcceptTicket, basename='acceptTicket')
router.register('queue',views.TicketQueue, basename='queue')
router.register('buy',views.BuyTicket, basename='buy')
router.register('',views.TicketDetail, basename='')
urlpatterns=router.urls
