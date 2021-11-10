import React, { useEffect, useState } from 'react';
import UserInfo from '../Profil/UserInfo';
import { isEmpty } from '../Utils';
import Comment from './Comment';
import LikeArticleButton from './LikeArticleButton';

export default function ArticleView(props) {
		
	const [isLoading, setIsLoading] = useState(true);
	const [isOpen, setIsOpen] = useState(false);

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
				setIsLoading(false);
			}
		}, [props, isLoading]);
		
		return (
				<div className="article">
								{!isLoading && (
									<div className="content">
										<div className="head">
												<h1 className="title">{props.article.title}</h1>
										</div>
										{cut === "full" ? (
											<div className="body" dangerouslySetInnerHTML={{__html: content}}></div>
										): (
											<>
												<div className="body" dangerouslySetInnerHTML={{__html: content.slice(0, cut) + " ..."}}></div>
												<p className="button" onClick={() => window.location = '/article/' + props.article._id}>Lire la suite</p>
											</>
										)}
										<div className="footer">
											Ecrit par : <UserInfo username={props.article.author} linked withBadges/>
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
