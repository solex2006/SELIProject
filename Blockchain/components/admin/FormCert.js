import React, { Component } from 'react'
import axios from 'axios';

export default class FormCert extends Component {

      idStudent= React.createRef()
      Date=React.createRef()
      Course=React.createRef()
      Description=React.createRef()
      Name=React.createRef()
      Tutor=React.createRef()


      crearCert= (e)=>{
            // Prevenir el default
          e.preventDefault();

          const certificado={
                idStudent: this.idStudent.current.value,
                date: this.Date.current.value,
                course: this.Course.current.value,
                description: this.Description.current.value,
                name: this.Name.current.value,
                tutor: this.Tutor.current.value
          }

          console.log(certificado)

          ///Aqui Manda a generar el certificado Probar
          axios.post(`http://localhost:3000/datos`, certificado )
                  .then(res => {
                  console.log(res.data);
                        //console.log(contractAddress);
                  }) ;


          // resetear el formulario (opcional)
          //e.currentTarget.reset();
      }
      render() {
            return (
                 <div className='container'>
                       <form className='border border-dark padform' onSubmit={this.crearCert}>
                              <div className="form-group row">
                                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">idStudent</label>
                              <div className="col-sm-10">
                                    <input ref={this.idStudent} type="text"  className="form-control-plaintext" id="staticEmail" placeholder="example: 4595"/>
                              </div>
                              </div>
                              <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Date</label>
                              <div className="col-sm-10">
                                    <input ref={this.Date} type="text" className="form-control" id="inputPassword" placeholder="20-02-2021"/>
                              </div>
                              </div>
                              <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Course</label>
                              <div className="col-sm-10">
                                    <input ref={this.Course} type="text" className="form-control" id="inputPassword" placeholder="example: Course of blockchain"/>
                              </div>
                              </div>
                              <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Description</label>
                              <div className="col-sm-10">
                                    <input ref={this.Description} type="text" className="form-control" id="inputPassword" placeholder="example: This course is about .."/>
                              </div>
                              </div>
                              <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Name</label>
                              <div className="col-sm-10">
                                    <input ref={this.Name} type="text" className="form-control" id="inputPassword" placeholder="example: Jhon M."/>
                              </div>
                              </div>
                              <div className="form-group row">
                                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Tutor</label>
                              <div className="col-sm-10">
                                    <input ref={this.Tutor} type="text" className="form-control" id="inputPassword" placeholder="example: Peter R."/>
                              </div>
                              </div>
                              <button type="submit" className="btn btn-dark">Create Cert</button>
                        </form>

                        <style jsx>{`
                              .row {
                                    padding: 2px 2px 0px 8px
                                    }
                              `}
                              </style> 
                 </div>
            )
      }
}
