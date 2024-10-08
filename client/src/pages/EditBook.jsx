import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from 'notistack'

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert('An error occured. Please check console.');
      })
  }, [])




  const handleEditBook = () => {
    const data = {
      title, 
      author,
      publishYear
    };
    setLoading(true);

    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully!', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        // alert('An error occured. Please check console.');
        enqueueSnackbar('An error occured.', { variant: 'error' });
      })
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {loading ? <Spinner /> : ''}

      <div className="flex flex-col border-2 border-blue-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input type="text" 
                 className="border-2 border-gray-500 px-4 py-2 w-full"
                 value={title} 
                 onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input type="text" 
                 className="border-2 border-gray-500 px-4 py-2 w-full"
                 value={author} 
                 onChange={(e) => setAuthor(e.target.value)}/>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input type="number" 
                 className="border-2 border-gray-500 px-4 py-2 w-full"
                 value={publishYear} 
                 onChange={(e) => setPublishYear(e.target.value)}/>
        </div>
        <button className="p-2 bg-blue-500 m-8" onClick={handleEditBook}>Save</button>
      </div>
    </div>
  )
}

export default EditBook
