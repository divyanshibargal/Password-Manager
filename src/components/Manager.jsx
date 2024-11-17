import React from "react";
import { useRef, useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }
  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordref.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordref.current.type = "password";
    }
  };

  const savePassword = async () => {
    if(form.site.length >3 && form.username.length >3 &&form.password.length >3){

        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
        // console.log([...passwordArray, form])

         // If any such id exists in the db, delete it 
         await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

         setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
         await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
        setform({ site: "", username: "", password: "" })
      toast.success("Password Saved Successfully");
}
else{
    toast.error('Password not saved!');
}

}

const deletePassword = async (id) => {
  console.log("Deleting password with id ", id)
  let c = confirm("Do you really want to delete this password?")
  if(c){
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
      
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

     toast.success("Password deleted Successfully!")
  }
      
}

  const copyText = (text)=>{
   toast.success("Copied to Clipboard!");
   navigator.clipboard.writeText(text);
  }

  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id)) 

}

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
    <Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="md:container mx-auto max-w-5xl py-10 p-2 md:p-0">
        <h1 className="text-2xl text-center text font-bold">
          <span className="text-green-700"> &lt;</span>
          Pass
          <span className="text-green-700">Hive/&gt; </span>
        </h1>
        <p className="text-green-900 text-center font-semibold">
          {" "}
          Your own Password Manager
        </p>

        <div className="text-white flex flex-col  items-center p-4 gap-10">
          <input
            placeholder="Enter Webiste URL"
            onChange={handleChange}
            className="text-black px-4 py-1 border border-green-600 rounded-full w-full"
            type="text"
            name="site"
            id=""
            value={form.site}
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-10 ">
            <input
              placeholder="Enter Username"
              onChange={handleChange}
              className="text-black px-4 py-1 border border-green-600 rounded-full w-full"
              type="text"
              name="username"
              id=""
              value={form.username}
            />
            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full p-4 py-1 text-black"
                type="password"
                name="password"
                id=""
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <div>
            <button
              className="flex justify-center items-center bg-green-600 hover:bg-green-500 w-fit rounded-full px-6 py-2 text-black gap-2"
              onClick={savePassword}
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save Password
            </button>
          </div>
        </div>
        <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={()=>{editPassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1'onClick={()=>{deletePassword(item.id)}}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{"width":"25px", "height":"25px"}}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                    </div>
      </div>
    </>
  );
};

export default Manager;
