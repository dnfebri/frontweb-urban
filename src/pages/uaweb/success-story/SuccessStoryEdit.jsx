import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dashboard from '../../components/Dashboard';
import InputModel1 from '../../components/InputModel1';
import TextEditor from '../../components/TextEditor';

function SuccessStoryEdit() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [massage, setMassage] = useState('');
  
  const [successStory, setSuccessStory] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const MySwal = withReactContent(Swal);

  const getStoryById = async() => {
    setIsLoading(true)
    try {
      const response = await axios.get( process.env.API_URL_APP + `success_story/${id}`);
      setSuccessStory(response.data);
      setName(response.data.name);
      setDescription(response.data.description);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setMassage(error.message)
      setIsLoading(false);
    }
  }

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  useEffect(() => {
    getStoryById()
  }, [])
  
  useEffect(() => {
    if(isSuccess) {
      MySwal.fire({
        position: 'top-end',
        icon: 'success',
        title: `${massage}`,
        showConfirmButton: false,
        timer: 3000
      })
      navigate('/uaweb/success-story');
    }
    if(isError) {
      MySwal.fire({
        position: 'top-end',
        icon: 'error',
        title: `${massage}`,
        showConfirmButton: false,
        timer: 3000
      })
    }
  }, [navigate, isSuccess, isError]);

  const putStory = async(form_data) => {
    setIsLoading(true);
    try {
      const response = await axios.put( process.env.API_URL_APP + `success_story/${id}`, form_data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setMassage(response.data.msg);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.log('error', error);
      setIsError(true);
      setMassage(error.response.data.msg);
      setIsLoading(false);
    }
  }

  const updateStory = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);
    putStory(formData);
  }

  return (
    <Dashboard>
      <div className="mx-4 mb-3">
        <button onClick={() => navigate(-1)} className="py-0.5 px-4 bg-neutral-300 hover:bg-neutral-400 text-black/70 font-bold rounded-lg">{`<- Back`}</button>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Success Story Edit</h2>
        </header>
        <div className="pb-3 px-2">
          <form onSubmit={updateStory}>
            <div className="grid md:grid-cols-2">
              <div className="p-2">
                <InputModel1 label="Name" type="text" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                <div className="pt-4 my-2">
                  <label className="flex items-center space-x-4">
                    <span className="min-w-max">Image</span>
                    <input type="file" name="file" id="file" onChange={loadImage} className="px-2 w-full bg-transparent focus:ring-0 border-0 border-b text-black dark:text-white focus:border-black" />
                  </label>
                </div>
              </div>
              <div className="p-2 max-h-80">
                <h2 className="mb-2">Preview Image :</h2>
                {preview ? (
                    <img src={preview} alt="Preview Image" className="h-full mx-auto" />
                ) : isLoading ? <h1>Loading...</h1> :
                <img src={successStory ? successStory.url : ''} alt="Preview Image" className="h-full mx-auto"/> }
              </div>
            </div>
            <div className="pt-4 my-2">
              <label className="">Description :</label>
              <TextEditor setValue={setDescription} value={description}/>
            </div>
            <div className="my-4">
              <button className="px-4 py-1 bg-green-500 text-white rounded" type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
    </Dashboard>
  )
}

export default SuccessStoryEdit