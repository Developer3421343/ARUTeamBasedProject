document.querySelectorAll('.reveal-btn').forEach(button => {
    button.addEventListener('click', () => {

        const section = button.parentElement;
        const workings = section.querySelectorAll('.workings');

        const shouldShow = !workings[0].classList.contains('show');

        workings.forEach(w => {
            if (shouldShow) {
                w.classList.add('show');
            } else {
                w.classList.remove('show');
            }
        });

        button.textContent = shouldShow ? 'Hide Answers' : 'Reveal Answers';
    });
});
