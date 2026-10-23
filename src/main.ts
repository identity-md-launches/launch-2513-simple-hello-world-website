const button = document.querySelector<HTMLButtonElement>('#hello');
const reply = document.querySelector<HTMLParagraphElement>('#reply');

if (button && reply) {
  button.hidden = false;
  let greeted = false;

  button.addEventListener('click', () => {
    greeted = !greeted;
    reply.textContent = greeted ? 'Hello, friend!' : '';
    button.textContent = greeted ? 'Start again' : 'Say hello';
  });
}
