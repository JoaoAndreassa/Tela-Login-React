import React from 'react';
import './login.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";


function login() {
  const handleClickRegister = (values) => {
   
   Axios.post("http://localhost:3001/register", {
    email:values.email,
    password:values.password,
   }).then((response)=>{
    alert(response);
   });
  };


  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email:values.email,
      password:values.password,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const validationLogin = yup.object().shape({
    email:yup
      .string()
      .email("Não é um email")
      .required("Este campo é obrigatório"),
    password:yup
      .string()
      .min(8, "A senha deve ter 8 caracteres")
      .required("Este campo é obrigatório"),
  });

  
  
 
  const validationRegister = yup.object().shape({
    email:yup
      .string()
      .email("Não é um email")
      .required("Este campo é obrigatório"),
    password:yup
      .string()
      .min(8, "A senha deve ter 8 caracteres")
      .required("Este campo é obrigatório"),
    confirmpassword:yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais").required("A confimação de senha é obrigatória"),
    
  });


  
  return (
    <div className="container">
      <h1> Login </h1> 
      <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin} >

        <Form className="login-form">

          {/* ============= EMAIL ====================== */}
          <div className= "login-form-group">
            <Field name = "email" className = "form-field"
            placeHolder="email"/>

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />

          </div>
          {/* ============= SENHA ====================== */}
          <div className= "form-group">
            <Field name = "password" type="password" className = "form-field"
            placeHolder="senha"/>

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />

          </div>

          {/* ============= botão ====================== */}
          <button className="button" type = "submit">
            Login 
          </button>

          
         
        </Form>
      </Formik>
       {/* ===================REGISTRO======================= */}

      <h1> Cadastro </h1> 
      <Formik 
        initialValues={{}}
        onSubmit={handleClickRegister}
        validationSchema={validationRegister} >


        <Form className="register-form">
          {/* ============= EMAIL ====================== */}
          <div className= "register-form-group">
            <Field name = "email" className = "form-field"
            placeHolder="email"/>

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />

          </div>
          {/* ============= SENHA ====================== */}
          <div className= "form-group">
            <Field name = "password"  type="password" className = "form-field"
            placeHolder="senha"/>

            <ErrorMessage
              component="span"
              name="password"
              className="form-error"
            />

          </div>
           {/* =============CONFIRMAR SENHA ====================== */}
           <div className= "form-group">
            <Field name = "confirmpassword"  type="password" className = "form-field"
            placeHolder="Confirme sua senha"/>

            <ErrorMessage
              component="span"
              name="confirmpassword"
              className="form-error"
            />

          </div>



           {/* ============= botão ====================== */}
          <button className="button" type = "submit">
            Cadastrar 
          </button>

          
         
        </Form>
      </Formik>

    </div>
  );

}

export default login;