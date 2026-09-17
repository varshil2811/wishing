const birthdayConfig = {
  wifeName: "My Love", // Configurable name

  // Birthday date (YYYY-MM-DD format)
  birthday: "2026-09-18", 

  welcome: {
    title: "Happy Birthday, My Love ❤️",
    subtitle: "Today is all about YOU ✨",
    description: "Today isn't just your birthday... it's the day the world became more beautiful."
  },

  photos: [
    {
      src: "/images/photo1.jpg",
      title: "Our First Memory",
      caption: "Some memories become forever. ❤️"
    },
    {
      src: "/images/photo2.jpg",
      title: "Beautiful Moments",
      caption: "Every moment with you is special."
    },
    {
      src: "/images/photo3.jpg",
      title: "Adventures Together",
      caption: "You turn ordinary moments into beautiful memories."
    },
    {
      src: "/images/photo4.jpg",
      title: "Just Us",
      caption: "My favorite place is wherever I am with you."
    }
  ],

  cake: {
    title: "Make a Wish, My Love 🎂❤️",
    subtitle: "Tap the cake to make a wish ✨",
    candles: 5 // number of candles on the cake
  },

  reveal: {
    title: "Happy Birthday, My Beautiful Wife ❤️"
  },

  loveLetter: {
    greeting: "My Love,",
    paragraphs: [
      "You are one of the most beautiful parts of my life.",
      "Every smile of yours makes my world brighter.",
      "Every moment with you becomes a memory I want to keep forever.",
      "On your special day, I just want you to know...",
      "I love you. Today. Tomorrow. And every day after that."
    ],
    closing: "With all my love,",
    signature: "Forever Yours ❤️"
  },

  final: {
    title: "Forever & Always ❤️",
    quote: "My favorite place is wherever I am with you.",
    birthdayMessage: "Happy Birthday, My Beautiful Wife ❤️"
  },

  music: {
    enabled: true,
    src: "/music/matthew_ifield.m4a",
    volume: 0.5 // 0.0 to 1.0
  },

  effects: {
    floatingHearts: true,
    particles: true,
    sparkles: true,
    confetti: true,
    fireworks: true
  }
};

export default birthdayConfig;
