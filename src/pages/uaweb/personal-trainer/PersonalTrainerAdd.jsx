import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, savePersonalTrainer } from '../../../features/personalTrainerSlice';
import Dashboard from '../../components/Dashboard'
import InputModel1 from '../../components/InputModel1';
import TextEditor from '../../components/TextEditor';

function PersonalTrainerAdd() {
  const { isError, isSuccess, isLoading, massage } = useSelector(
    (state) => state.personalTrainers
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [clubId, setClubId] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState('');

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  }

  useEffect(() => {
    if(isSuccess) {
      navigate('/uaweb/personal-trainer');
    }
  }, [navigate, dispatch, isSuccess])

  const savePt = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("clubId", clubId);
    formData.append("file", file);
    await dispatch(savePersonalTrainer(formData));
  }

  return (
    <Dashboard>
      {/* Dashboard actions */}
      <div className="col-span-full xl:col-span-8 bg-white shadow-lg rounded-md border border-slate-200">
        <header className="px-5 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-800 text-xl">Add Personal Trainer</h2>
        </header>
        <div className="py-3 px-4">
          <div className="max-w-3xl pb-8">
            {isError && <p className="text-center mt-2">{massage}</p>}
            <form onSubmit={savePt}>
              <InputModel1 label="Name" type="text" name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}} />
              <div className="pt-4 my-2">
                <label className="flex items-center space-x-4">
                  <span className="min-w-max">Select Club</span>
                  <select onChange={(e) => {setClubId(e.target.value);}} className="px-2 w-full bg-transparent focus:ring-0 border-0 border-b text-black focus:border-black">
                    <option >Select Club</option>
                    <option value="1">HO</option>
                    <option value="2">Merr</option>
                    <option value="3">Marvell</option>
                    <option value="4">Tidar</option>
                    <option value="5">Lenmarc</option>
                  </select>
                </label>
              </div>
              <div className="pt-4 my-2">
                <label className="flex items-center space-x-4">
                  <span className="min-w-max">Image</span>
                  <input type="file" name="file" id="file" onChange={loadImage} className="px-2 w-full bg-transparent focus:ring-0 border-0 border-b text-black focus:border-black" />
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
              {/* <div>
                {description}
              </div> */}
              <div className="my-4">
                <button className="px-4 py-1 bg-green-500 text-white rounded" type="submit">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Dashboard>
  )
}

export default PersonalTrainerAdd