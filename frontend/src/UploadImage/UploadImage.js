import React,{useState,useEffect, Component} from 'react';
import './UploadImage.css';
import axios from "../axios";
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import Images from '../GetImages/GetImages';


function UploadImage() {
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }

    const mySubmitHandler = () =>{
        if(selectedFile){
            const fd = new FormData();
            console.log(preview)
            console.log(selectedFile.name)
            fd.append('photo',selectedFile,selectedFile.name)
            axios.post('/postImage',fd).then((response)=>{
                console.log(response);
              });
        }
        else{
            return setPreview(undefined)
        }    
    }

    if(selectedFile){
        console.log(selectedFile.name)

    }
 

    return (
        <Router>
            
        <div className="image_upload_container">
            <form>
            <div  className="button_container">
            <label className="button">
                <span>Choose file</span>
            <input className="inputButton"  name="photo" accept="image/*" type='file' onChange={onSelectFile} />
            </label>
            <button className="button" src=""><Link className="link" to="/all_images">All Images</Link></button>
            </div>
            {selectedFile &&  <img className="image_preview" src={preview} /> }
            {selectedFile ? (
            <button className="button submit" onClick={mySubmitHandler} type="submit">Submit</button>
            ):(<div hidden></div>)}
          
            </form>
            <Route exact path="/all_images" component={Images} /> 
        </div>
        </Router>
    )
}

export default UploadImage
