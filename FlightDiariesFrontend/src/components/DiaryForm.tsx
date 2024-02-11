import React, { useState } from 'react';
import Notification from './Notification';
import { Diary } from '../App';
import axios from 'axios';

export interface Message {
    message: string;
    className: string;
}

const DiaryForm = () => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    const diaryCreation = (event: React.FormEvent) => {
        event.preventDefault();
        const newDiary = {
            weather: weather,
            visibility: visibility,
            date: date,
            comment: comment,
        };
        axios.post<Diary>("http://localhost:3000/api/diaries", newDiary)
            .then(response => {
                console.log(response.data);
                setMessage("Diary entry added successfully!");
                setTimeout(() => {
                    setMessage(''); 
                }, 2000);
            })
            .catch(error => {
                console.error('Error adding diary:', error);
                setMessage("Failed to add diary entry. Please try again.");
                setTimeout(() => {
                    setMessage(''); 
                }, 2000);
            });
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
    }

    return (
        <>
            {message && <Notification message={message} className={message === "Diary entry added successfully!" ? "success_message" : "error_message"} />}
            <h2> Add new entry </h2>
            <form onSubmit={diaryCreation}>
                <div>
                    date:
                    <input type="text" value={date} onChange={({ target }) => setDate(target.value)} />
                </div>
                <div>
                    visibility:
                    <input type="text" value={visibility} onChange={({ target }) => setVisibility(target.value)} />
                </div>
                <div>
                    weather:
                    <input type="text" value={weather} onChange={({ target }) => setWeather(target.value)} />
                </div>
                <div>
                    comment:
                    <textarea value={comment} onChange={({ target }) => setComment(target.value)} />
                </div>
                <button type='submit'>add</button>
            </form>
        </>
    );
}

export default DiaryForm;
