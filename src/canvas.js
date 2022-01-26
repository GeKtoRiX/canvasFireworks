import style from './main.css';

const htmlCanvas = document.getElementById('canvas');
const canvas = htmlCanvas.getContext('2d');

htmlCanvas.width = window.innerWidth - 4;
htmlCanvas.height = window.innerHeight - 4;

addEventListener('resize', () => {
    htmlCanvas.width = window.innerWidth - 4;
    htmlCanvas.height = window.innerHeight - 4;
})

var mouse = {
    x: htmlCanvas.width / 2,
    y: htmlCanvas.height / 2,
}

const gravity = 0.005;
const friction = 0.99;

class Particle {
    constructor(x, y, radius, velocity, color) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.opacity = 1;

    }

    draw() {
        canvas.save;
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 180, false);
        canvas.fillStyle = this.color;
        canvas.fill();
        canvas.closePath();
        canvas.restore();
    }

    update() {
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity -= 0.001;
    }
}
let particles;

function init() {
    particles = [];
}

function animate() {
    canvas.fillStyle = 'rgba(0,0,0,0.05)';
    canvas.fillRect(0, 0, htmlCanvas.width, htmlCanvas.height);
    particles.forEach((particle, i) => {
        if (particle.opacity > 0) {
            particle.update();
        }
        else {
            particles.splice(i, 1);
        }
    });

    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('click', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    const radius = 10;
    const particleCount = 200;
    const power = 10;

    const angleIncrement = (Math.PI * 2) / particleCount;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(mouse.x, mouse.y, radius, {
            x: Math.cos(angleIncrement * i) * Math.random() * power ,
            y: Math.sin(angleIncrement * i) * Math.random() * power ,
        }, `hsl(${Math.random() * 360},50%, 50%)`));
    }
})
