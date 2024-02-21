import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { FaImages } from "react-icons/fa6";
import { useState } from "react";
import Swal from "sweetalert2";
import { FirebaseError } from "firebase/app";

export default function Register() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);

  console.log(file, `ini file`);

  const registerHandler = async (e) => {
    e.preventDefault();
    let displayName = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;

    console.log(file);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(res.user, {
            displayName,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "userChats", res.user.uid), {});
          console.log("selesai bikin no error");
        });
      });
      localStorage.setItem("email", email);
      navigate("/");
    } catch (error) {
      // console.log(error.message.split(": ")[1])
      Swal.fire({
        icon: "error",
        title: error.message.split(": ")[1],
      });
    }
  };

  return (
    <>
      {/* component */}
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
        crossOrigin="anonymous"
      />
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
        style={{
          backgroundImage: 'url("/src/assets/bground.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="
    flex flex-col
    bg-white
    shadow-md
    px-4
    sm:px-6
    md:px-8
    lg:px-10
    py-8
    rounded-3xl
    w-50
    max-w-md
  "
        >
          <div className="font-bold self-center text-xl sm:text-3xl text-gray-800">
            Join us Now!
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to create account!
          </div>
          <div className="mt-10">
            <form onSubmit={registerHandler}>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  Full Name:
                </label>
                <div className="relative">
                  <div
                    className="
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            "
                  >
                    <i className="fas fa-user text-[#81b0df]" />
                  </div>
                  <input
                    id="name"
                    type="name"
                    name="name"
                    className="
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            "
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="mb-1 text-xs tracking-wide text-gray-600"
                >
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div
                    className="
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            "
                  >
                    <i className="fas fa-at text-[#81b0df]" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-2xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            "
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600"
                >
                  Password:
                </label>
                <div className="relative">
                  <div
                    className="
              inline-flex
              items-center
              justify-center
              absolute
              left-0
              top-0
              h-full
              w-10
              text-gray-400
            "
                  >
                    <span>
                      <i className="fas fa-lock text-[#81b0df]" />
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="
              text-sm
              placeholder-gray-500
              pl-10
              pr-4
              rounded-3xl
              border border-gray-400
              w-full
              py-2
              focus:outline-none focus:border-blue-400
            "
                    placeholder="Enter your password"
                  />
                </div>
              </div>
              <input
                required
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <div className="flex items-center justify-center">
                <div>
                  <label htmlFor="file">
                    <div className="bg-gray-400 flex flex-row items-center justify-center gap-3 rounded-xl px-2 py-1">
                      <FaImages className="size-6" />
                      <p>
                        {file && file !== null ? file.name : "Add an Image"}
                      </p>
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex w-full mt-3">
                <button
                  type="submit"
                  className="
            flex
            mt-2
            items-center
            justify-center
            focus:outline-none
            text-white text-sm
            sm:text-base
            bg-[#9ab7d4]
            hover:bg-[#81b0df]
            rounded py-2 w-full transition duration-150 ease-in
          "
                >
                  <span className="mr-2 uppercase">Sign Up</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
