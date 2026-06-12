// 1. CONTROL DE NAVEGACIÓN ENTRE SECCIONES
function canviarSeccio(seccioId) {
    // Ocultar todas las secciones
    const seccions = document.querySelectorAll('.content-section');
    seccions.forEach(sec => sec.classList.remove('active'));

    // Quitar estado activo a todos los botones
    const botons = document.querySelectorAll('.nav-btn');
    botons.forEach(btn => btn.classList.remove('active'));

    // Mostrar la sección seleccionada
    document.getElementById(seccioId).classList.add('active');

    // Activar el botón correspondiente
    const botoActiu = Array.from(botons).find(btn => btn.getAttribute('onclick').includes(seccioId));
    if (botoActiu) botoActiu.classList.add('active');
}

// 2. CONTROL DEL DESPLEGABLE DEL CHATBOT (BOTÓN TAP)
document.getElementById('chat-toggle').addEventListener('click', function () {
    const widget = document.getElementById('chatbot-widget');
    widget.style.display = (widget.style.display === 'none') ? 'flex' : 'none';
});

// 3. ENVÍO Y PROCESAMIENTO DE MENSAJES
function enviaMissatge() {
    const input = document.getElementById('user-input');
    const missatge = input.value.trim();
    if (!missatge) return;

    mostraMissatge(missatge, 'user');
    input.value = '';

    setTimeout(() => {
        const resposta = generaResposta(missatge);
        mostraMissatge(resposta, 'bot');
    }, 500);
}

// Permitir enviar con la tecla Enter
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        enviaMissatge();
    }
});

function mostraMissatge(text, tipus) {
    const div = document.createElement('div');
    div.className = `message ${tipus}`;
    div.textContent = text;
    document.getElementById('chat-body').appendChild(div);
    
    // Auto-scroll hacia abajo
    const chatBody = document.getElementById('chat-body');
    chatBody.scrollTop = chatBody.scrollHeight;
}

// 4. MOTOR DE RESPUESTAS DEL MOTORBOT
function generaResposta(missatge) {
    missatge = missatge.toLowerCase();

    if (missatge.includes("hola"))
        return "Hola! Puc ajudar-te a trobar el teu cotxe ideal. 🚗";

    if (missatge.includes("combustible") || missatge.includes("motor"))
        return "Els combustibles més rendibles són: Electricitat (molt econòmic), GLP, i Dièsel si fas molts km al any.";

    if (missatge.includes("cotxe ideal") || missatge.includes("recomana"))
        return "Depèn del teu pressupost i de l'ús que li donis. Digues-me quin pressupost tens (en números) per orientar-te.";

    // Detectar presupuesto numérico
    const numero = missatge.match(/\d+/);
    if (numero) {
        const p = parseInt(numero[0]);

        if (p < 12000)
            return "Amb aquest pressupost et recomano mirar el mercat d'ocasió: Toyota Yaris, Fiat Panda o Volkswagen Polo (segona mà).";

        if (p < 25000)
            return "Pressupost mitjà (Nou/Km0): Honda Civic, Toyota Yaris Hybrid o Volkswagen Golf.";

        if (p < 50000)
            return "Gamma mitjana-alta: BMW Sèrie 2, Audi Q3 o un esportiu com el Toyota GR86.";

        return "Alta gamma! Pots optar per un Porsche 911, Nissan GT-R o Ferrari Roma. 🏎️";
    }

    if (missatge.includes("adeu") || missatge.includes("gracies") || missatge.includes("gràcies"))
        return "Adéu! Espero haver-te ajudat amb el teu dubte. Recorda preguntar quan vulguis! 👋";

    return "No he entès la teva pregunta. Pots provar de dir 'combustible', 'cotxe ideal' o escriure una xifra de pressupost.";
}