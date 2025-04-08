import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const UserSignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
          profilePic: data.profilePic,
          name: data.name,
          email: data.email,
          phone: data.phone,
          dob: data.dob,
          gender: data.gender,
          aadhaar: data.aadhaar,
          profession: data.profession,
          organisation: data.organisation,
          password: data.password,
        };
        console.log(userInfo);
        await axios
          .post("http://localhost:4001/User/register", userInfo)
          .then((res) => {
            console.log(res.data);
            if (res.data) {
              toast.success("Signup successfully");
              navigate(from, { replace: true });
              // window.location.reload();
            }
            // localStorage.setItem("Users", JSON.stringify(res.data.user));
          })
          .catch((err) => {
            if (err.response) {
              console.log(err);
              toast.error("Error: " + err.response.data.message);
            }
          });
      };
  return (
    <Wrapper>
      <Navbar />
<form className="form" onSubmit={handleSubmit(onSubmit)}>
  <h2 className="title">User Registration</h2>

  <label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Upload Profile Picture</span>
  </div>
  <input
    type="file"
    accept="image/*"
    className="file-input file-input-bordered w-full"
    {...register("profilePic", { required: true })}
  />
</label>


  <div className="form-grid">
    <div className="form-group">
      <label>Name</label>
      <div className="input-wrapper">
        <input type="text" placeholder="Enter your Name"
         {...register("name", { required: true })}
         />
         {errors.name && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
        )}
      </div>
    </div>
    

    <div className="form-group">
      <label>Email</label>
      <div className="input-wrapper">
        <input type="email" placeholder="Enter your Email" 
        {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, // No uppercase allowed
              message: "Email must be in lowercase only",
            },
            validate: (value) =>
              value === value.toLowerCase() || "Email must be in lowercase only",
          })}
        />
        {errors.email && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
        )}
      </div>
    </div>
    

    <div className="form-group">
      <label>Gender</label>
      <div className="input-wrapper">
        <select 
        {...register("gender", { required: true })}
        >
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        {errors.gender && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
        )}
      </div>
    </div>
    

    <div className="form-group">
      <label>Organization</label>
      <div className="input-wrapper">
        <input type="text" placeholder="Enter your Organization" 
        {...register("organisation", { required: true })}
        />
        {errors.organisation && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
    )}
      </div>
    </div>
    



    <div className="form-group">
      <label>Phone</label>
      <div className="input-wrapper">
        <input type="phone" placeholder="Enter your Phone Number"
        {...register("phone", { required: true })}
        />
        {errors.phone && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
    )}
      </div>
    </div>
    

    <div className="form-group">
      <label>Password</label>
      <div className="input-wrapper">
        <input type="password" placeholder="Enter your Password"
        {...register("password", { required: true })}
        />
        {errors.password && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
     )}
      </div>
    </div>

    

    <div className="form-group">
      <label>Profession</label>
      <div className="input-wrapper">
      <select
            className="select select-bordered select-md w-full flex gap-2"
            {...register("profession", { required: true })}
          >
            <option disabled selected>
              Select Profession
            </option>
            <option value="Lawyer">Lawyer</option>
            <option value="Judge">Judge</option>
            <option value="Student">Student</option>
            <option value="Legal Researcher">Legal Researcher</option>
          </select>
          {errors.profession && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
            )}
      </div>
    </div>
    

    <div className="form-group">
      <label>Aadhar Number</label>
      <div className="input-wrapper">
        <input 
        type="text" placeholder="Enter your Aadhar Number" maxLength={12} 
        {...register("aadhaar", {
            required: true,
            pattern: /^[0-9]{12}$/, // Validates exactly 12 digits
        })}
        />
        {errors.aadhaar && (
            <span className="p-2 text-sm text-red-500">
              Aaddhar card must be 12 digits
            </span>
             )
            }
      </div>
    </div>
    

    <div className="form-group">
      <label>Date of Birth</label>
      <div className="input-wrapper">
        <input type="date"
        {...register("dob", { required: true })}
        />
        {errors.dob && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
        )}
      </div>
    </div>
    

    <div className="form-group">
      <label style={{ visibility: 'hidden' }}>Submit</label>
      <button type="submit" className="submit-btn">Register</button>
    </div>
  </div>
</form>

    </Wrapper>
  );
};

const Wrapper = styled.div`
  .form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
}

.form-group {
  flex: 0 0 48%; /* 2 columns */
}

  min-height: 100vh;
  background: #f9fafb;
  display: flex;
  flex-direction: column;
  align-items: center;

  .form {
    margin-top: 50px;
    background: white;
    padding: 30px 35px;
    border-radius: 16px;
    width: 100%;
    max-width: 1120px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }

  .title {
    text-align: center;
    margin-bottom: 25px;
    font-size: 1.8rem;
    color: #222;
  }

  .form-group {
    margin-bottom: 20px;

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      font-size: 0.95rem;
    }

    .input-wrapper {
      display: flex;
      align-items: center;
      border: 1px solid #dcdfe4;
      border-radius: 10px;
      padding: 10px;
      background: #fafafa;
      transition: border 0.2s ease;

      input, select {
        border: none;
        background: transparent;
        width: 100%;
        font-size: 1rem;
        padding: 6px 0;
        outline: none;
      }

      &:focus-within {
        border-color: #2d79f3;
      }
    }
  }

  .submit-btn {
    width: 100%;
    background: black;
    color: white;
    padding: 18px;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background:rgb(43, 42, 42);
    }
  }
`;

export default UserSignUp;
