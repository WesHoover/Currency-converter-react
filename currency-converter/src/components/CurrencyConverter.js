import React from 'react';
// import ReactDOM from 'react-dom';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      baseVal: '',
      baseSymbol: '',
      baseType: '',
      currencies: null,
      outVal: '',
      outSymbol: '',
      outType: ''
    };

    this.getCurrencies = this.getCurrencies.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // let currencies = null;

  getCurrencies(url) {
    fetch(url)
      .then(res => res.json())
      .then(output => {
        // localStorage.setItem('currencies', JSON.stringify(output));
        this.setState({
          baseSymbol: output['USD']['symbol_native'],
          baseType: output['USD']['code'],
          currencies: output
        });
        // console.log(JSON.stringify(output).charCodeAt(1));
      })
      // .then( () => { currencies = JSON.parse(localStorage['currencies'] )})
      .catch(err => console.error(err));
  }
  componentWillMount() {
    this.getCurrencies(
      'https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json'
    );
  }
  // componentDidMount() {
  //   this.handleChange();
  // }

  handleChange(e) {
    this.setState({ baseSymbol: this.state.currencies[e.target.value]['symbol_native'] });
  }

  render() {
    let currencyTypes = [];
    let currencies = this.state.currencies;
    for (const types in currencies) {
      currencyTypes.push([currencies[types]['code'], currencies[types]['name']]);
    }
    //console.log(this.props.currencies);
    return (
      <div>
        <form>
          Base Currency:&nbsp;
          <select onChange={this.handleChange}>
            {currencyTypes.map((type, index) => {
              return (
                <option key={index} value={type[0]}>
                  {type[1]}
                </option>
              );
            })}
          </select>
          <span> {this.state.baseSymbol} </span>
          <input defaultValue={this.state.baseVal} />
        </form>
      </div>
    );
  }
}

export default CurrencyConverter;
// ReactDOM.render(<CurrencyList />, document.getElementById('app'));

// class CurrencyConverter extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       baseType: '',
//       baseSymbol: '',
//       baseDec: '',
//       baseVal: '',
//       outType: '',
//       outSymbol: '',
//       outDec: '',
//       outVal: ''
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.getRates = this.getRates.bind(this);
//   }
//
//   handleChange(event) {
//     this.setState({ baseType: event.target.value });
//   }
//
//   handleSubmit(event) {
//     // XHR Request GET exchange rate
//     // set output currency input box to value
//     event.preventDefault();
//   }
//
//   getRates() {
//     fx.base = this.state.baseType;
//     // fx.rates = data.rates
//     var rate = fx(this.state.baseVal)
//       .from(this.state.baseType)
//       .to(this.state.outType);
//     alert(this.state.baseSymbol + this.state.baseVal = this.state.outSymbol + rate.toFixed(this.state.outDec));
//     let http = new XMLHttpRequest();
//     // let result = $.getJSON("https://api.fixer.io/latest", demo)
//
//     this.setState({outVal: result});
//   }
//
//   // rtl(element) {
//   //   if(element.setSelectionRange){
//   //       element.setSelectionRange(0,0);
//   //   }
//   // }
//
//   //set base to cur value of currency-selector
//
//   render() {
//     // create option elements array from Common-Currency.json
//     const currencies = this.props.currencies;
//     const currencyLocales = [];
//     for (const type in ) {
//       currencyLocales.push(`<option value="${ currencies.type['name'] }">${ currencies.type['name'] }</option>`);
//     }
//     return (
//       <div>
//         <form action="">
//           <label for="input-currency">Base Currency: </label>
//           <select
//             name="select-base-currency"
//             id="base-currency-selector"
//             value={this.state.baseType}
//             onChange={this.handleChange}>
//             {currencyLocales}
//           </select>
//           <span> {this.state.[baseType]['symbol_native']} </span>
//
//           <input type="text" name="textbox" style="direction: RTL;" onkeyup="rtl(this);"/>
//           &nbsp;
//           <input type="submit" value="Submit" onClick={getRates}/>
//         </form>
//         <br />
//         <br />
//
//         <label for="output-currency">Output Currency: </label>
//         <select name="" id="">
//           <option value="">type</option>
//           <option value="">type</option>
//         </select>
//         <span> $ </span>
//         <input id="output-currency" type="number" />
//       </div>
//             );
//             }
//             }
//
//
// ReactDOM.render(<CurrencyConverter currencies={currencies}/>, document.getElementById('container'));
