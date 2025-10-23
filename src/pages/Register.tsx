import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page with sign up mode
    navigate('/login', { state: { signUp: true } });
  }, [navigate]);

  return null;
};

export default Register;