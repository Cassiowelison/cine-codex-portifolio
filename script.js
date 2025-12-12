// --- 1. DADOS DOS PROJETOS (Simulando um Banco de Dados/JSON) ---
const projectsData = [
    {
        id: 1,
        title: "Projeto Cyberpunk",
        tech: ["HTML5", "CSS Grid", "Javascript"],
        desc: "Um site imersivo criado para promover um jogo fictício. Contém animações parallax, efeitos de glitch e otimização SEO.",
        img: "https://source.unsplash.com/random/800x600/?cyberpunk",
        link: "https://github.com/seusuario/projeto1"
    },
    {
        id: 2,
        title: "Dashboard Financeiro",
        tech: ["React", "Node.js", "Chart.js"],
        desc: "Sistema completo de gestão financeira com gráficos em tempo real, autenticação JWT e modo escuro automático.",
        img: "https://source.unsplash.com/random/800x600/?finance,tech",
        link: "#"
    },
    {
        id: 3,
        title: "App de Delivery",
        tech: ["React Native", "Firebase"],
        desc: "Aplicativo mobile multiplataforma para entregas. Inclui geolocalização, carrinho de compras e pagamentos via Stripe.",
        img: "https://source.unsplash.com/random/800x600/?food,app",
        link: "#"
    },
    {
        id: 4,
        title: "RPG Text Adventure",
        tech: ["Python", "Terminal"],
        desc: "Um jogo clássico baseado em texto rodando no terminal, com sistema de batalha, inventário e múltiplos finais.",
        img: "https://source.unsplash.com/random/800x600/?dungeons",
        link: "#"
    }
];

// --- 2. RENDERIZAÇÃO DINÂMICA (Estilo React/Vue) ---
const gridContainer = document.getElementById('grid-container');

function renderProjects() {
    gridContainer.innerHTML = projectsData.map(project => `
        <div class="game-card" onclick="openModal(${project.id})">
            <div class="card-bg" style="background-image: url('${project.img}')"></div>
            <div class="card-content">
                <h3>${project.title}</h3>
                <p style="color: #aaa; font-size: 0.9rem">${project.tech[0]}</p>
            </div>
        </div>
    `).join('');
}

// Inicializa a renderização
renderProjects();

// --- 3. LÓGICA DO MODAL ---
const modal = document.getElementById('project-modal');
const closeModalBtn = document.querySelector('.close-modal');

// Elementos internos do modal para preencher
const mTitle = document.getElementById('modal-title');
const mDesc = document.getElementById('modal-desc');
const mTags = document.getElementById('modal-tags');
const mImg = document.getElementById('modal-image');
const mLink = document.getElementById('modal-link');

// Função chamada ao clicar no card (definida no HTML injetado acima)
window.openModal = function (id) {
    const project = projectsData.find(p => p.id === id);

    if (project) {
        mTitle.innerText = project.title;
        mDesc.innerText = project.desc;
        mImg.style.backgroundImage = `url('${project.img}')`;
        mLink.href = project.link;

        // Limpa e adiciona as tags
        mTags.innerHTML = project.tech.map(t => `<span>${t}</span>`).join('');

        modal.classList.add('active');
    }
}

// Fechar Modal
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Fechar ao clicar fora
modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

// --- 4. MENU MOBILE ---
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});