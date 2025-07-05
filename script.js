// Substitua pela URL do seu webhook
const WEBHOOK_URL = 'https://fjyeqrfen8n.cloudfy.host/webhook-test/retrospectiva';

document.getElementById('specialPageForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Enviando...';

    const nome = document.getElementById('nome').value;
    const dataEspecial = document.getElementById('dataEspecial').value;
    const mensagem = document.getElementById('mensagem').value;
    const linkMusica = document.getElementById('linkMusica').value;
    const relacao = document.getElementById('relacao').value;
    const dataExpiracao = document.getElementById('dataExpiracao').value;
    const fotosInput = document.getElementById('fotos');

    // Monta o FormData
    const formData = new FormData();
    formData.append('nome', nome);
    formData.append('dataEspecial', dataEspecial);
    formData.append('mensagem', mensagem);
    formData.append('linkMusica', linkMusica);
    formData.append('dataExpiração', dataExpiracao);
    formData.append('relação', relacao);
    // Adiciona as fotos como arquivos
    for (let i = 0; i < fotosInput.files.length; i++) {
        formData.append('fotos', fotosInput.files[i]);
    }

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            statusDiv.textContent = 'Página enviada com sucesso!';
            document.getElementById('specialPageForm').reset();
        } else {
            statusDiv.textContent = 'Erro ao enviar. Tente novamente.';
        }
    } catch (err) {
        statusDiv.textContent = 'Erro ao conectar ao servidor.';
    }
});
