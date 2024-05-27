import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignUp() {

    const [formData, setFormData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });

        //console.log(e.target.id);

    }

    const handleSubmit = async (e) => {
        e.preventDefault(); //to not refresh page

        try {
            setError(false);
            setLoading(true);
            const res = await fetch("/api/auth/signup ", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            setLoading(false);

            if (data.success === false) {
                setError(true);
                return;
            }
            navigate("/sign-in");

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input required type="text" aria-label='username' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
                <input required type="email" aria-label='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
                <input required type="text" aria-label='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? "Loading..." : "sign up"}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Have an account?</p>
                <Link to="/sign-in">
                    <span className='text-blue-500'>Sign in</span>
                </Link>
            </div>
            <p className='text-red-700 mt-5'>{error && "Something went wrong or user already signed up!"}</p>
        </div>
    )
}

export default SignUp