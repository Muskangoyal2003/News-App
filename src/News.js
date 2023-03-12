import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js'
import PropTypes from 'prop-types'


export default class News extends Component {
  // articles = [
  //   {
  //     "source": {
  //       "id": "bbc-sport",
  //       "name": "BBC Sport"
  //     },
  //     "author": null,
  //     "title": "Yorkshire racism hearing terrible look - Vaughan",
  //     "description": "Former England captain Michael Vaughan says the disciplinary hearing into allegations of racism at Yorkshire is a \"terrible look\" for cricket.",
  //     "url": "http://www.bbc.co.uk/sport/cricket/64832070",

  //     "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/F9D1/production/_128835936_vaughan.jpg",
  //     "publishedAt": "2023-03-04T03:37:13.1311576Z",
  //     "content": "Former England captain Michael Vaughan is the only person charged by the ECB to attend the hearing\r\nFormer England captain Michael Vaughan says the disciplinary hearing into allegations of racism at … [+6556 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
  //     "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
  //     "publishedAt": "2020-04-27T11:41:47Z",
  //     "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
  //   },
  //   {
  //     "source": {
  //       "id": "espn-cric-info",
  //       "name": "ESPN Cric Info"
  //     },
  //     "author": null,
  //     "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
  //     "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
  //     "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
  //     "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
  //     "publishedAt": "2020-03-30T15:26:05Z",
  //     "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
  //   }
  // ]
  static defaultProps = {
    country:'in',
    pageSize: 12,
    category:'general'
  }
  static propTypes = {
   country: PropTypes.string,
   pageSize: PropTypes.number,
   category:PropTypes.string
  }
  capitalize =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }

  constructor(props) {
    super(props);
    // console.log('good day')
    this.state = {
      // articles: this.articles
      articles:[],
      loading:false,
      page:1}
      document.title = `${this.capitalize(this.props.category)}-NewsMonkey`;
  }
   async componentDidMount(){
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae41f002806c4376b2952fed15168d7c&page=1&pageSize= ${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,totalResults: parsedData.totalResults,loading:false});
  }
   handlePrevClick =async()=>{
    console.log('Previous');
    let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae41f002806c4376b2952fed15168d7c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({articles: parsedData.articles,
      page:this.state.page-1,
      loading:false
    });  
  }
  handleNextClick = async()=>{
   console.log('Next');
   if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
   let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ae41f002806c4376b2952fed15168d7c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
   this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({articles: parsedData.articles,
      page:this.state.page+1,
      loading:false
    });
  }
  }               
  render() {
   // console.log('hola');
    return (
      <div className='container my-2' >
        <h1 className ='text-center'  style=  {{margin: '30px 0px',color:'black',marginTop:'90px'}}>NewsBasket - Top {this.capitalize(this.props.category)} News</h1>
        {this.state.loading&&<Spinner/>}
        < div className="row">
          {!this.state.loading&&this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title.slice(0,45):''} description={element.description?element.description.slice(0,65):''} imageUrl={element.urlToImage} newsUrl={element.url} 
              author={element.author} date={element.pubishedAt} source={element.source.name}/>
            </div> 
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled ={this.state.page<=1} type="button" className='btn btn-outline-secondary' onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className='btn  btn-outline-secondary' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    ) 
  }
}

