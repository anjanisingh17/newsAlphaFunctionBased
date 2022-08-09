import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {
    
    static defaultProps = {
        country: 'in',
        pageSize: 5,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

        constructor(){
            super();
            console.log('Inside constructor body');
            this.state = {
                    articles : [],
                    loading : false,
                    page:1,

            }
        }    

        async componentDidMount(){
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b48e87da9b24524ab043a49ba5b8422&page=1&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let result = await data.json();
            console.log(result);   
            let total_result = result.totalResults;
            console.log('total',total_result);

            this.setState({
                articles: result.articles,
                totalArticles: total_result,
                loading: false
            })
        }

        //handlePrevClick funciton
        handlePrevClick = async()=>{
            console.log('Prev')

            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b48e87da9b24524ab043a49ba5b8422&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let result = await data.json();
           
            this.setState({
                page: this.state.page-1,
                articles: result.articles,
                loading: false
            })
        }
        
        handleNextClick = async()=>{
            console.log('Next')

            if(!(this.state.page+1 > Math.ceil(this.state.totalArticles/this.props.pageSize) )){

           
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=0b48e87da9b24524ab043a49ba5b8422&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
               this.setState({loading:true})
                let data = await fetch(url);
                let result = await data.json();
               
                this.setState({
                    page: this.state.page + 1,
                    articles: result.articles,
                    loading: false
                })
            }


        }


  render() {
    return (
      <>
      {this.state.loading &&  <Spinner />}
    <div className='container'>
     <div className='row'>  

  {!this.state.loading &&  this.state.articles.map((curElement,index)=>{

      return(
        
        <NewsItem key={index} title={curElement.title?curElement.title.slice(0,50):"This is title"} description={curElement.description?curElement.description.slice(0,80):"This is description for the above title please read full news by read more"} imgurl={curElement.urlToImage?curElement.urlToImage:'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} newsurl={curElement.url} publishedAt={curElement.publishedAt.slice(0,10)} author={curElement.author?curElement.author.split(",").slice(0,1).join(","):'Anonymous'} source={curElement.source.name} />

      )
    
  })}

     </div> 
        <div className='container d-flex justify-content-between my-4'>
          <button disabled={this.state.page <=1 } type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page+1 > Math.ceil(this.state.totalArticles/5) } type="button" className="btn btn-dark" onClick={this.handleNextClick}>  Next &rarr;</button>
        </div>
    </div>

      </>  
    )
  }
}

export default News