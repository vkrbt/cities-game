const { speechSynthesis } = window;


const speak = (words = '') => {
  if (!speechSynthesis) {
    return;
  }

  const voices = speechSynthesis.getVoices();
  const utterance = new SpeechSynthesisUtterance(words);

  utterance.voice = voices.find(voice => voice.lang === 'ru-RU');
  utterance.pitch = 0.9;
  utterance.rate = 0.8;

  speechSynthesis.speak(utterance);
};

export default speak;
