import React from 'react'

export default function HardwareSoftwareReq(props) {
   
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
				props.data.length!=0 ?
				<div>
					
						<ol className='resources'>
							{
								props.data[1].map((item, index) =>(
									<li key={index}>{item.label}</li>
								))
							}
						</ol>
				
				</div>
				:
				<div className='descriptiontext'>
					Information not available.
				</div>
			}

			<div className='crnheading'>
				<h4  id="tech-soft">Software requirements</h4 >
			</div>
			
			{
				props.data.length!=0 ?
				<ol className='resources'>
					{
						props.data[0].map((item, index) =>(
							<li>{item.label}</li>
						))
					}
				</ol>
				:
				<div>
					Information not available.
				</div>
			}
			
         
      </div>
   )
}
