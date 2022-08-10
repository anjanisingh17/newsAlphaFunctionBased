import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

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

     capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
      
        constructor(props){
            super(props);
            console.log('Inside constructor body');
            this.state = {
                    articles : [],
                    loading : false,
                    page: 1,
                    totalResults: 0
            }
            document.title = `AlphaNews - ${this.capitalizeFirstLetter(this.props.category)} `
        }    

        async componentDidMount(){
            this.props.setProgress(10)
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=1&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            this.props.setProgress(40)
            let parsedData = await data.json();
            this.props.setProgress(60)

            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false
            })
            this.props.setProgress(100)
        }

        //handlePrevClick funciton
        handlePrevClick = async()=>{
            console.log('Prev')
            this.props.setProgress(10)
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            this.props.setProgress(40)
            let parsedData = await data.json();
            this.props.setProgress(60)
           
            this.setState({
                page: this.state.page-1,
                articles: parsedData.articles,
                loading: false
            })
            this.props.setProgress(100)
        }
        
        handleNextClick = async()=>{
            console.log('Next')
            this.props.setProgress(10)
            if(!(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize) )){

           
                let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
               this.setState({loading:true})
                let data = await fetch(url);
                this.props.setProgress(40)
                let parsedData = await data.json();
                this.props.setProgress(60)
               
                this.setState({
                    page: this.state.page + 1,
                    articles: parsedData.articles,
                    loading: false
                })
            }
            this.props.setProgress(100)

        }

        //fetch more funciton 
        fetchMoreData = async() => {

          this.setState({       page: this.state.page+1 })
          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api_key}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data = await fetch(url);
            let parsedData = await data.json();

            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
                loading: false
            })



        };


  render() {
    return (
      <>
      {this.state.loading &&  <Spinner />}
    <div className='container'>
 <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
  >
     <div className='container'>
     <div className='row'>  
        {this.state.articles.map((curElement,index)=>{
            return(        
              <NewsItem key={index} title={curElement.title?curElement.title.slice(0,50):"This is title"} description={curElement.description?curElement.description.slice(0,80):"This is description for the above title please read full news by read more"} imgurl={curElement.urlToImage?curElement.urlToImage:'https://thumbs.dreamstime.com/b/news-newspapers-folded-stacked-word-wooden-block-puzzle-dice-concept-newspaper-media-press-release-42301371.jpg'} newsurl={curElement.url} publishedAt={curElement.publishedAt.slice(0,10)} author={curElement.author?curElement.author.split(",").slice(0,1).join(","):'Anonymous'} source={curElement.source.name} />
            )    
        })}
     </div>
     </div>
  </InfiniteScroll>
        
    </div>

      </>  
    )
  }
}

export default News