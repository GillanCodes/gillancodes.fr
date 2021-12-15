import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
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
				<div className="article">
								{!isLoading && (
									<div className="content">
										<div className="article-head">
												<h1 className="title">{props.article.title}</h1>
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
														<i className="fas fa-edit" data-tip="Modifier l'article" onClick={() => window.location = `/dashboard/article/${props.article._id}` }></i>
														<i className="fas fa-edit" data-tip="Supprimer l'article" onClick={() => window.location = `/dashboard/article/${props.article._id}` }></i>
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
