from django.contrib import admin
from django.urls import path, include
from app_Forja import views
from django.contrib.auth import views as v
from django.urls import path
from django.contrib.auth.decorators import login_required
from app_Forja.views import excluir_ficha, excluir_conta

# Nome da aplicação para organizar as URLs.
app_name = 'app_Forja'

# Lista de URLs do aplicativo.
urlpatterns = [
    path('admin/', admin.site.urls),  # Rota para a administração do Django.

    # Rota para a página inicial, usando a função 'home' da sua view.
    path('', views.home, name='home'),

    # Rota para o registro de usuário, usando a função 'registro' da view.
    path('registro/', views.registro, name='registro'),

    # Definindo a rota para excluir conta
    path('excluir-conta/', login_required(views.excluir_conta), name='excluir_conta'),

    # Inclui URLs de autenticação do Django, como login e senha esquecida.
    path('accounts/', include('django.contrib.auth.urls')),

    # Definindo a rota para alterar senha
    path('alterar-senha/', views.alterar_senha, name='alterar_senha'),
    
    # Rota para o logout, usando a view padrão 'LogoutView' do Django.
    path('logout/', views.logout_view, name='logout'),

    # Rota para a página da ficha do usuário, requer autenticação, usando a função 'ficha' da view.
    path('ficha/', login_required(views.ficha), name='ficha'),
    
    # Definindo a rota para carregar a ficha
    path('ficha/<int:ficha_id>/', views.carregar_ficha, name='carregar_ficha'),

    path('ficha/excluir/<int:ficha_id>/', excluir_ficha, name='excluir_ficha'),

    # Definindo a rota para salvar a ficha
    path('salvar-ficha/', views.salvar_ficha, name='salvar_ficha'),

    # Rota para a página das bibliotecas
    path('biblioteca/', views.biblioteca, name='biblioteca'),

    path('record-and-recognize/', views.record_and_recognize,
         name='record_and_recognize'),

    path('password_reset/', v.PasswordResetView.as_view(
        template_name='password_reset_form.html'), name='password_reset'),

    path('password_reset/done/', v.PasswordResetDoneView.as_view(template_name='password_reset_done.html'),
         name='password_reset_done'),

    path('reset/<uidb64>/<token>/', v.PasswordResetConfirmView.as_view(template_name='password_reset_confirm.html'),
         name='password_reset_confirm'),

    path('reset/done/', v.PasswordResetCompleteView.as_view(template_name='password_reset_complete.html'),
         name='password_reset_complete'),

]
