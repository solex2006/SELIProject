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
    console.log("EStadovvvvvvvv", this.props.quiz.activity.score)

    this.setState({
      approved:this.props.quiz.activity.approved,
      hits: this.props.quiz.activity.hits,
      Incorrect: this.props.quiz.activity.Incorrect,
      date:this.props.quiz.activity.date,
      type:this.props.quiz.activity.type,
      score:Math.round(this.props.quiz.activity.score)
    })
    
    if(this.props.quiz.activity.hits===undefined){
      this.setState({hits: "NR*"})
    }else if(this.props.quiz.activity.Incorrect===undefined){
      this.setState({Incorrect: "NR*"})
    }else if(this.props.quiz.activity.approved===undefined){
      this.setState({approved: "NR*"})
    }else if(this.props.quiz.activity.type===undefined){
      this.setState({type: "NR*"})
    }else if(this.props.quiz.activity.type===undefined){
      this.setState({score: "NR*"})}

    if(this.props.quiz.activity.approved===true) {
      this.setState({approved: "A*"})
    }else if (this.props.quiz.activity.approved===false){
      this.setState({approved: "R*"})
    }
    
    
  }


render(){
  const { classes } = this.props;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
           <TableCell component="th" scope="row">Aciertos*</TableCell>
            <TableCell align="right">Fallas*</TableCell>
            <TableCell align="right">Estado*</TableCell>
            <TableCell align="right">Tipo*</TableCell>
            <TableCell align="right">Nota*</TableCell>
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