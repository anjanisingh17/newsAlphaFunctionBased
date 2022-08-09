import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {

    let {title,description,imgurl,newsurl,publishedAt,author,source} = this.props;

    return (
        <div className="col-lg-4 col-md-4 col-sm-1 card-group my-3" >
        <div className="card">
          <img src={imgurl} className="card-img-top" alt="..." width="250px" height="300px" />
          <div class='text-box'>
            <p class='dataNumber'> {source} </p>
          </div>
          <div className="card-body">
              <h5 className="card-title">{title} ...</h5>
              <p className="card-text">{description} ...</p>
              <a href={newsurl} rel='noreferrer' className='btn btn-sm btn-primary' target='_blank'>Read More</a>
          </div>
          <div className="card-footer">
            <small className="text-muted"><div className='date_div' style={{float:'left',color:'#fff',background:'#000',padding:'5px 20px'}}>  {publishedAt} </div> <div className='author_div' style={{float:'right',color:'#fff',background:'#7c0707b8',padding:'5px 15px'}}>Author: {author}</div> </small>
          </div>
        </div>  

      </div>   
    )
  }
}

export default NewsItem