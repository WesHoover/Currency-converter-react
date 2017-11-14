import React from 'react';
import ReactDOM from 'react-dom';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      baseType: '',
      baseSymbol: '',
      baseDec: '',
      baseVal: '',
      outType: '',
      outSymbol: '',
      outDec: '',
      outVal: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getRates = this.getRates.bind(this);
  }

  handleChange(event) {
    this.setState({ baseType: event.target.value });
  }

  handleSubmit(event) {
    // XHR Request GET exchange rate
    // set output currency input box to value
    event.preventDefault();
  }

  getRates() {
    fx.base = this.state.baseType;
    // fx.rates = data.rates
    var rate = fx(this.state.baseVal)
      .from(this.state.baseType)
      .to(this.state.outType);
    alert(this.state.baseSymbol + this.state.baseVal = this.state.outSymbol + rate.toFixed(this.state.outDec));
    let http = new XMLHttpRequest();
    // let result = $.getJSON("https://api.fixer.io/latest", demo)

    this.setState({outVal: result});
  }

  // rtl(element) {
  //   if(element.setSelectionRange){
  //       element.setSelectionRange(0,0);
  //   }
  // }

  //set base to cur value of currency-selector

  render() {
    // create option elements array from Common-Currency.json
    const currencies = this.props.currencies;
    const currencyLocales = [];
    for (const type in ) {
      currencyLocales.push(`<option value="${ currencies.type['name'] }">${ currencies.type['name'] }</option>`);
    }
    return (
      <div>
        <form action="">
          <label for="input-currency">Base Currency: </label>
          <select
            name="select-base-currency"
            id="base-currency-selector"
            value={this.state.baseType}
            onChange={this.handleChange}>
            {currencyLocales}
          </select>
          <span> {this.state.[baseType]['symbol_native']} </span>

          <input type="text" name="textbox" style="direction: RTL;" onkeyup="rtl(this);"/>
          &nbsp;
          <input type="submit" value="Submit" onClick={getRates}/>
        </form>
        <br />
        <br />

        <label for="output-currency">Output Currency: </label>
        <select name="" id="">
          <option value="">type</option>
          <option value="">type</option>
        </select>
        <span> $ </span>
        <input id="output-currency" type="number" />
      </div>
            );
            }
            }

            const CURRENCIES = {
              USD: {
                symbol: '$',
                name: 'US Dollar',
                symbol_native: '$',
                decimal_digits: 2,
                rounding: 0,
                code: 'USD',
                name_plural: 'US dollars'
              },
              CAD: {
                symbol: 'CA$',
                name: 'Canadian Dollar',
                symbol_native: '$',
                decimal_digits: 2,
                rounding: 0,
                code: 'CAD',
                name_plural: 'Canadian dollars'
              },
              EUR: {
                symbol: '€',
                name: 'Euro',
                symbol_native: '€',
                decimal_digits: 2,
                rounding: 0,
                code: 'EUR',
                name_plural: 'euros'
              }
            };
ReactDOM.render(<CurrencyConverter currencies={CURRENCIES}/>, document.getElementById('container'));
