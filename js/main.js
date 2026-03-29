"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');
    const campoSenha = document.getElementById('passwordOutput');
    const seletorTamanho = document.getElementById('passLength');

    let isReadyToCopy = false;

    function gerarSenha(tamanho) {
        const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*()_-+=";
        let resultado = "";
        const valores = new Uint32Array(tamanho);
        window.crypto.getRandomValues(valores);
        for (let i = 0; i < tamanho; i++) {
            resultado += charset[valores[i] % charset.length];
        }
        return resultado;
    }

    if (mainBtn) {
        mainBtn.addEventListener('click', () => {
            if (!isReadyToCopy) {
                // ETAPA 1: GERAR
                const tamanho = parseInt(seletorTamanho.value);
                campoSenha.textContent = gerarSenha(tamanho);
                
                // Muda para modo copiar
                isReadyToCopy = true;
                mainBtn.classList.add('is-copy-mode');
                mainBtn.textContent = "COPIAR SENHA 🛡️";
            } else {
                // ETAPA 2: COPIAR
                const senha = campoSenha.textContent;
                navigator.clipboard.writeText(senha).then(() => {
                    mainBtn.textContent = "COPIADO!";
                    
                    // Reseta após 2 segundos
                    setTimeout(() => {
                        isReadyToCopy = false;
                        mainBtn.classList.remove('is-copy-mode');
                        mainBtn.textContent = "GERAR SENHA";
                    }, 2000);
                });
            }
        });
    }
});