import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { getArticles } from '../../actions/article.action';
import UserInfo from '../Profil/UserInfo';
import { isEmpty } from '../Utils';
import Comment from './Comment';
import LikeArticleButton from './LikeArticleButton';

export default function ArticleView(props) {
		
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);
	// eslint-disable-next-line
	const [isAuthor, setisAuthor] = useState(false); 

	// eslint-disable-next-line
	const userData = useSelector(state => state.userReducer);
	const dispatch = useDispatch();

		const cut = props.cutter ? props.cutter : "full";

		const sanitize = (input) => {
				const doc = new DOMParser().parseFromString(input, 'text/html');
				for (const elm of doc.querySelectorAll('*')) {
					for (const attrib of elm.attributes) {
						if (attrib.name.startsWith('on')) {
							elm.removeAttribute(attrib.name);
						}
					}
				}
				return doc.body.innerHTML;
		};

		const statePublish = () => {
				axios({
					method: "put",
					url: `${process.env.REACT_APP_API_URL}/api/article/${props.article._id}/publish/`,
					data : {
						isPublish: !props.article.isPublish
					},
					withCredentials: true
				}).then((res) => {
					dispatch(getArticles());
				}).catch((err) => console.log(err));
			

		}

		const content = sanitize(props.article.body);

		useEffect(() => {
			if (!isEmpty(props)){
				if (!isEmpty(userData)) {
					if (userData.username === props.article.author ||userData.permissions.ADMIN) {
						setisAuthor(true);
					}
				}
				setIsLoading(false);
			}
		}, [props, isLoading, userData]);
		
		return (
				<div className="article" id={props.article.title}>
								{!isLoading && (
									<div className="content">
										<div className="article-head">
												<h1 className="title">{props.article.title} {props.article.isEdited && (<i className="fas fa-reply-all edit-icon" data-tip="Edited"></i>)}</h1>
												{props.article.isDelete && (<p className="error"><i className="fas fa-backspace"></i> Delete Article</p>)}
												{!props.article.isPublish && !props.article.isDelete && (<p className="error"><i className="fas fa-upload"></i> Unpublished Article</p>	)}	
										</div>
										{cut === "full" ? (
											<div className="article-body" dangerouslySetInnerHTML={{__html: content}}></div>
										): (
											<>
												<div className="body" dangerouslySetInnerHTML={{__html: content.slice(0, cut) + " ..."}}></div>
												<p className="button" onClick={() => window.location = '/article/' + props.article._id}>Lire la suite</p>
												
											</>
										)}
										<div className="article-footer">
											<div className="author">
												<p>Ecrit par : </p> <UserInfo username={props.article.author} linked withBadges userPic="extra-small" />
											</div>
											<div className="menus">
												<div className="menu">
													{isOpen === false && (
														<i className="far fa-comments" onClick={(e)=> setIsOpen(!isOpen)}></i>
													)}
														
													{isOpen === true && (
														<i className="fas fa-comments" onClick={(e)=> setIsOpen(!isOpen)}></i>
													)}
													<LikeArticleButton article={props.article} />
													<i className="fas fa-share-square"></i>
												</div>
												{isAuthor && (
													<div className="admin menu">
														<i className="fas fa-pencil-alt" data-tip="Modifier l'article" onClick={() => window.location = `/dashboard/article/${props.article._id}` }></i>
														<i className="fas fa-trash-alt" data-tip="Supprimer l'article" onClick={() => window.location = `/dashboard/article/${props.article._id}/delete` }></i>
														{props.article.isPublish ? (
															<i className="fas fa-upload error" data-tip="Unpublish Article" onClick={() => statePublish()}></i>
														) : (
															<i className="fas fa-upload sucess" data-tip="Publish Article" onClick={() => statePublish()}></i>
														)}
														<ReactTooltip place="top"/>
													</div>
													
													)}
												
											</div>

										
									</div>
									{isOpen && (
										<Comment article={props.article} />
									)}
								</div>
								)}

								{isLoading && (
									<h1>Load !</h1>
								)}
				</div>
		)
}
