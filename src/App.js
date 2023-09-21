import TextBox from './components/TextBox';
import Arrows from './components/Arrows';
import Button from './components/Button';
import Modal from './components/Modal';
import React, { useEffect } from 'react';
import axios from 'axios';

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

  const translate = async () => {
    const options = {
      method: 'POST',
      url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '491287c98dmshc8c0921a6b5072dp15d17ejsnd7152d8ea739',
        'X-RapidAPI-Host': 'deep-translate1.p.rapidapi.com',
      },
      data: {
        q: textToTranslate,
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

  console.log(translatedText);

  useEffect(() => {
    getLanguages();
  }, []);

  const handleClick = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setSource(target);
    setTarget(source);
  };

  return (
    <div className="app">
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
          />
          <div className="arrow-container" onClick={handleClick}>
            <Arrows />
          </div>

          <TextBox
            style="output"
            selectedLanguage={outputLanguage}
            setShowModal={setShowModal}
            translatedText={translatedText}
          />
          <div className="button-container" onClick={translate}>
            <Button />
          </div>
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
