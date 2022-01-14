import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../module/Loading';
import UserInfo from '../Profil/UserInfo';
import { isEmpty, timestampParser } from '../Utils';

export default function ArticleView(props) {
		
	const [isLoading, setIsLoading] = useState(true);
	// eslint-disable-next-line
	const [isAuthor, setisAuthor] = useState(false); 

	// eslint-disable-next-line
	const userData = useSelector(state => state.userReducer);


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


		const content = sanitize(props.edito.body);

		useEffect(() => {
			if (!isEmpty(props)){
				if (!isEmpty(userData)) {
					if (userData.username === props.edito.author ||userData.permissions.ADMIN) {
						setisAuthor(true);
					}
				}
				setIsLoading(false);
			}
		}, [props, isLoading, userData]);
		
		return (
				<div className="article" id={props.edito.title}>
								{!isLoading && (
									<div className="content">
										<div className="article-head">
												<h1 className="title">{props.edito.title} {props.edito.isEdited && (<i className="fas fa-reply-all edit-icon" data-tip="Edited"></i>)}</h1>
												{!props.edito.isPublish && !props.edito.isDelete && (<p className="error"><i className="fas fa-upload"></i> Unpublished Article</p>	)}	
										</div>
										<div className="article-body" dangerouslySetInnerHTML={{__html: content}}></div>
							
										<div className="article-footer">
											<div className="author">
												<p>Ecrit par : </p> <UserInfo username={props.edito.author} linked withBadges userPic="extra-small" />
											</div>
											<div className="timestamp">
												{props.edito.isEdited ? (
													<p>{timestampParser(props.edito.updatedAt)}</p>
												) : (
													<p>{timestampParser(props.edito.createdAt)}</p>
												)}
											</div>
									</div>
								</div>
								)}

								{isLoading && (
									<Loading />
								)}
				</div>
		)
}
