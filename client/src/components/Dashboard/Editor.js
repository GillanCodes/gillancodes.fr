import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import UserInfo from '../Profil/UserInfo';
import {Switch} from '@mui/material';

export default function Editor({ article }) {

    const userData = useSelector(state => state.userReducer);

    const [title, setTitle] = useState(article ? article.title : "");
    const [text, setText] = useState(article ? article.body : "");
    const [isPublish, setIsPublish] = useState(article ? article.isPublish : false);

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
                isPublish
            }

        if(article) {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/api/article/${article._id}/edit`,
                withCredentials: true,
                data
            }).then((res) => {
                    console.log(res.data);
                    if (res.data.errors) 
                        return error.innerHTML = res.data.errors.title;
                    setLink(res.data._id);
                    setIsPost(true);
                    
                }).catch((err) => {
                    error.innerHTML = "Une erreur est survenue ! Si vous pensez que cela est un bug merci de contacter un administrateur";
                    console.log(err);
                })
        } else {
            await axios
                .post(`${process.env.REACT_APP_API_URL}/api/article/post`, data)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.errors) 
                        return error.innerHTML = res.data.errors.title;
                    setLink(res.data._id);
                    setIsPost(true);
                    
                }).catch((err) => {
                    error.innerHTML = "Une erreur est survenue ! Si vous pensez que cela est un bug merci de contacter un administrateur";
                    console.log(err);
                })
        }
    }

    const modules = {
        toolbar: [
          [{ 'header': [1,2,3,4,5,6,false]}],
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
            {article && ( <Switch onChange={(e) => setIsPublish(e.target.checked)} checked={isPublish} name='isPublish' /> )}
            <input type="text" name="title" id="title" className="title" placeholder="Titre de l'article" onChange={(e) => setTitle(e.target.value)} value={title}/> <p className="button" onClick={handlePost}>Send</p>
            </div>
            <ReactQuill onChange={handleChange} modules={modules} value={text} theme={'snow'}></ReactQuill>
            <p>Ecrit par : <UserInfo username={userData.username} withBadges userPic="big" /></p>
        </div>
    )
}
