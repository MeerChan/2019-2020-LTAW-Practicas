# -- Fichero mi_tienda/admin.py
from django.contrib import admin
from mi_tienda.models import Producto,Pedido

admin.site.register(Producto)
admin.site.register(Pedido)
