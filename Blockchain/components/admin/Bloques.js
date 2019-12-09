import React, { Component } from 'react'
import Bloque from './Bloque';

export default class Bloques extends Component {
      render() {
            return (
                  <div>
                  <h1 className='text-dark'>Latest Blocks</h1>
                  <div className='barra'>
                        {this.props.datamainblock.map(value => (
                            <Bloque
                              key={value.number}
                              bloque={value}                            
                            /> 
                    ) ) } 

                    <style jsx>{`
                        .barra { 
                              height:750px; 
                              overflow-y: scroll; 
                          } 
                       
                        `}
                        </style>  
                  </div>
                  </div>
            )
      }
}
