// Functional component that renders the Witnessed by Footer
import { Link } from '../routes';

// TODO: render real network after deployment, not Rinkeby
const WitnessedByFooter = (props) => {
  return (
    <div className='Witnessed-By-Footer marco margen'>
      <div className='Witnessed-Box'>
        <div className='Witnessed-Text-1'> 
          Witnessed by : 
        </div>
      </div>
      <div className='Witnessed-Box'>
        <img className='BlockChain-Logos' src='../static/Ethereum-Icon.png' />
      </div>
      <div className='Witnessed-Box'>
        <div className='Witnessed-Text-2'>This Certificate resides at Ethereum address:</div>
        <Link route={`http://localhost:3000/admin/transaction/${props.address}`} >
          <a className='Witnessed-Text-2'>{ props.address }</a>
        </Link>
      </div>
      <div className='Witnessed-Box'>
        <img className='BlockChain-Logos' src='../static/Ethereum-Icon.png' />
      </div>
      <div><img className="Certificate-Layout-Image" src='/static/argyle.png'/></div>
    </div>
  );
}

export default WitnessedByFooter;
