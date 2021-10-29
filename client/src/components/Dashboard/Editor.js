import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function Editor() {

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleChange = (value) => {
        setText(value);
    }

    const handlePost = () => {

        console.log(text)

    }

    return (
        <>
            <input type="text" name="title" id="title" onChange={(e) => setTitle(e.target.value)}/>
            <ReactQuill onChange={handleChange}></ReactQuill>
            <p className="button" onClick={handlePost}>
                Sand
            </p>
        </>
    )
}
