import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function SignIn() {

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
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            setLoading(false);

            if (data.success === false) {
                setError(true);
                return;
            }

            navigate("/");

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }

    }

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input required type="email" aria-label='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
                <input required type="text" aria-label='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? "Loading..." : "sign In"}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Dont have an account?</p>
                <Link to="/sign-up">
                    <span className='text-blue-500'>Sign up</span>
                </Link>
            </div>
            <p className='text-red-700 mt-5'>{error && "Something went wrong, maybe email or password incorrect!"}</p>
        </div>
    )
}

export default SignIn;