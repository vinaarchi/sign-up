"use client";

const Home = () => {
  return (
    <div className="border-2 border-black rounded-lg p-5 inline-block">
      <a href="./login">Login</a>
      <a href="./register">SignUp</a>
    </div>
  );
};

export default Home;

// import React, { useState } from "react"
// import Register from "@/components/Register"
// import Login from "@/components/Login"

// const App: React.FC = () => {
//   const [isLogin, setIsLogin] = useState("");
//   const [prevMode, setPrevMode] = useState("");

//   const toggleAuthMode = () => {
//     setIsLogin((prevMode) => !prevMode)
//   }

//   return (
//     <div className="flex border-4 border-slate m-12 gap-32 px-8 justify-center">
//       <div>

//       {isLogin ? <Login /> : <Register />}
//       <p>
//       {isLogin ? (
//             <>Don't have an account? <button onClick={toggleAuthMode}>Register</button></>
//           ) : (
//             <>Already have an account? <button onClick={toggleAuthMode}>Log in</button></>
//           )}
//       </p>
//       </div>

//     </div>
//   )
// }

// export default App;
