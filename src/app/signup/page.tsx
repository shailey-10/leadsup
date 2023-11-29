"use client";
import { UserAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Signup = () => {
  const { googleSignIn, user, role } = UserAuth();
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null && role && role === "member") {
      router.push("/analyzer");
    }
    if (user && role && role === "viewer") {
      router.push("/pending");
    }
  }, [user]);

  return (
    <div className="container">
      <div className="signup-content">
        <div className="signup-form">
          <h1>Join Our Community</h1>
          <p>Welcome to our platform. Sign up to get started!</p>
          <button onClick={handleGoogleSignIn} className="google-signin">
            Sign up with Google
          </button>
        </div>
        <div className="illustration">
          <img src="/signup.svg" alt="Signup Illustration" />
        </div>
      </div>

      <style jsx>{`


        .signup-content {
          margin: auto
          display: flex;
          text-align: center;
          justify-content: space-around;
          width: 100%;
        }

        .signup-form {
          padding: 30px;
          text-align: center;
        }

        h1 {
          font-size: 24px;
          color: #333;
        }

        p {
          margin: 20px 0;
          color: #666;
        }

        .google-signin {
          background-color: #4285f4;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
        }

        .google-signin:hover {
          background-color: #357ae8;
        }

        .illustration {
       
        }

        .illustration img {
          height: 50%;
        }
      `}</style>
    </div>
  );
};

export default Signup;
