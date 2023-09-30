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

    const handleCopyClick = () => {
        navigator.clipboard.writeText(input).then(() => {
            setCopied(true);

            // Clear the "Copied" message after a few seconds
            setTimeout(() => {
                setCopied(false);
            }, 2000);
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
                <select onChange={(e) => setFrom(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                <span className="arrow">➜</span>
                <select onChange={(e) => setTo(e.target.value)}>
                    {options.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                            {opt.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="text-container">
                <div className="text-box">
                    <textarea
                        cols="40"
                        rows="7"
                        placeholder="Enter Text...."
                        onInput={(e) => setInput(e.target.value)}
                    ></textarea>
                </div>
                <div className="text-box">
                    <textarea cols="40" rows="7" placeholder="Translation..." value={output}></textarea>
                </div>
            </div>
            <button onClick={translate}>Translate</button>
        </div>
    );
}

export default Translate;
