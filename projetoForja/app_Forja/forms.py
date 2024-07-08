from django import forms
from django.contrib.auth import get_user_model
from .models import Usuario
from django.utils.translation import gettext_lazy as _
from .models import Ficha
from django.contrib.auth.forms import PasswordChangeForm


class RegistroForm(forms.ModelForm):
    senha = forms.CharField(
        label="Senha",
        widget=forms.PasswordInput
    )

    class Meta:
        model = Usuario
        fields = ['nome', 'email', 'login', 'senha']


User = get_user_model()


class FichaForm(forms.ModelForm):
    class Meta:
        model = Ficha
        fields = '__all__'

class ChangePasswordForm(PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Personalize os campos do formulário, se necessário
        self.fields['old_password'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Senha atual'})
        self.fields['new_password1'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Nova senha'})
        self.fields['new_password2'].widget.attrs.update({'class': 'form-control', 'placeholder': 'Confirmação da nova senha'})