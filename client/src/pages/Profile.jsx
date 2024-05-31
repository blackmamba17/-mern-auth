import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../../firebase.js"
import { deleteUserFailure, deleteUserSuccess, deleteUserStart, updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

function Profile() {

    const { currentUser, loading, error, success } = useSelector(state => state.user);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const fileRef = useRef(null);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = () => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);


        setImageError(false);

        uploadTask.on(

            'state_changed',

            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setImagePercent(Math.round(progress));

            },

            (error) => {
                setImageError(true);
            },

            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({
                        ...formData,
                        profilePicture: downloadURL
                    });
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {

        dispatch(updateUserStart());


        e.preventDefault();
        try {
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }

            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error.data));
        }
    }

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }


            dispatch(deleteUserSuccess());
            alert("user has been deleted");


        } catch (error) {
            dispatch(deleteUserFailure(error.data));
        }
    }

    return (
        <div className='p-3 max-w-lg mx-auto '>

            <h1 className='text-3xl font-semibold text-center my-7 '>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input aria-label="file" onChange={(e) => setImage(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
                <img alt="profile" onClick={() => { fileRef.current.click() }} src={formData.profilePicture || currentUser.profilePicture} className=' mt-2 h-24 w-24 self-center cursor-pointer rounded-full object-cover' />
                <p className='self-center text-sm '>
                    {imageError ? (<span className='text-red-700'>error uploading image</span>) : (imagePercent > 0 && imagePercent < 100) ? (<span className='text-slate-700'>{`Uploading:  ${imagePercent}%`}</span>) : imagePercent ? <span className='text-green-700'>Image uploaded successfully</span> : ""}
                </p>
                <input onChange={handleChange} defaultValue={currentUser.username} type="text" aria-label="username" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3' />
                <input onChange={handleChange} defaultValue={currentUser.email} type="email" aria-label="email" id="email" placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
                <input onChange={handleChange} type="password" aria-label="password" id="password" placeholder='Password' className='bg-slate-100 rounded-lg p-3' />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "loading..." : "Update"}</button>
            </form>
            <div className='flex justify-between mt-5'>
                <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>

                <p className='text-green-700'>{success && "user updated successfully"}<p className='text-red-700'>{error && `error while updating profile: ${error}`}</p></p>
                <span className='text-red-700 cursor-pointer'>Sign Out</span>
            </div>
        </div>
    )
}

export default Profile