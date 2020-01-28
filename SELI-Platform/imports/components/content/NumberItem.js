import React from 'react';
import InputNumber from 'rc-input-number';
 
class NumberItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (  
      <InputNumber 
      className="quiz-inputnumeric"
      defaultValue={0}
      min={0}
      max={100}
      />
    );
  }
}
export default NumberItem;