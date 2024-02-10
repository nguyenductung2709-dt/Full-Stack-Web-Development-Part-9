import React, { useState } from 'react';
import {Diary} from '../App';
import axios from 'axios';

const DiaryForm = () => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');

    const diaryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const newDiary = {
            weather: weather,
            visibility: visibility,
            date: date,
            comment: comment,
        }
        axios.post<Diary>("http://localhost:3000/api/diaries", newDiary).then(
            response => {
                console.log(response.data);
            }
        )
        setDate('');
        setVisibility('');
        setWeather('');
        setComment('');
    }

    return (
        <>
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
