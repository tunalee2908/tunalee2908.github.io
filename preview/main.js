// 1. Chế độ Sáng / Tối (Dark Mode)
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    themeIcon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// 2. Menu điện thoại
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', function () {
    navMenu.classList.toggle('active');
});

document.querySelectorAll('.navigation a').forEach(function (link) {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
    });
});

// 3. Tự động sáng mục Menu & Thanh tiến trình đọc khi cuộn trang
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navigation a');
const progressBar = document.getElementById('readingProgress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';

    backToTop.classList.toggle('show', scrollTop > 500);

    let current = '';
    sections.forEach(function (section) {
        if (scrollTop >= section.offsetTop - 130) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(function (link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
});

backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 4. Hiệu ứng hiện dần khi cuộn tới (Scroll Reveal)
const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
});

// 5. Lọc Dự Án
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.list-items .item');

filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');

        portfolioItems.forEach(function (item) {
            const category = item.getAttribute('data-category');
            item.classList.toggle('hide-item', filterValue !== 'all' && filterValue !== category);
        });
    });
});

// 6. Modal Chi Tiết Dự Án
const projectDetails = {
    glitch: {
        title: "GLITCH Store - Website Thương Mại Điện Tử",
        img: "glitch.jpg",
        tags: ["WordPress", "WooCommerce", "HTML5/CSS3", "XAMPP"],
        desc: "Dự án nhóm học phần Nhập môn CNTT tại Đại học Vinh (12/2025). Xây dựng hệ thống thương mại điện tử kinh doanh thiết bị công nghệ đa thương hiệu. Tích hợp đầy đủ danh mục sản phẩm, bộ lọc theo giá, giỏ hàng thông minh và trang quản trị đơn hàng.",
        github: "https://github.com/tunalee2908"
    },
    brandes: {
        title: "Thuật Toán Brandes - Betweenness Centrality",
        img: "brandes.jpg",
        tags: ["C++", "Brandes Algorithm", "Data Structures", "Graph"],
        desc: "Đồ án môn Cấu trúc dữ liệu và Giải thuật (09/2026). Cài đặt thuật toán Brandes bằng ngôn ngữ C++ giúp tính toán độ trung tâm trung gian của các đỉnh trong mạng lưới đồ thị lớn, giảm độ phức tạp từ O(V^3) xuống O(V*E) đối với đồ thị không trọng số.",
        github: "https://github.com/tunalee2908"
    },
    sqlsystem: {
        title: "Student Management System (C++ & SQL)",
        img: "sql.jpg",
        tags: ["C++ OOP", "SQL Server 2022", "CRUD Operations", "Database"],
        desc: "Ứng dụng quản lý cơ sở dữ liệu sinh viên. Kết hợp sức mạnh của lập trình hướng đối tượng C++ và hệ quản trị CSDL SQL Server 2022 để xử lý luồng dữ liệu, thực hiện các thao tác CRUD và xuất báo cáo thống kê chính xác.",
        github: "https://github.com/tunalee2908"
    }
};

const modal = document.getElementById('projectModal');
const closeModal = document.getElementById('closeModal');

portfolioItems.forEach(function (card) {
    card.addEventListener('click', function () {
        const data = projectDetails[this.getAttribute('data-project')];
        if (!data) return;

        document.getElementById('modalImg').src = data.img;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalDesc').textContent = data.desc;
        document.getElementById('modalGithub').href = data.github;
        document.getElementById('modalTags').innerHTML = data.tags.map(t => `<span>${t}</span>`).join('');
        modal.classList.add('open');
    });
});

closeModal.addEventListener('click', () => modal.classList.remove('open'));
window.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

// 7. Gửi Form Liên Hệ
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';

    try {
        await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });
    } catch (err) {}

    formStatus.textContent = `Cảm ơn ${name}! Hệ thống đã ghi nhận lời nhắn của bạn. ✓`;
    contactForm.reset();
    submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Gửi Tin Nhắn';
});