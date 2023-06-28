import React, { Component } from 'react'
export default class NewsItem extends Component {
  render() {
    const {title,description,imageUrl,newsUrl,author,source} =this.props;
    return (
      <div className = 'my-3'>
        <div className="card" style={{background:'grey'}}>
          <div style={
            {
              display:'flex',
              justifyContent:'flex-end',
              position:'absolute',
              right:'0'
            }
          }>
        <span className= "badge rounded-pill bg-danger">
    {source}
    </span>
    </div>
  <img src={imageUrl?imageUrl:'https://media.istockphoto.com/id/1312418309/photo/visual-contents-concept-social-networking-service-streaming-video-communication-network-3d.jpg?b=1&s=170667a&w=0&k=20&c=1qA-cf6H5YbYQflRdSpwgUAT9SGZJjUEvDfIaUkS9SQ='} height='250'className="card-img-top" alt="..."/>
  <div className="card-body">
  < h5 className="card-title" style={{color:'white'}}>{title}
 
  </h5>
    <p className="card-text" >{description}....</p>
    <p className="card-text"><small className="text-warning">By {author?author:'Unknown'}</small></p>
    <a href = {newsUrl} target='_blank'rel='noreferrer' className="btn btn-sm btn-danger">Read more</a>
  </div>
</div>
      </div>
    )
  }
}
