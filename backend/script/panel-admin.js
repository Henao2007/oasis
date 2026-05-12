const buttons = document.querySelectorAll('.nav-button');
const viewTitle = document.getElementById('viewTitle');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        viewTitle.textContent = button.dataset.title;
    });
});
