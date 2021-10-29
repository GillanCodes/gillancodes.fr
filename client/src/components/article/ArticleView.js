import React from 'react';

export default function ArticleView(props) {
    

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
    
    return (
        <div className="article">
                <div className="content">
                    <div className="head">
                        <h1 className="title">{props.article.title}</h1>
                    </div>
                    <div className="body" dangerouslySetInnerHTML={{__html: sanitize(props.article.body)}}>
                    </div>
                    <div className="footer">
                        {props.article.author}
                    </div>
                </div>
        </div>
    )
}
