import React, { useState } from "react";
import countries from "../countries";

function Translator() {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("de-DE");

  const handleTranslate = () => {
    if (!fromText.trim()) return;
    setToText("Translating...");
    const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${fromLang}|${toLang}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        setToText(data.responseData.translatedText);
      });
  };

  const handleExchange = () => {
    const tempText = fromText;
    const tempLang = fromLang;
    setFromText(toText);
    setToText(tempText);
    setFromLang(toLang);
    setToLang(tempLang);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeech = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  };

  return (
    <>
      <div className="wrapper">
        <div className="text-input">
          <textarea
            spellCheck="false"
            className="from-text"
            placeholder="Enter text"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
          />
          <textarea
            spellCheck="false"
            className="to-text"
            placeholder="Translation"
            value={toText}
            readOnly
            disabled
          />
        </div>
        <ul className="controls">
          <li className="row from">
            <div className="icons">
              <i
                className="fas fa-volume-up"
                onClick={() => handleSpeech(fromText, fromLang)}
              ></i>
              <i
                className="fas fa-copy"
                onClick={() => handleCopy(fromText)}
              ></i>
            </div>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </li>
          <li className="exchange" onClick={handleExchange}>
            <i className="fas fa-exchange-alt"></i>
          </li>
          <li className="row to">
            <select value={toLang} onChange={(e) => setToLang(e.target.value)}>
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <div className="icons">
              <i
                className="fas fa-volume-up"
                onClick={() => handleSpeech(toText, toLang)}
              ></i>
              <i className="fas fa-copy" onClick={() => handleCopy(toText)}></i>
            </div>
          </li>
        </ul>
      </div>
      <button onClick={handleTranslate}>Translate Text</button>
    </>
  );
}

export default Translator;
