(() => {
  const button = document.querySelector('.menu');
  const nav = document.querySelector('nav');
  if (button && nav) {
    button.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      button.setAttribute('aria-expanded', 'false');
    }));
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  const formStatus = document.querySelector('.form-status');
  const contactForm = document.querySelector('.contact-form');
  if (contactForm && formStatus) {
    const submitButton = contactForm.querySelector('[type="submit"]');
    const originalButton = submitButton.innerHTML;

    contactForm.addEventListener('submit', async event => {
      event.preventDefault();
      submitButton.disabled = true;
      submitButton.textContent = 'Sending…';
      formStatus.hidden = true;

      try {
        const data = new URLSearchParams();
        new FormData(contactForm).forEach((value, key) => {
          if (typeof value === 'string') data.append(key, value);
        });
        const endpoint = contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'},
          body: data.toString()
        });
        const result = await response.json();
        if (!response.ok || result.success === false || result.success === 'false') {
          throw new Error(result.message || 'Your message could not be sent. Please try again.');
        }

        contactForm.reset();
        formStatus.textContent = 'Thanks — your message has been sent. I’ll be in touch soon.';
        submitButton.innerHTML = 'Send another message <span>↗</span>';
      } catch (error) {
        formStatus.textContent = error.message || 'Something went wrong. Please try again or email me directly.';
        submitButton.innerHTML = originalButton;
      } finally {
        formStatus.hidden = false;
        submitButton.disabled = false;
      }
    });
  }

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -25px 0px'});
    reveal.forEach(el => observer.observe(el));
  } else reveal.forEach(el => el.classList.add('visible'));

  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) navLinks.forEach(link =>
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
      });
    }, {rootMargin: '-35% 0px -55% 0px'});
    document.querySelectorAll('main section[id]').forEach(s => activeObserver.observe(s));
  }
})();
