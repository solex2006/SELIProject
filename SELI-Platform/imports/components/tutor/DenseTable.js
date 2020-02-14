import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
const useStyles = theme => ({
  table: {
    minWidth: 650,
  },
});

 class DenseTable extends Component  {
 
  state={
    hits:'',
    Incorrect:'',
    approved:'',
    date:'',
    type:'',
    score:''
  }

  
  componentDidMount(){

    this.setState({
      approved:this.props.quiz.activity.approved,
      hits: this.props.quiz.activity.hits,
      Incorrect: this.props.quiz.activity.Incorrect,
      date:this.props.quiz.activity.date,
      type:this.props.quiz.activity.type,
      score:Math.round(this.props.quiz.activity.score)
    })
    
    if(this.props.quiz.activity.hits===undefined){
      this.setState({hits: `${this.props.language.Noregistered}`})
    }else if(this.props.quiz.activity.Incorrect===undefined){
      this.setState({Incorrect: `${this.props.language.Noregistered}`})
    }else if(this.props.quiz.activity.approved===undefined){
      this.setState({approved:  `${this.props.language.Noregistered}`})
    }else if(this.props.quiz.activity.type===undefined){
      this.setState({type:  `${this.props.language.Noregistered}`})
    }else if(this.props.quiz.activity.type===undefined){
      this.setState({score:  `${this.props.language.Noregistered}`})}

    if(this.props.quiz.activity.approved===true) {
      this.setState({approved:  `${this.props.language.Approved}`})
    }else if (this.props.quiz.activity.approved===false){
      this.setState({approved:  `${this.props.language.Reproved}`})
    }
    
    
  }


render(){
  const { classes } = this.props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           <TableCell component="th" scope="row">{this.props.language.hits}</TableCell>
            <TableCell align="right">{this.props.language.wrong}</TableCell>
            <TableCell align="right">{this.props.language.state}</TableCell>
            <TableCell align="right">{this.props.language.type}</TableCell>
            <TableCell align="right">{this.props.language.score}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
              <TableRow key={this.props.quiz.activity.hits}>
              <TableCell component="th" scope="row">{this.state.hits}</TableCell>
              <TableCell align="right">{this.state.Incorrect}</TableCell>
              <TableCell align="right">{this.state.approved}</TableCell>
              <TableCell align="right">{this.state.type}</TableCell> 
              <TableCell align="right">{this.state.score}</TableCell>               
            </TableRow>    
        </TableBody>
      </Table>
    </TableContainer>
  );
}

}

export default withStyles(useStyles)(DenseTable)