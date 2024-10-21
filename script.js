const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');
const videoContainer = document.getElementById('videoContainer');
const formulaContainer = document.getElementById('formulaContainer');
const mediaContainer = document.getElementById('mediaContainer'); // Obtener el contenedor de medios
let animationId;
let backgroundImage = new Image();
let currentAnimationType = '';


function goBack() {
    // Ocultar el contenedor de video y fórmulas
    const mediaContainer = document.getElementById('mediaContainer');
    mediaContainer.style.display = 'none';

    // Limpiar la salida
    const output = document.getElementById('output');
    output.innerHTML = '';

    // Ocultar el contenedor de fórmulas
    const formulaContainer = document.getElementById('formulaContainer');
    formulaContainer.style.display = 'none';

    // Detener la animación
    cancelAnimationFrame(animationId);

    // Ocultar el botón de actividad
    document.getElementById('activityButtonContainer').style.display = 'none';

    // Mostrar el botón de toggle si es necesario
    document.getElementById('toggleButton').style.display = 'block';
    
    // Opcional: Reiniciar el canvas y otras variables si es necesario
    const canvas = document.getElementById('animationCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Función para mostrar la información y las animaciones
function showInfo(type) {
    const output = document.getElementById('output');
    cancelAnimationFrame(animationId);
    mediaContainer.style.display = 'flex'; // Mostrar contenedor de video y animación
    canvas.style.display = 'block';
    formulaContainer.style.display = 'flex'; // Mostrar las tarjetas de fórmula
    videoContainer.style.display = 'none'; // Ocultar el contenedor del video
    currentAnimationType = type;

    // Mostrar el contenedor del botón de actividad
    document.getElementById('activityButtonContainer').style.display = 'block'; // Mostrar el botón de actividad
    document.getElementById('toggleButton').style.display = 'none';

    switch (type) {
        case 'mru':
            output.innerHTML = ` 
                <h2>Movimiento Rectilíneo Uniforme (MRU)</h2>
                <p>Es un movimiento en línea recta con velocidad constante. La aceleración es cero.</p>
                <p><strong>Ejemplo:</strong> Un coche viajando a velocidad constante en una carretera recta.</p>
                <button onclick="showVideo()">Info-Audiovisual</button>
            `;
            backgroundImage.src = '1.jpg';
            backgroundImage.onload = animateMRU;
            showFormulas('mru');
            break;
        case 'caida-libre':
            output.innerHTML = ` 
                <h2>Caída Libre</h2>
                <p>Es un movimiento vertical bajo la influencia de la gravedad. La aceleración es constante e igual a g (9.8 m/s²).</p>
                <p><strong>Ejemplo:</strong> Una pelota dejada caer desde una altura.</p>
                <button onclick="showVideo()">Info-Audiovisual</button>
            `;
            backgroundImage.src = '2.jpg';
            backgroundImage.onload = animateCaidaLibre;
            showFormulas('caida-libre');
            break;
        case 'mrua':
            output.innerHTML = ` 
                <h2>Movimiento Rectilíneo Uniformemente Acelerado (MRUA)</h2>
                <p>Es un movimiento en línea recta con aceleración constante. La velocidad cambia uniformemente.</p>
                <p><strong>Ejemplo:</strong> Un coche acelerando desde el reposo.</p>
                <button onclick="showVideo()">Info-Audiovisual</button>
            `;
            backgroundImage.src = '1.jpg';
            backgroundImage.onload = animateMRUA;
            showFormulas('mrua');
            break;
        case 'mcu':
            output.innerHTML = ` 
                <h2>Movimiento Circular Uniforme (MCU)</h2>
                <p>Es un movimiento en círculo con velocidad angular constante. La aceleración centrípeta es constante.</p>
                <p><strong>Ejemplo:</strong> Un satélite orbitando la Tierra a altura constante.</p>
                <button onclick="showVideo()">Info-Audiovisual</button>
            `;
            backgroundImage.src = '3.jpg';
            backgroundImage.onload = animateMCU;
            showFormulas('mcu');
            break;
        default:
            break;
    }
}

// Funciones de animación

// Función para mostrar la imagen al pasar el mouse
function showImage(imageSrc) {
    const imageContainer = document.getElementById('imageContainer');
    const hoverImage = document.getElementById('hoverImage');

    // Cambia la fuente de la imagen
    hoverImage.src = imageSrc;
    imageContainer.style.display = 'block';

    // Posiciona la imagen según el mouse
    document.onmousemove = function(event) {
        imageContainer.style.left = event.pageX + 'px';
        imageContainer.style.top = (event.pageY - 100) + 'px'; // Ajustar la posición vertical
    };
}

// Función para ocultar la imagen
function hideImage() {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.style.display = 'none';
    document.onmousemove = null; // Detener el seguimiento del mouse
}


function toggleContainer() {
    const container = document.getElementById('slidingContainer');

    if (container.style.display === 'none' || container.style.display === '') {
        container.style.display = 'block'; // Muestra el contenedor
        // Ajusta la altura del contenedor para permitir la animación
        const fullHeight = container.scrollHeight + 'px';
        container.style.height = fullHeight; // Establece la altura

        setTimeout(() => {
            container.style.overflow = 'visible'; // Permite que se vea el contenido
        }, 500); // Tiempo de transición
    } else {
        container.style.overflow = 'hidden'; // Oculta el contenido
        container.style.height = '0px'; // Ajusta la altura a 0 para el deslizamiento

        // Espera a que se complete la animación antes de ocultar el contenedor
        setTimeout(() => {
            container.style.display = 'none'; // Oculta el contenedor
        }, 500); // Tiempo de transición
    }
}


function animateMRU() {
    const speed = 2; // Velocidad de movimiento
    let x = 0; // Posición inicial

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Dibujar el objeto en movimiento
        ctx.fillStyle = 'red';
        ctx.fillRect(x, canvas.height / 2 - 10, 50, 20); // Rectángulo en movimiento

        // Actualizar la posición
        x += speed;
        
        // Reiniciar la posición si sale del canvas
        if (x > canvas.width) {
            x = -50; // Reiniciar fuera de la vista a la izquierda
        }

        animationId = requestAnimationFrame(draw);
    }

    draw();
}

function animateCaidaLibre() {
    const timeStep = 0.1; // Incremento de tiempo
    const g = 9.8; // Aceleración debido a la gravedad
    let time = 0; // Tiempo transcurrido
    let y = 50; // Altura inicial en píxeles
    const radius = 10; // Radio del objeto circular

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Actualizar la posición del objeto
        time += timeStep;
        y += (0.5 * g * Math.pow(time, 2)) / 100; // Calcular la nueva posición vertical
        
        // Dibujar el objeto como un círculo
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(canvas.width / 2, y, radius, 0, Math.PI * 2); // Dibuja un círculo
        ctx.fill();

        // Reiniciar la animación si el objeto ha tocado el suelo
        if (y >= canvas.height) {
            y = 50; // Reiniciar a la altura inicial
            time = 0; // Reiniciar el tiempo
        }

        animationId = requestAnimationFrame(draw);
    }

    draw();
}

