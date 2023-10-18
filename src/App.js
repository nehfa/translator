import TextBox from './components/TextBox';
import Arrows from './components/Arrows';
import Modal from './components/Modal';
import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { Meaning } from './components/Meaning';
import slaves from './slaves.txt'; //import txt
import { ModalWindow } from './components/ModalWindow';

function App() {
  const [showModal, setShowModal] = React.useState(null);
  const [inputLanguage, setInputLanguage] = React.useState('English');
  const [outputLanguage, setOutputLanguage] = React.useState('Russian');
  const [source, setSource] = React.useState('en');
  const [target, setTarget] = React.useState('ru');
  const [languages, setLanguages] = React.useState(null);
  const [lang, setLang] = React.useState(null);
  const [textToTranslate, setTextToTranslate] = React.useState('');
  const [translatedText, setTranslatedText] = React.useState('');
  //Search
  const [answer, setAnswer] = React.useState([]);
  const [massive, setMassive] = React.useState([]);
  const [input, setInput] = React.useState('');

  const findAnswer = useCallback(
    debounce((answer, input, massive, setMassive) => {
      setMassive(
        answer.filter((item) => {
          return item.includes(input);
        }),
      );
    }, 1000),
    [input],
  );

  const changeInput = useCallback(
    debounce((e, setInput) => {
      setInput(e);
      console.log(input);
    }, 500),
  );

  useEffect(() => {
    if (input) {
      findAnswer(answer, input, massive, setMassive);
    } else {
      console.log('Empty!');
    }
  }, [input]);

  //Получить все языки
  const getLanguages = async () => {
    const options = {
      method: 'GET',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
      headers: {
        'X-RapidAPI-Key': '491287c98dmshc8c0921a6b5072dp15d17ejsnd7152d8ea739',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      const arrayOfData = Object.keys(response.data.languages).map(
        (key) => response.data.languages[key],
      );
      const finalarray = arrayOfData.map(function (obj) {
        return obj.name;
      });
      const finalarray2 = arrayOfData.map(function (obj) {
        return obj.language;
      });
      setLanguages(finalarray);
      setLang(finalarray2);
    } catch (error) {
      console.error(error);
    }
  };

  //Вызвать функцию перевода
  const translateDebounce = useCallback(
    debounce((e) => {
      console.log('translateDebounce');
      translate(e);
      setInput(e);
      setTextToTranslate(e);
      console.log('input', input);
    }, 350),
    [source, target],
  );

  //Функция перевода
  const translate = async (e) => {
    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '491287c98dmshc8c0921a6b5072dp15d17ejsnd7152d8ea739',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com',
      },
      data: {
        q: e,
        source: source,
        target: target,
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
      setTranslatedText(response.data.data.translations.translatedText);
    } catch (error) {
      console.error(error);
    }

    console.log(source, target);
  };

  console.log(textToTranslate);

  //Подгрузка языков и данных из txt
  useEffect(() => {
    getLanguages();
    fetch(slaves)
      .then((r) => r.text())
      .then((text) => {
        console.log('text decoded:', text);
        setAnswer(text.split('\r' + '\n'));
      });
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setSource(target);
    setTarget(source);
  };

  //Костыли
  window.onmousemove = () => {};
  window.onmousedown = () => {};
  window.onmouseup = () => {};

  return (
    <div className="app">
      {textToTranslate === 'catcollection' && (
        <ModalWindow
          setTextToTranslate={setTextToTranslate}
          setTranslatedText={setTranslatedText}
          setShowModal={setShowModal}
        />
      )}
      {!showModal && (
        <>
          <TextBox
            style="input"
            selectedLanguage={inputLanguage}
            setShowModal={setShowModal}
            setTextToTranslate={setTextToTranslate}
            setTranslatedText={setTranslatedText}
            textToTranslate={textToTranslate}
            setSource={setSource}
            setTarget={setTarget}
            translateDebounce={translateDebounce}
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

          <TextBox
            style="output"
            selectedLanguage={outputLanguage}
            setShowModal={setShowModal}
            translatedText={translatedText}
            input={input}
            setInput={setInput}
          />

          <Meaning
            answer={answer}
            input={input}
            setInput={setInput}
            massive={massive}
            setMassive={setMassive}
            textToTranslate={textToTranslate}
          />
        </>
      )}

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          languages={languages}
          lang={lang}
          chosenLanguage={showModal === 'input' ? inputLanguage : outputLanguage}
          setSourceTarget={showModal === 'input' ? setSource : setTarget}
          setChosenLanguage={showModal === 'input' ? setInputLanguage : setOutputLanguage}
          inputLanguage={inputLanguage}
          outputLanguage={outputLanguage}
        />
      )}
    </div>
  );
}

export default App;
