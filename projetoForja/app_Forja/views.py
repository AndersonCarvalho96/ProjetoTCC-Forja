"""Importações de bibliotecas"""
import logging
from django.db import models
from django.shortcuts import render, redirect
from django.contrib.auth import login, get_user_model, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.translation import gettext_lazy as _
import speech_recognition as sr
from .forms import RegistroForm
from .forms import FichaForm
from django.contrib import messages
from .models import Ficha
from django.urls import reverse_lazy
from django.views.decorators.http import require_http_methods
<<<<<<< HEAD
import os
from django.conf import settings
from django.contrib.auth.forms import PasswordChangeForm
from .forms import ChangePasswordForm
from django.contrib.auth import update_session_auth_hash
=======
from django.shortcuts import get_object_or_404
>>>>>>> parent of c02dbeb7 (Conserto de bugs)


logger = logging.getLogger(__name__)

# views.py

# Função de visualização da página inicial.


def home(request):
    return render(request, 'home.html')

# Função de registro de usuário.


@csrf_exempt
def record_and_recognize(request):
    if request.method == 'POST':
        audio_data = request.FILES.get('audio')
        if not audio_data:
            return JsonResponse({'error': 'Nenhum dado de áudio encontrado'}, status=400)
        recognizer = sr.Recognizer()
        try:
            with sr.AudioFile(audio_data) as source:
                audio = recognizer.record(source)
            recognized_text = recognizer.recognize_google(
                audio, language='pt-BR')
            return JsonResponse({'text': recognized_text})
        except sr.UnknownValueError as e:
            return JsonResponse({'error': 'Desculpe, não entendi isso.'}, status=400)
        except sr.RequestError as e:
            return JsonResponse({'error': 'Desculpe, houve um erro ao processar sua requisição'}, status=500)
    else:
        return JsonResponse({'error': 'Método não permitido'}, status=405)


def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            senha = form.cleaned_data['senha']
            # Define a senha usando a função set_password do Django
            user.set_password(senha)
            user.save()
            login(request, user)
            return redirect('home')
    else:
        form = RegistroForm()
    return render(request, 'deslogado/registro.html', {'form': form})


User = get_user_model()

@login_required
def alterar_senha(request):
    if request.method == 'POST':
        form = ChangePasswordForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            # Atualiza a sessão do usuário para manter o login ativo
            update_session_auth_hash(request, user)
            messages.success(request, 'Sua senha foi alterada com sucesso.')
            return redirect('home')  # Redireciona para a página de perfil ou outra após a alteração de senha
    else:
        form = ChangePasswordForm(request.user)
    return render(request, 'logado/alterar_senha.html', {'form': form})

@login_required
def excluir_conta(request):
    if request.method == 'POST':
        user = request.user
        # Exclui todas as fichas associadas ao usuário
        Ficha.objects.filter(email=user.email).delete()
        # Exclui o usuário
        user.delete()
        messages.success(request, 'Conta excluída com sucesso.')
        return redirect('home')  # Redirecione para a página inicial ou página de login
    else:
        return render(request, 'logado/excluir_conta.html',{'username': request.user.nome})  # Renderize um template de confirmação, se desejar
    
@csrf_exempt
def biblioteca(request):
    pdf_dir = os.path.join(settings.STATICFILES_DIRS[0], 'pdfs')
    pdfs = []

    if os.path.exists(pdf_dir):
        for filename in os.listdir(pdf_dir):
            if filename.endswith('.pdf'):
                pdfs.append({
                    'name': filename,
                    'url': os.path.join(settings.STATIC_URL, 'pdfs', filename).replace('\\', '/')
                })

    return render(request, 'biblioteca.html', {'pdfs': pdfs})


User = get_user_model()


