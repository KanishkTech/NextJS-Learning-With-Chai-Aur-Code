"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';


const page = () => {
    const router =useRouter();
    const [user,setuser]=useState({
        email:'',
        password:'',
    })
    const [loading,setLoading] = useState(false)
    const [buttonDisable,setButtonDisable] = useState(false)
    const onLogin = async() =>{
      try {
          setLoading(true)
        //   setButtonDisable(true)
         const response =await axios.post("/api/users/login",user)
        console.log("Login successfully",response.data)
        toast.success('Login successful')
        router.push("/profile")   
      } catch (error:any) {
        console.log("error : ",error);
        toast.error(error.message);
      }
    }
    useEffect(()=>{
        if(user.email.length>0 &&user.password.length>0){
            setButtonDisable(false)
        }else{
            setButtonDisable(true)
        }
    },[user])
  return (
    <>
        <div className="w-full h-screen bg-zinc-900 text-stone-100">
            <div className="flex justify-center items-center h-screen">
                <div className="border p-10 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center mb-5">{loading ? "Processing...":"Login"}</h1>
                    <div className='flex justify-center items-center w-96'>
                        <div className='w-full flex flex-col gap-3 justify-center items-center'>
                            
                            <input type="email" className='bg-zinc-800 px-2 py-2 rounded-lg focus:outline-none ' id='email' value={user.email} onChange={(e)=>{setuser({...user,email:e.target.value}) }} placeholder='Enter Email' />
                            <input type="password" className='bg-zinc-800 px-2 py-2 rounded-lg focus:outline-none ' id='password' value={user.password} onChange={(e)=>{setuser({...user,password:e.target.value}) }} placeholder='Enter Password' />
                            {/* <input type="button" value="Submit" className='bg-green-700 text-white px-3 py-2 cursor-pointer rounded-md' /> */}
                            <button className='bg-green-700 text-white px-4 py-2 cursor-pointer rounded-md' onClick={onLogin}>{buttonDisable?"fill Details":"Login"}</button>
                            <Link className='opacity-50 underline decoration-green-700' href="/signup">Visit signup page</Link>

                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default page