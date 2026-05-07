// ==========================================
// 🎯 جميع المتغيرات القابلة للتعديل - عدل هنا فقط
// ==========================================
const CONFIG = {
  // 📅 معلومات الزفاف
  wedding: {
    groomName: " الدكتور ابانوب",
    brideName: "الانسة مونيكا",
    date: "الاربعاء الموافق 20/5/2026",
    lunchTime: "10 مساءً ",
    hennaTime: "7 مساءً",
  },

  // 📍 معلومات الموقع
  location: {
    address: " ",
    directions: " ",
    hallName: "فندق التكوين الفكرية أبو قرقاص ",
    // ⚠️ رابط خرائط Google - استبدله بالرابط الصحيح
    googleMapsUrl:
      "https://www.google.com/maps/place/%D9%81%D9%86%D8%AF%D9%82+%D8%A7%D9%84%D8%AA%D9%83%D9%88%D9%8A%D9%86+%D8%AC%D9%85%D8%B9%D9%8A%D8%A9+%D8%A7%D9%84%D8%B5%D8%B9%D9%8A%D8%AF+(%D9%85%D8%B1%D9%83%D8%B2+%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8+%D8%A7%D9%84%D9%85%D8%AA%D9%83%D8%A7%D9%85%D9%84)%E2%80%AD/@27.936169,30.8402069,17z/data=!3m1!4b1!4m6!3m5!1s0x145b2be629514865:0x74a3966489bb4d60!8m2!3d27.936169!4d30.8402069!16s%2Fg%2F11s7d2lk78!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D",
  },

  // 🎵 إعدادات الصوت
  audio: {
    // ⚠️ رابط ملف الصوت - استبدله برابطك
    src: "assets/music/song.mp3",
    volume: 0.4,
    loop: true,
  },

  // 🖼️ إعدادات الصورة
  image: {
    // ⚠️ رابط الصورة - استبدله برابط صورتك
    src: "assets/images/couple.webp", // اتركه فارغ لو عاوز تستخدم placeholder
    alt: "أحمد وعروسته",
  },

  // ✨ النصوص
  text: {
    invitationTitle:
      "تتشرف عائلة الحاج ثروت\nبدعوة حضراتكم لحضور\nوليمة زفاف الاستاذ احمد ثروت",
    quranVerse:
      "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا",
    endingMessage: "✨ يسعدنا ويشرفنا حضوركم ✨",
  },
};

// ==========================================
// 🚀 الكود التنفيذي - ما تغيرش حاجة تحت هنا
// ==========================================

(function () {
  "use strict";

  // Elements
  const hookScreen = document.getElementById("hookScreen");
  const mainCard = document.getElementById("mainCard");
  const openBtn = document.getElementById("openInvitationBtn");
  const locationBtn = document.getElementById("locationButton");
  const musicControl = document.getElementById("musicControl");
  const musicIcon = document.getElementById("musicIcon");
  const musicText = document.getElementById("musicText");
  const coupleImage = document.getElementById("coupleImage");

  // Audio state
  let audio = null;
  let isPlaying = false;

  // ========== تهيئة الصورة ==========
  function initImage() {
    if (CONFIG.image.src && coupleImage) {
      coupleImage.innerHTML = `
        <img src="${CONFIG.image.src}" 
             alt="${CONFIG.image.alt}" 
             style="width: 100%; height: 100%; object-fit: cover; border-radius: 28px;">
      `;
      coupleImage.style.padding = "0";
      coupleImage.style.background = "transparent";
    }
  }

  // ========== إنشاء عنصر الصوت ==========
  function createAudio() {
    if (audio) return audio;
    audio = new Audio(CONFIG.audio.src);
    audio.loop = CONFIG.audio.loop;
    audio.volume = CONFIG.audio.volume;
    audio.preload = "auto";
    return audio;
  }

  // ========== تشغيل الصوت ==========
  function playAudio() {
    if (!audio) audio = createAudio();

    audio
      .play()
      .then(() => {
        isPlaying = true;
        updateMusicButton();
      })
      .catch((err) => {
        console.log("Audio play prevented:", err);
        isPlaying = false;
        updateMusicButton();
      });
  }

  // ========== إيقاف الصوت ==========
  function pauseAudio() {
    if (audio) {
      audio.pause();
      isPlaying = false;
      updateMusicButton();
    }
  }

  // ========== تبديل الصوت ==========
  function toggleMusic() {
    if (!audio) audio = createAudio();

    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  }

  // ========== تحديث زر الموسيقى ==========
  function updateMusicButton() {
    if (isPlaying) {
      musicIcon.className = "fas fa-volume-up";
      musicText.textContent = "إيقاف الموسيقى";
    } else {
      musicIcon.className = "fas fa-volume-mute";
      musicText.textContent = "تشغيل الموسيقى";
    }
  }

  // ========== فتح الدعوة ==========
  function revealInvitation() {
    hookScreen.classList.add("hidden");

    setTimeout(() => {
      mainCard.classList.add("visible");
    }, 100);

    createAudio();
    playAudio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ========== فتح الموقع في خرائط Google ==========
  function openLocation() {
    window.open(CONFIG.location.googleMapsUrl, "_blank");
  }

  // ========== تهيئة النصوص ==========
  function initTexts() {
    // ممكن تضيف تحديث النصوص من CONFIG لو عاوز
    // حالياً النصوص مكتوبة في HTML
  }

  // ========== Event Listeners ==========
  function initEvents() {
    // زر فتح الدعوة
    openBtn.addEventListener("click", (e) => {
      e.preventDefault();
      revealInvitation();
    });

    // الضغط على شاشة البداية
    hookScreen.addEventListener("click", (e) => {
      if (e.target === hookScreen || e.target.closest(".hook-content")) {
        revealInvitation();
      }
    });

    // زر الموقع
    locationBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openLocation();
    });

    // زر الموسيقى
    musicControl.addEventListener("click", (e) => {
      e.preventDefault();
      toggleMusic();
    });

    // ESC للفتح
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !hookScreen.classList.contains("hidden")) {
        revealInvitation();
      }
    });

    // إيقاف الصوت عند تبديل التبويب
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && audio && isPlaying) {
        audio.pause();
      } else if (!document.hidden && audio && isPlaying) {
        audio.play().catch(() => {});
      }
    });
  }

  // ========== بدء التشغيل ==========
  function init() {
    initImage();
    initTexts();
    initEvents();
    createAudio(); // تجهيز الصوت بدون تشغيل
  }

  init();
})();