@login_required
def salvar_ficha(request):
    if request.method == 'POST':
        # Obtém o ID da ficha do formulário, se existir
        ficha_id = request.POST.get('ficha_id')
        if ficha_id:  # Se um ID de ficha foi fornecido, estamos editando uma ficha existente
            try:
                # Obtém a instância existente da ficha
                ficha = Ficha.objects.get(pk=ficha_id)
                # Passa a instância para o formulário
                form = FichaForm(request.POST, instance=ficha)
            except Ficha.DoesNotExist:
                return HttpResponse(status=404)
        else:
            # Se não, estamos criando uma nova ficha
            form = FichaForm(request.POST)

        if form.is_valid():
            ficha = form.save(commit=False)
            ficha.email = request.user.email  # Define o e-mail do usuário

            # Verifica se os campos sucessos e falhas estão vazios e define como 0 se necessário
            if ficha.sucessos is None:
                ficha.sucessos = 0
            if ficha.falhas is None:
                ficha.falhas = 0

            ficha.save()
            # Define uma mensagem de sucesso
            messages.success(request, 'Ficha salva com sucesso!')
            # Redireciona de volta para a página de ficha
            return redirect('ficha')
        else:
            # Define uma mensagem de erro caso o formulário seja inválido
            messages.error(
                request, 'Erro ao salvar a ficha. Por favor, corrija os erros abaixo.')
    else:
        # Se a requisição não for POST, cria um formulário vazio
        form = FichaForm()
    # Renderiza o template com o formulário
    return render(request, 'logado/ficha.html', {'form': form})


def ficha(request):
    # View para renderizar a página de ficha
    form = FichaForm()
    user = request.user
    fichas = Ficha.objects.filter(email=user.email)
    return render(request, 'logado/ficha.html', {'form': form, 'fichas': fichas})


def carregar_ficha(request, ficha_id):
    try:
        ficha = Ficha.objects.get(pk=ficha_id)
        data = {
            'id': ficha.id,
            'nome': ficha.nome,
            'classe': ficha.classe,
            'nivel': ficha.nivel,
            'antecedente': ficha.antecedente,
            'jogador': ficha.jogador,
            'raca': ficha.raca,
            'alinhamento': ficha.alinhamento,
            'experiencia': ficha.experiencia,
            'forca': ficha.forca,
            'destreza': ficha.destreza,
            'constituicao': ficha.constituicao,
            'inteligencia': ficha.inteligencia,
            'sabedoria': ficha.sabedoria,
            'carisma': ficha.carisma,
            'inspiracao': ficha.inspiracao,
            'bonus_prof': ficha.bonus_prof,
            'salvaguardas': ficha.salvaguardas,
            'pericias': ficha.pericias,
            'sabedoria_passiva': ficha.sabedoria_passiva,
            'outras': ficha.outras,
            'ca': ficha.ca,
            'iniciativa': ficha.iniciativa,
            'deslocamento': ficha.deslocamento,
            'hp_max': ficha.hp_max,
            'hp': ficha.hp,
            'hp_temp': ficha.hp_temp,
            'dado_vida': ficha.dado_vida,
            'sucessos': ficha.sucessos,
            'falhas': ficha.falhas,
            'ataques_magias': ficha.ataques_magias,
            'historia': ficha.historia,
            'equipamento': ficha.equipamento,
            'tracos_personalidade': ficha.tracos_personalidade,
            'ideais': ficha.ideais,
            'vinculos': ficha.vinculos,
            'fraquezas': ficha.fraquezas,
            'caracteristicas_talentos': ficha.caracteristicas_talentos,
            'idade': ficha.idade,
            'altura': ficha.altura,
            'peso': ficha.peso,
            'olhos': ficha.olhos,
            'pele': ficha.pele,
            'cabelo': ficha.cabelo,
            'ali_org': ficha.ali_org,
            'caracteristicas_adc': ficha.caracteristicas_adc,
            'tesouro': ficha.tesouro,
            'classe_conjuradora': ficha.classe_conjuradora,
            'atrib_conjura': ficha.atrib_conjura,
            'cd_miss': ficha.cd_miss,
            'modificador_am': ficha.modificador_am,
            'truques': ficha.truques,
        }
        return JsonResponse(data)
    except Ficha.DoesNotExist:
        return JsonResponse({'error': 'Ficha não encontrada'}, status=404)


@login_required
@require_http_methods(["GET", "DELETE"])
def excluir_ficha(request, ficha_id):
    if request.method == "GET":
        try:
            ficha = Ficha.objects.get(pk=ficha_id)
            ficha.delete()
            return JsonResponse({'message': 'Ficha excluída com sucesso'})
        except Ficha.DoesNotExist:
            return JsonResponse({'error': 'Ficha não encontrada'}, status=404)
    elif request.method == "DELETE":
        try:
            ficha = Ficha.objects.get(pk=ficha_id)
            ficha.delete()
            return JsonResponse({'message': 'Ficha excluída com sucesso'})
        except Ficha.DoesNotExist:
            return JsonResponse({'error': 'Ficha não encontrada'}, status=404)


def logout_view(request):
    logout(request)
    return redirect('/')