function animateMRUA() {
    const acceleration = 0.1; // Aceleración
    let velocity = 0; // Velocidad inicial
    let x = 0; // Posición inicial

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Actualizar la velocidad y posición
        velocity += acceleration;
        x += velocity;

        // Dibujar el objeto
        ctx.fillStyle = 'green';
        ctx.fillRect(x, canvas.height / 2 - 10, 50, 20); // Rectángulo en movimiento

        // Reiniciar la posición si sale del canvas
        if (x > canvas.width) {
            x = -50; // Reiniciar fuera de la vista a la izquierda
            velocity = 0; // Reiniciar la velocidad
        }

        animationId = requestAnimationFrame(draw);
    }

    draw();
}

function animateMCU() {
    const radius = 110; // Radio del círculo
    const centerX = canvas.width / 2; // Centro del canvas
    const centerY = canvas.height / 2; // Centro del canvas
    let angle = 0; // Ángulo inicial
    const objectRadius = 10; // Radio del objeto circular

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        
        // Calcular la posición del objeto en movimiento circular
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Dibujar el objeto como un círculo
        ctx.fillStyle = 'purple';
        ctx.beginPath();
        ctx.arc(x, y, objectRadius, 0, Math.PI * 2); // Dibuja un círculo
        ctx.fill();

        // Incrementar el ángulo
        angle += 0.05; // Cambiar el valor para ajustar la velocidad

        // Reiniciar el ángulo si completa una vuelta
        if (angle >= 2 * Math.PI) {
            angle = 0; // Reiniciar ángulo
        }

        animationId = requestAnimationFrame(draw);
    }

    draw();
}

