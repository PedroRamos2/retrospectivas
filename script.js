// Substitua pela URL do seu webhook
const WEBHOOK_URL = 'COLE_AQUI_A_URL_DO_SEU_WEBHOOK';

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

    // Lê as fotos como base64
    const fotos = await Promise.all(
        Array.from(fotosInput.files).map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        })
    );

    const payload = {
        nome,
        dataEspecial,
        mensagem,
        linkMusica,
        fotos, // array de base64
        dataExpiração: dataExpiracao,
        relação: relacao
    };

    try {
        const response = await fetch('https://fjyeqrfen8n.cloudfy.host/webhook-test/retrospectiva', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
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
