import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
    
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  

     const capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
        

        const updateNews = async()=>{
          props.setProgress(10)
          let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page}&pageSize=${props.pageSize}`;
          setLoading(true)
          let data = await fetch(url);
          props.setProgress(40)
          let parsedData = await data.json();
          props.setProgress(60)

          setArticles(parsedData.articles);
          setTotalResults(parsedData.totalResults);
          setLoading(false)
          props.setProgress(100)
        }


        
        
        useEffect(()=>{
          document.title = `AlphaNews - ${capitalizeFirstLetter(props.category)} `
          updateNews();
          // eslint-disable-next-line
        },[])



        // //handlePrevClick funciton
        // const handlePrevClick = async()=>{
        //     console.log('Prev')
        //     setPage(page-1)
        //     updateNews();
        // }
        
        //  const handleNextClick = async()=>{
        //   console.log('Next')
        //   setPage(page+1)
        //   updateNews();

        // }

        //fetch more funciton 
        const fetchMoreData = async() => {

          const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api_key}&page=${page+1}&pageSize=${props.pageSize}`;
          setPage(page+1)
          setLoading(true)
            let data = await fetch(url);
            let parsedData = await data.json();
            setArticles(articles.concat(parsedData.articles));
            setTotalResults(parsedData.totalResults);
        };

    return (
      <>
      {loading &&  <Spinner />}
    <div className='container'>
 <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
  >
     <div className='container'>
     <div className='row'>  
        {articles.map((curElement,index)=>{
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

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News