function goToActivity() {
    let url;
    switch (currentAnimationType) {
        case 'mru':
            url = 'https://view.genially.com/6668786e306dba00145aa554/interactive-content-quiz'; // Cambia esto a la URL de la actividad del MRU
            break;
        case 'caida-libre':
            url = 'https://view.genially.com/671439d976efdfa2d8def7e1/interactive-content-caida-libre'; // Cambia esto a la URL de la actividad de caída libre
            break;
        case 'mrua':
            url = 'https://view.genially.com/67143d1376efdfa2d8e1720c/interactive-content-movimiento-rectilineo-uniformemente-variado-mruv'; // Cambia esto a la URL de la actividad del MRUA
            break;
        case 'mcu':
            url = 'https://view.genially.com/6714410105044882e7d41250/interactive-content-movimiento-circular-uniforme-mcu'; // Cambia esto a la URL de la actividad del MCU
            break;
        default:
            return; // No hacer nada si no hay tipo de movimiento seleccionado
    }
    window.location.href = url; // Redirigir a la actividad
}

// Mostrar las fórmulas
function showFormulas(type) {
    formulaContainer.style.display = 'flex';
    const formula1 = document.getElementById('formula1');
    const formula2 = document.getElementById('formula2');
    const formula3 = document.getElementById('formula3');

    switch (type) {
        case 'mru':
            formula1.innerText = 's = vt';
            formula2.innerText = 'v = cte';
            formula3.innerText = 'a = 0';
            break;
        case 'caida-libre':
            formula1.innerText = 'h = h0 - 1/2 g t²';
            formula2.innerText = 'v = gt';
            formula3.innerText = 'a = g';
            break;
        case 'mrua':
            formula1.innerText = 's = v0t + 1/2 a t²';
            formula2.innerText = 'v = v0 + at';
            formula3.innerText = 'a = cte';
            break;
        case 'mcu':
            formula1.innerText = 'v = ωr';
            formula2.innerText = 'a = v²/r';
            formula3.innerText = 'F = ma';
            break;
        default:
            formula1.innerText = '';
            formula2.innerText = '';
            formula3.innerText = '';
            break;
    }
}

// Mostrar video
function showVideo() {
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    switch (currentAnimationType) {
        case 'mru':
            videoSource.src = 'lucio.mp4'; // Cambia a la ruta del video real
            break;
        case 'caida-libre':
            videoSource.src = 'elkin.mp4'; // Cambia a la ruta del video real
            break;
        case 'mrua':
            videoSource.src = 'Jhoan.mp4'; // Cambia a la ruta del video real
            break;
        case 'mcu':
            videoSource.src = 'Camila.mp4'; // Cambia a la ruta del video real
            break;
        default:
            break;
    }

    videoPlayer.load();
    videoContainer.style.display = 'block'; // Mostrar el video
    videoPlayer.play();
}
