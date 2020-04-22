from django.db import models

# -- estructura de la base de datos
class Producto(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(default="",max_length=50)
    stock = models.IntegerField(default=0)
    precio = models.FloatField(default=0)
    imagen = models.CharField(default="",max_length=50)

    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre

class Pedido(models.Model):

    nombre = models.CharField(max_length=50)
    compra = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
