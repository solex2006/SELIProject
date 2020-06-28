import React, {useState} from 'react'

export default function HardwareSoftwareReq(props) {
	console.log("props en HardwareSoftwareReq", props);
	const [data, setData]=useState(props);
   
   return (
      <div>
			<div className='crnheading'>
				<h3 id="tech">Technological Requirements</h3>
			</div>
			<div className='descriptiontext'>
				As a online course, it's required that you have access to a computer 'desktop or mobile' with internet connection.
			</div>
			<div className='crnheading'>
				<h4 id="tech-hard">Hardware requirements</h4>
			</div>
			
			{
				data.length!=0 ?
				<div>
					
						<ol className='resources'>
							{
								data.data[1]!=undefined?
								data.data[1].map((item, index) =>(
									<li key={index}>{item.label}</li>
								))
								:
								<div className='descriptiontext'>
									Information not available.
								</div>
								 
							}
						</ol>
				
				</div>
				:
				undefined
			}

			<div className='crnheading'>
				<h4  id="tech-soft">Software requirements</h4 >
			</div>
			
			{
				data.length!=0 ?
				<ol className='resources'>
					{
						
						data.data[0]!=undefined?
						data.data[0].map((item, index) =>(
								<li key={index}>{item.label}</li>
							)) 
						:
						<div>
							Information not available.
						</div>
						   
					}
				</ol>
				:
				undefined
			}
			
         
      </div>
   )
}
