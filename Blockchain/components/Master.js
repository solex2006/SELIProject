import Head from 'next/head';


const MasterPage = (props) => (
     <div>
          <Head>    
               <title>SELI Certificates</title>
               <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
               <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>
          </Head>   

   
          <div className="container mt-4">
               {props.children}
          </div>
     </div>
);

export default MasterPage;