'use client';
import { UserAuth } from '@/context/authContext';
import GoogleIcon from '@mui/icons-material/Google';
import Image from 'next/image'; // Add this import
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

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
    if (user?.uid && role) {
      router.push('/home');
    }
  }, [role, router, user]);

  return (
    <div className="container">
      <div className="signup-content">
        <div className="signup-form">
          <h1>Sign In to get started!</h1>
          <p>
            Start analyzing websites, generating leads, and optimizing outreach.
          </p>
          <div onClick={handleGoogleSignIn} className="google">
            <div className="icon">
              <GoogleIcon />
            </div>
            <div className="content">Sign in with google</div>
          </div>
        </div>
        <div className="illustration">
          <Image
            src="/signup.svg"
            alt="Signup Illustration"
            height={400}
            width={400}
          />{' '}
        </div>
      </div>

      <style jsx>{`
        .google {
          display: flex;
          border: none;
          margin: 0 auto;
          border-radius: 5px;
          cursor: pointer;
          gap: 10px;
          border: 1px solid #8976fd;
          width: fit-content;
          align-items: center;
        }

        .icon {
          margin-top: 5px;
          padding: 0 5px;
          margin-left: 8px;
        }

        .content {
          background: #8976fd;
          display: flex;
          align-items: center;
          height: 40px;
          color: #fff;
          padding: 0 25px;
        }

        .signup-content {
          margin: auto;
          display: flex;
          text-align: center;
          align-items: center;
          min-height: 80vh;
          justify-content: space-around;
          width: 80%;
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
