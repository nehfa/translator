import SelectDropDown from './SelectDropDown';

const TextBox = ({
  selectedLanguage,
  style,
  setShowModal,
  setTextToTranslate,
  textToTranslate,
  translatedText,
  setTranslatedText,
  setSource,
  setTarget,
  translateDebounce,
}) => {
  const handleClick = () => {
    setTranslatedText('');
    setTextToTranslate('');
  };

  const onChangeText = async (e) => {
    setTextToTranslate(e);
    translateDebounce(e);
  };

  return (
    <div className={style}>
      <SelectDropDown
        selectedLanguage={selectedLanguage}
        setShowModal={setShowModal}
        style={style}
        setSource={setSource}
        setTarget={setTarget}
      />
      <textarea
        placeholder={style === 'input' ? 'Enter the text' : 'Translation'}
        disabled={style === 'output'}
        onChange={(e) => onChangeText(e.target.value)}
        value={style === 'input' ? textToTranslate : translatedText}
      />
      {style === 'input' && (
        <div className="delete" onClick={handleClick}>
          🐈
        </div>
      )}
    </div>
  );
};

export default TextBox;
