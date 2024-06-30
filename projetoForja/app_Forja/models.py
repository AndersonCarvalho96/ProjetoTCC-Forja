from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model
from simple_history.models import HistoricalRecords


class UsuarioManager(BaseUserManager):
    def create_user(self, email, login, senha=None, **extra_fields):
        if not email:
            raise ValueError('O endereço de email deve ser definido')
        if not login:
            raise ValueError('O nome de usuário deve ser definido')

        email = self.normalize_email(email)
        user = self.model(email=email, login=login, **extra_fields)

        # Use make_password para salvar a senha criptografada no campo 'password'
        user.password = make_password(senha)

        user.save(using=self._db)
        return user

    def create_superuser(self, login, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superusuário deve ter is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superusuário deve ter is_superuser=True.')

        return self.create_user(login, email, password, **extra_fields)


class Usuario(AbstractBaseUser, PermissionsMixin):
    id_usuario = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100, blank=False)
    email = models.EmailField(max_length=100, unique=True, blank=False)
    login = models.CharField(max_length=50, unique=True, blank=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UsuarioManager()

    USERNAME_FIELD = 'login'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']
 # Configuração do histórico
    history = HistoricalRecords()

    def __str__(self):
        return self.login


class Ficha(models.Model):
    id = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=100)
    classe = models.CharField(max_length=100)
    nivel = models.IntegerField(default=0)
    antecedente = models.CharField(max_length=100, blank=True)
    jogador = models.CharField(max_length=100)
    raca = models.CharField(max_length=100)
    alinhamento = models.CharField(max_length=100, blank=True)
    experiencia = models.IntegerField(default=0)
    forca = models.IntegerField(default=0)
    destreza = models.IntegerField(default=0)
    constituicao = models.IntegerField(default=0)
    inteligencia = models.IntegerField(default=0)
    sabedoria = models.IntegerField(default=0)
    carisma = models.IntegerField(default=0)
    inspiracao = models.IntegerField(default=0)
    bonus_prof = models.IntegerField(default=0)
    salvaguardas = models.TextField(blank=True)
    pericias = models.TextField(blank=True)
    sabedoria_passiva = models.IntegerField(default=10)
    outras = models.TextField(blank=True)  # Outras Proficiencias e Idiomas
    ca = models.IntegerField(default=0)  # Classe de Armadura
    iniciativa = models.IntegerField(default=0)
    deslocamento = models.IntegerField(default=30)
    hp_max = models.IntegerField(default=0)
    hp = models.IntegerField(default=0)
    hp_temp = models.IntegerField(default=0)
    dado_vida = models.CharField(max_length=20, blank=True)
    # Salvaguardas contra morte
    # Campo para armazenar o número de sucessos
    sucessos = models.PositiveIntegerField(default=0, blank=True)
    # Campo para armazenar o número de falhas
    falhas = models.PositiveIntegerField(default=0, blank=True)
    ataques_magias = models.TextField(blank=True)
    historia = models.TextField(blank=True)
    equipamento = models.TextField(blank=True)
    tracos_personalidade = models.TextField(blank=True)
    ideais = models.TextField(blank=True)
    vinculos = models.TextField(blank=True)
    fraquezas = models.TextField(blank=True)
    caracteristicas_talentos = models.TextField(blank=True)
    idade = models.PositiveIntegerField(default=0, blank=True)
    altura = models.PositiveIntegerField(blank=True)
    peso = models.PositiveIntegerField(blank=True)
    olhos = models.CharField(max_length=20, blank=True)
    pele = models.CharField(max_length=20, blank=True)
    cabelo = models.CharField(max_length=20, blank=True)
    ali_org = models.TextField(blank=True)  # Alianças e Organizações
    caracteristicas_adc = models.TextField(
        blank=True)  # Características Adicionais
    tesouro = models.TextField(blank=True)
    classe_conjuradora = models.CharField(max_length=100, blank=True)
    atrib_conjura = models.CharField(max_length=100, blank=True)
    cd_miss = models.CharField(max_length=100, blank=True)
    modificador_am = models.CharField(max_length=100, blank=True)
    truques = models.TextField(blank=True)
    email = models.EmailField(blank=True)

    def save(self, *args, **kwargs):
        if not self.email and hasattr(self, 'request') and self.request.user.is_authenticated:
            self.email = self.request.user.email
        super().save(*args, **kwargs)
