import axios from 'axios';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import UserInfo from '../Profil/UserInfo';
import {Switch} from '@mui/material';
import { EditoHistory } from '../../actions/admin.action';

export default function Editor({ edito }) {

    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(edito ? edito.title : "");
    const [text, setText] = useState(edito ? edito.body : "");
    const [isPublish, setIsPublish] = useState(edito ? edito.isPublish : false);

    //eslint-disable-next-line
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
                edito: text,
                author: userData.username,
                isPublish,

            }

        if(edito) {
            await axios({
                method: 'put',
                url: `${process.env.REACT_APP_API_URL}/api/edito/${edito._id}/edit`,
                withCredentials: true,
                data
            }).then((res) => {
                    console.log(res.data);
                    if (res.data.errors) 
                        return error.innerHTML = res.data.errors.title;
                    setLink(res.data._id);
                    setIsPost(true);
                    dispatch(EditoHistory());
                }).catch((err) => {
                    error.innerHTML = "Une erreur est survenue ! Si vous pensez que cela est un bug merci de contacter un administrateur";
                    console.log(err);
                })
        } else {
            await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/edito/post`,
                withCredentials: true,
                data
            }).then((res) => {
                    console.log(res.data);
                    if (res.data.errors) 
                        return error.innerHTML = res.data.errors.title;
                    setLink(res.data._id);
                    setIsPost(true);
                    dispatch(EditoHistory());
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
                <p className="sucess">Edito Edited !</p>
            )}
            <p className="errors error"></p>
            <div className="group">
            {edito && ( <Switch onChange={(e) => setIsPublish(e.target.checked)} checked={isPublish} name='isPublish' /> )}
            <input type="text" name="title" id="title" className="title" placeholder="Titre de l'article" onChange={(e) => setTitle(e.target.value)} value={title}/> <p className="button" onClick={handlePost}>Send</p>
            </div>
            <ReactQuill onChange={handleChange} modules={modules} value={text} theme={'snow'}></ReactQuill>
            <p className="editor-foot">Ecrit par : <UserInfo username={userData.username} withBadges userPic="med" /></p>
        </div>
    )
}
