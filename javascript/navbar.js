const navbar = document.getElementById('navbar');
const links = [
    { href: 'index.html', label: 'Home' },
    { href: 'about.html', label: 'About' },
    { href: 'contact.html', label: 'Contact' },
    { href: 'get involved.html', label: 'Get Involved' },
    { href: 'programs.html', label: 'Programs' }
];

if (navbar) {
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    links.forEach(link => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        if (window.location.pathname.endsWith(link.href)) {
            a.classList.add('active');
        }
        li.appendChild(a);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    navbar.appendChild(nav);
}
