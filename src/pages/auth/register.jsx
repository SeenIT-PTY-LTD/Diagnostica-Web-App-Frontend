import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../../host';


function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API}/api/register`, formData);
            console.log(response.data);

            if (response.status === 200) {
                toast.success('User created successfully');
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 409) {
                toast.error('User already exists');
            } else {
                toast.error('User already exists');
            }
        }
    }

    return (
        <section className="vh-100" style={{ backgroundColor: "#90a4ae" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
                            <div className="card-body p-5">
                                <h3 className="mb-4 text-center">Create a New Account</h3>
                                <h4 className="mb-4 text-center" style={{ color: 'green' }}>Pain Management</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="name">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Name"
                                            name='name'
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.name}
                                            required
                                        />
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="username">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="username"
                                            placeholder="Email"
                                            name='username'
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.username}
                                            required
                                        />
                                    </div>
                                    <div className="form-outline mb-3">
                                        <label className="form-label" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            name='password'
                                            className="form-control"
                                            onChange={handleChange}
                                            value={formData.password}
                                            required
                                        />
                                    </div>
                                    <div className='text-center'>
                                        <button className="btn btn-dark text-center" type="submit">
                                            Sign Up
                                        </button>
                                    </div>
                                </form>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Already have an Account?
                                    <Link to="/" className="link-danger">Sign in</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
