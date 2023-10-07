// // App.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Translate = () => {
    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);
    const [copied1, setCopied1] = useState(false);

    const handleCopyInputClick = () => {
        navigator.clipboard.writeText(input).then(() => {
            setCopied(true);

            // Clear the "Copied" message after a few seconds
            setTimeout(() => {
                setCopied(false);
            }, 1000);
        });
    };

    const handleCloseClick = () => {
        setInput('');
        setOutput('');
    }

    const handleCopyOutputClick = () => {
        navigator.clipboard.writeText(output).then(() => {
            setCopied1(true);

            // Clear the "Copied" message after a few seconds
            setTimeout(() => {
                setCopied1(false);
            }, 1000);
        });
    };

    const translate = () => {
        if (input) {
            const params = new URLSearchParams();
            params.append('q', input);
            params.append('source', from);
            params.append('target', to);
            params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
            axios
                .post('https://libretranslate.de/translate', params, {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                .then((res) => {
                    setOutput(res.data.translatedText);
                });
        }
    };

    useEffect(() => {
        axios
            .get('https://libretranslate.com/languages', {
                headers: { accept: 'application/json' },
            })
            .then((res) => {
                setOptions(res.data);
            });
    }, []);

    return (
        <div className="translate">
            <h1>Language Translator</h1>

            <div className="language-select">
                <select className='select-container1' onChange={(e) => setFrom(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                <span className="arrow">➜</span>
                <select className='select-container2' onChange={(e) => setTo(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-container">
                <div className="text-box">
                    {
                        input && <button className='cancel-btn' onClick={handleCloseClick}>X</button>
                    }
                    <textarea
                        cols="40"
                        rows="7"
                        placeholder="Enter Text...."
                        onInput={(e) => setInput(e.target.value)}
                        value={input}
                    ></textarea>
                    {input && <div className="copy-container">
                        <button onClick={handleCopyInputClick} className="copy-button">
                            {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                        </button>
                    </div>

                    }
                </div>
                <div className="text-box text1">
                    <textarea cols="40" rows="7" placeholder='Translation...' value={output}></textarea>
                    {output && <div className="copy-container">
                        <button onClick={handleCopyOutputClick} className="copy-button">
                            {copied1 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCheck} />}
                        </button>
                        <button onClick={handleCopyOutputClick} className="copy-button">
                            {copied1 ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                        </button>
                    </div>}
                </div>
            </div>
            {/* <ul className="controls">
                <li className="row from">
                    <div className="copy-container">
                        <button onClick={handleCopyClick} className="copy-button">
                            {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                        </button>
                    </div>
                    {copied && (
                        <div className="copy-popup">
                            <p>Copied!</p>
                        </div>
                    )}
                </li>
                <li className="row to">
                    <div className="copy-container">
                        <button onClick={handleCopyClick} className="copy-button">
                            {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                        </button>
                    </div>
                    {copied && (
                        <div className="copy-popup">
                            <p>Copied!</p>
                        </div>
                    )}
                </li>
            </ul> */}
            <button onClick={translate}>Translate</button>
        </div>
    );
}

export default Translate;
