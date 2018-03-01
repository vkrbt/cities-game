const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognize = () => new Promise((res, rej) => {
  if (!SpeechRecognition) {
    rej(new Error('Ваш браузер не поддерживает функцию распознания голоса'));
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'ru-RU';

  recognition.start();

  recognition.onresult = (e) => {
    const cityName = e.results[0][0].transcript;

    recognition.stop();
    res(cityName);
  };

  recognition.onend = () => {
    res('');
  };

  recognition.onnomatch = (e) => {
    recognition.stop();
    rej(e);
  };

  recognition.onerror = (e) => {
    recognition.stop();
    rej(e);
  };
});

export { SpeechRecognition };

export default recognize;
