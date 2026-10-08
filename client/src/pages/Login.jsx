import React from 'react'
import { useDispatch } from 'react-redux'
import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../../utils/fireBase.js'
import axiosInstance from '../../utils/axios.js'
import { setUser } from '../redux/userSlice.js'
import { FaGoogle } from 'react-icons/fa'


const Login = () => {

    // let {user, isLoading} = useSelector((state) => state.user)
    
        let dispatch = useDispatch()
    
        // console.log("Current user from Redux:", user)
    
         const googleLogin = async () => {
            try {
              const data = await signInWithPopup(auth, googleProvider)
        
              console.log("Firebase data:", data)
        
              const token = await data.user.getIdToken()
        
            //   console.log("Firebase token:", token)
        
              await handleLogin(token)
        
            } catch (error) {
              console.log(error)
            }
          }
        
          const handleLogin = async (token) => {
            try {
              console.log("Sending token to backend:", token)
              const response = await axiosInstance.post(
                "/api/auth/login",
                { token }
              )
              dispatch(setUser(response.data.user))
        
        
              console.log("Backend response:", response.data)
        
            } catch (error) {
              console.log(error)
            }
          }
  return (
    <div className="w-full h-screen bg-[#0d0f14] overflow-hidden text-white">


      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5">

          <div className="flex flex-col gap-1">
            <h2 className="text-[17px] font-semibold text-slate-100">
              Welcome to the Kodex-Mini
            </h2>

            <p className="text-[13px] text-slate-500">
              Please Login to continue using the app
            </p>
          </div>

          <button
            onClick={googleLogin}
            className="bg-white flex text-black/80 justify-center items-center gap-3 cursor-pointer hover:text-black font-semibold py-2 px-4 rounded-md"
          >
            <FaGoogle size={20} />
            Login with Google
          </button>

        </div>
      </div>

</div>
)
}

export default Login