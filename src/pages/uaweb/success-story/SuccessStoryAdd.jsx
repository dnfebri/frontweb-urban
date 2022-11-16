import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Dashboard from '../../components/Dashboard';
import InputModel1 from '../../components/InputModel1';
import TextEditor from '../../components/TextEditor';

function SuccessStoryAdd() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [massage, setMassage] = useState('')

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');
  const MySwal = withReactContent(Swal);
  
  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  }
  
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

  const postStory = async(form_data) => {
    setIsLoading(true);
    try {
      const response = await axios.post( process.env.API_URL_APP + 'success_story', form_data, {
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

  const saveStory = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", file);
    postStory(formData);
  }

  return (
    <Dashboard>
      <div className="mx-4 mb-3">
        <button onClick={() => navigate(-1)} className="py-0.5 px-4 bg-neutral-300 hover:bg-neutral-400 text-black/70 font-bold rounded-lg">{`<- Back`}</button>
      </div>
      <div className="col-span-full xl:col-span-8 bg-white dark:bg-neutral-900 shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200 text-xl">Success Story Add</h2>
        </header>
        <div className="py-3 px-4">
          <div className="max-w-3xl pb-8">
            {isError && <p className="text-center mt-2">{massage}</p>}
            <form onSubmit={saveStory}>
              <InputModel1 label="Name" type="text" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}} />
              <div className="pt-4 my-2">
                <label className="flex items-center space-x-4">
                  <span className="min-w-max">Image</span>
                  <input type="file" name="file" id="file" onChange={loadImage} className="px-2 w-full bg-transparent focus:ring-0 border-0 border-b text-black focus:border-black dark:text-white" />
                </label>
              </div>
              <div className="pt-4 my-2">
                {preview ? (
                  <figure className="w-32">
                    <img src={preview} alt="Preview Image" />
                  </figure>
                ) : ""}
              </div>
              <div className="pt-4 my-2">
                <label className="">Description :</label>
                <TextEditor setValue={setDescription} />
              </div>
              <div className="my-4">
                <button className="px-4 py-1 bg-green-500 text-white rounded" type="submit" >
                  {isLoading ? 'Proses...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default SuccessStoryAdd