"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const mainBtn = document.getElementById('mainBtn');
    const campoSenha = document.getElementById('passwordOutput');
    const seletorTamanho = document.getElementById('passLength');

    let isReadyToCopy = false;

    function gerarSenha(tamanho) {
        const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*()_-+=";
        let resultado = "";
        const valoresAleatorios = new Uint32Array(tamanho);
        window.crypto.getRandomValues(valoresAleatorios);
        for (let i = 0; i < tamanho; i++) {
            resultado += charset[valoresAleatorios[i] % charset.length];
        }
        return resultado;
    }

    async function copiarTexto(texto) {
        // Tenta o método moderno
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(texto);
                return true;
            } catch (err) {
                console.warn("Clipboard API falhou, tentando fallback...");
            }
        }
        
        // Fallback manual para iframes
        const textArea = document.createElement("textarea");
        textArea.value = texto;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            return successful;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }

    if (mainBtn) {
        mainBtn.addEventListener('click', async () => {
            if (!isReadyToCopy) {
                const tamanho = parseInt(seletorTamanho.value);
                campoSenha.textContent = gerarSenha(tamanho);
                isReadyToCopy = true;
                mainBtn.classList.add('is-copy-mode');
                mainBtn.textContent = "COPIAR SENHA 🛡️";
            } else {
                const sucesso = await copiarTexto(campoSenha.textContent);
                if (sucesso) {
                    mainBtn.textContent = "COPIADO!";
                    setTimeout(() => {
                        isReadyToCopy = false;
                        mainBtn.classList.remove('is-copy-mode');
                        mainBtn.textContent = "GERAR SENHA";
                    }, 2000);
                }
            }
        });
    }
});