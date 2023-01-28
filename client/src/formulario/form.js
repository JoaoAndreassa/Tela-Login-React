import './form.css';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import React,{ useState } from 'react';


function Formulario() {

  const[file, setFile] = useState('');

  const uploadImage = async e => {
    e.preventDefault();
    console.log("Upload Imagem");
    console.log(file)
  }

  const handleClick = (values) => {
   
   Axios.post("http://localhost:3001/submit", {
    nome:values.nome,
    professor:values.professor,
    categoria:values.categoria,
    descricao:values.descricao
    //file:values.file

   }).then((response)=>{
    alert(response);
   });
  };


  

  const validation = yup.object().shape({
    nome:yup
      .string()
      .required("Este campo é obrigatório"),
    professor:yup
      .string()
      .required("Este campo é obrigatório"),
    categoria:yup
      .string()
      .required("Este campo é obrigatório"),
    descricao:yup
      .string()
      .required("Este campo é obrigatório"),
    file:yup
      .string()
      .required("Este campo é obrigatório"),
  });

  
  
 
  


  
  return (
    <div className="container">
      <h1> Formulario </h1> 
      <Formik initialValues={{}}  onSubmit={handleClick} validationSchema={validation} >


        <Form className="login-form">
          {/* ============= Nome ====================== */}
          <div className= "form-group">
            <Field name = "nome" className = "form-field"
            placeHolder="nome"/>

            <ErrorMessage
              component="span"
              name="nome"
              className="form-error"
            />

          </div>
          {/* ============= Professor Responsavel ====================== */}
          <div className= "form-group">
            <Field name = "professor" className = "form-field"
            placeHolder="Professor"/>

            <ErrorMessage
              component="span"
              name="professor"
              className="form-error"
            />

          </div>

          {/* ============= categoria ====================== */}
          <div className= "form-group">
            <Field name = "categoria" className = "form-field"
            placeHolder="Categoria" />

            <ErrorMessage
              component="span"
              name="categoria"
              className="form-error"
            />

          </div>

          {/* ============= descrição ====================== */}
          <div className= "form-group">
            <Field name = "descricao" className = "form-field-description"
            placeHolder="Descrição" /> 
            
            <ErrorMessage
              component="span"
              name="descricao"
              className="form-error"
            />

          </div>
           {/* ============= descrição ====================== */}
           <div className= "form-group">
            <form onSubmit={uploadImage}>
              <input type="file" name = "file" 
              className="form-field-file" onChange={e => setFile(e.target.files[0])} >

              </input>
            </form>

            <button className='button' type="submit">Submit</button>
            
            <ErrorMessage
              component="span"
              name="arquivo"
              className="form-error"
            />

          </div>


          
         
         
         
        </Form>
      </Formik>

    </div>
  );

}

export default Formulario;