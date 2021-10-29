import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';

export default function Editor() {

    const userData = useSelector(state => state.userReducer);

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const [link, setLink] = useState("");
    const [isPost, setIsPost] = useState(false);

    const handleChange = (value) => {
        setText(value);
    }

    const handlePost = async () => {
        const error = document.querySelector('.errors');

        error.innerHTML = "";
        setLink('');
        setIsPost(false);

        if (!title) 
            error.innerHTML = "Le titre est vide !"
        if (!text) 
            error.innerHTML = "L'article est vide !"
        
        const data = {
                title: title,
                article: text,
                author: userData.username
            }

        await axios
            .post(`${process.env.REACT_APP_API_URL}/api/article/post`, data)
            .then((res) => {
                if (res.data.errors.title) 
                    return error.innerHTML = res.data.errors.title;
                setLink(res.data._id);
                setIsPost(true);
                
            }).catch((err) => {
                error.innerHTML = "Une erreur est survenue ! Si vous pensez que cela est un bug merci de contacter un administrateur"
            })
    }

    const modules = {
        toolbar: [
          [{ 'header': [1, 2,3,4,5,6, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          [{"script" : "sub"},{"script" : "super"}], 
          ['clean'],
        ],
      }

    return (
        <div className="editor">
            {isPost && (
                <a href={"/article/" + link} className="link sucess">Voir l'article !</a>
            )}
            <p className="errors error"></p>
            <div className="group">
            <input type="text" name="title" id="title" className="title" placeholder="Titre de l'article" onChange={(e) => setTitle(e.target.value)}/> <p className="button" onClick={handlePost}>Send</p>
            </div>
            <ReactQuill onChange={handleChange} modules={modules} theme={'snow'}></ReactQuill>
            
        </div>
    )
}
