from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario
from simple_history.admin import SimpleHistoryAdmin

# Registro do modelo Usuario com rastreamento de histórico
class UsuarioAdmin(UserAdmin, SimpleHistoryAdmin):
    # Configurações personalizadas para administração de usuários
    list_display = ('id_usuario', 'nome', 'email', 'login', 'is_active', 'is_staff')
    search_fields = ('nome', 'email', 'login')
    ordering = ('nome',)

    fieldsets = (
        (None, {'fields': ('email', 'login', 'nome', 'is_active', 'is_staff')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'login', 'nome', 'senha1', 'senha2', 'is_active', 'is_staff'),
        }),
    )

# Registrar o modelo de usuário personalizado com sua classe de administração personalizada
admin.site.register(Usuario, UsuarioAdmin)


