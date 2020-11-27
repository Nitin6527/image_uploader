import React,{useState,useEffect} from 'react';
import axios from "../axios";
import './GetImages.css';


function GetImages() {
const [images , setImages] = useState([]);
const [preview, setPreview] = useState();

const baseUrl='https://blooming-castle-42959.herokuapp.com/'
    useEffect(() => {
        async function fetchData() {
          const request =await axios.get('/getImages');
          console.log(request);
          setImages(request.data);
          return request;
        }
        fetchData();
      }, []);

    return (
        <div className="GetImages_container">
           <h1>All Images</h1>
           <div className="all_images">
           {images.map((image) => (
          <img className="get_images"
            src={`${baseUrl}/${image.postImage}`}
          />
        ))}
           </div>
        
        </div>
    )
}
export default GetImages
