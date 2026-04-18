document.addEventListener("DOMContentLoaded", () => {
  const envelopeWrapper = document.getElementById('envelope-wrapper');
  const letter = document.getElementById('letter');
  const hint = document.getElementById('hint');
  const bgMusic = document.getElementById('bg-music');

  let isOpen = false;
  let isRead = false;

  const textToType = "မမကိုချစ်တယ်ဆိုတာထက် မြတ်နိုးတာပါမမရယ်\nတကယ်တော့ကျွန်တော်က မ့ထက်အသက်ငယ်ပေမယ့် မမအတွက်ဆိုရင်ရည်မှန်းချက်တွေနဲ့ပြည့်နှက်နေတာပါ\nကျွန်တော်ချစ်ရတဲ့မကို တစ်ရက်လောက်စောပြီးတွေ့ခွင့်ရရင် အရမ်းကောင်းမှာပဲမရယ်\nတကယ်တော့ကျွန်တော်က မကိုဘယ်သူနဲ့မှယှခဲ့တာမဟုတ်ပါဘူး\nမမက ကျွန်တော့်အတွက်အကောင်းဆုံးနဲ့အဖိုးတန်ဆုံးပါ\nအဲ့ဒါကြောင့်မမကို ကျွန်တော့်ဘက်ကိုစိတ်ယိုင်ပေးပါလားမမရယ်";

  let isTyping = false;
  let hasTyped = false;

  // Handle envelope click (automatically open and read letter)
  envelopeWrapper.addEventListener('click', (e) => {
    if (!isOpen) {
      // Start playing background music
      if (bgMusic && bgMusic.paused) {
        // To set the volume lower: bgMusic.volume = 0.5;
        bgMusic.play().catch(err => console.log("Audio play failed:", err));
      }

      // Open the envelope
      envelopeWrapper.classList.add('open');
      isOpen = true;
      hint.style.opacity = '0';
      spawnPopHearts(e.clientX, e.clientY);

      // Automatically appear letter and start typewriter animation
      setTimeout(() => {
        if (isOpen) {
          envelopeWrapper.classList.add('read');
          isRead = true;

          if (!hasTyped && !isTyping) {
            isTyping = true;
            // Wait for letter to scale and position itself before typing
            setTimeout(() => typeWriterEffect(textToType, document.getElementById('typewriter-text')), 600);
          }
        }
      }, 600);
    } else if (isRead) {
      // Close everything when user clicks again
      envelopeWrapper.classList.remove('read');
      envelopeWrapper.classList.remove('open');
      isOpen = false;
      isRead = false;
      hint.style.opacity = '1';
    }
  });

  function typeWriterEffect(text, element, speed = 60) {
    let i = 0;
    element.textContent = '';
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        // Add slight randomness to typing speed for human feel
        let currentSpeed = speed + (Math.random() * 40 - 20);
        setTimeout(type, currentSpeed);
      } else {
        isTyping = false;
        hasTyped = true;
        // Reveal the seal/sign-off gently after typing
        document.getElementById('letter-seal').classList.add('visible');
      }
    }
    type();
  }

  createBackgroundParticles();
});

function createBackgroundParticles() {
  const container = document.getElementById('particles');
  // Using hearts and stars to mimic the aesthetic of the provided image
  const symbols = ['❤', '✨', '⭐', '💖'];

  for (let i = 0; i < 25; i++) {
    setTimeout(() => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

      // Random positioning and sizing
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.top = Math.random() * 100 + 'vh';
      particle.style.fontSize = Math.random() * 18 + 12 + 'px';
      particle.style.color = Math.random() > 0.5 ? '#ffb3c6' : '#ff8fab'; // soft pinks

      // Random float parameters
      const duration = Math.random() * 4 + 5;
      particle.style.animation = `float ${duration}s infinite linear`;
      particle.style.animationDelay = `-${Math.random() * 5}s`;

      container.appendChild(particle);
    }, i * 250); // Stagger particle creation
  }
}

function spawnPopHearts(x, y) {
  // When the envelope is clicked, burst some small hearts
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.style.position = 'absolute';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = '#c1121f';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';

    document.body.appendChild(heart);

    // Wait for next frame so transition triggers correctly
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 80 + 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 50; // bias upward

        heart.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
        heart.style.opacity = '0';
      });
    });

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}
