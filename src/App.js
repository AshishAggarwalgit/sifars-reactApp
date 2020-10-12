import React from 'react';
import stock from './data'
class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stock :[],
      selectRecord:[],
      clickPriceId:null
    }
  }
  componentWillMount(){
    this.setState({stock});  
  }
  selectRecord = (stockId)=>{
    let selectedRecord = this.state.selectRecord;
    console.log(selectedRecord,stockId);
    let index = selectedRecord.findIndex((s)=>s === stockId);
    if(index > -1){
      selectedRecord.splice(index,1);
    }else{
      selectedRecord.push(stockId);
    }
    this.setState(selectedRecord);
  }
  deleteRecord = ()=>{
    let finalRecord = this.state.stock.filter(s=>{
      return this.state.selectRecord.indexOf(s.id) === -1
    })
    this.setState({stock:finalRecord})
  }
  resetSelectedRecord = ()=>{
    this.setState({selectRecord:[]})
  }
  nameSearch = (e)=>{
    let searchValue = e.target.value;
    if(e.target.value !== ""){
      let finalRecord = this.state.stock.filter(s=>{
        return s.name.includes(searchValue) 
      })
      this.setState({stock:finalRecord})
    }else{
      this.setState({stock})
    }
  }
  render(){
    // console.log("")
    return (
      <div>
        <table>
          <thead>
            <tr>
            <td></td>
              <td>ID</td>
              <td>
                Name
                <div>
                  <input type="text" name="name" onChange={(e)=>{this.nameSearch(e)}}/>
                </div>
              </td>
              <td>Price</td>
              <td>Coupon</td>
              <td>In Stock</td>
            </tr>
          </thead>
          <tbody>
            {
              this.state.stock.map((s)=>{
                return (
                  <tr key={s.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        onChange={()=>this.selectRecord(s.id)}
                        checked={this.state.selectRecord.indexOf(s.id) > -1?true:false}
                      />
                    </td>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td 
                      contentEditable={true}
                    >
                      {s.price}
                    </td>
                    <td>{s.coupon}</td>
                    <td>{s.inStock}</td>
                  </tr>  
                )
              })
            }
          </tbody>
        </table>
        <button onClick={this.deleteRecord}>Delete</button>
        <button onClick={this.resetSelectedRecord}>Reset</button>
      </div>
    );
  }
}

export default App;
