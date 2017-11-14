//Currency Converter

//Create a currency converter that converts a user’s selected base currency and outputs the equivalent money value of the exchange currency using the current day’s rate.

//Include two select inputs, one for base currency and second for equivalent currency, which make use of the json found at: https://gist.githubusercontent.com/mddenton/062fa4caf150bdf845994fc7a3533f74/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json

//For the base currency, create a masked currency input that:

 // Shows the symbol of the selected base currency
 // Is formatted to two decimal places
 // On focus sets the cursor to the rightmost decimal position
 // Only allows numbers
 // When a new number is inserted shifts the decimal right one place,
 // When deleted shifts the decimal left one place

// Currency rates are available from http://fixer.io/. Be sure to use https:// for your requests.

// Use the money.js library (see this jsfiddle's External Resources) to convert the selected base currency to its chosen equivalent money value. For more details: http://openexchangerates.github.io/money.js/

// Best practice would be to inform the user if their selected currency is not available from fixer.io using inline validation. In order to more easily test error handling, allow the user to select a currency not available from fixer.io and present the error returned.

// Show the equivalent money value's currency symbol which is included in the above Common-Currency.json endpoint.

// Use React but do not include jQuery in your project.

// currencies[baseType]['symbol_native']

// class CurrencyTypes extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return (
//       <option value={this.props.type}>{this.props.type.name}</option>
//       {this.props.list.map(function(listValue){
//             return <li>{listValue}</li>;
//           })}
//     )
//   }
// }

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      baseType: 'USD',
      baseSymbol: '$',
      baseDec: '2',
      baseVal: '',
      outType: 'CAD',
      outSymbol: 'CA$',
      outDec: '2',
      outVal: ''
    };


    this.getAjax = this.getAjax.bind(this);
    // this.setRates = this.setRates.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.convert = this.convert.bind(this);

  }

    static getAjax(url, success) {
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState > 3 && xhr.status == 200) success(xhr.responseText);
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    }

    static setRates(data) {
       let json = JSON.parse(data);
       fx.rates = json.rates;
    }

    getAjax('https://api.fixer.io/latest', setRates);

    convert() {
      let result = fx(this.state.baseVal)
        .from(this.state.baseType)
        .to(this.state.outType);
      console.log( result.toFixed(2) );
      // return result.toFixed(2);
    }


    handleChange(event) {
      this.setState({ baseVal: event.target.value });
    }

    handleSubmit(event) {
      event.preventDefault();
      this.convert;
      // this.setState({
      //   outVal: getAjax('https://api.fixer.io/latest', getRates)
      //   // baseType: event.target.value
      // });
    }



  // Set cursor to right on focus
//   rtl(element) {
//     if(element.setSelectionRange){
//         element.setSelectionRange(0,0);
//     }
//   }

  render() {
    // create option elements array from Common-Currency.json

  	return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="base-currency">Base Currency: </label>
            <span> { this.state.baseSymbol } </span>
            <input id="base-currency" type="number" defaultValue={this.state.baseVal} onChange={this.handleChange} />
            <span>{this.state.baseVal}</span>
            <input type="submit" value="Submit" />
          </div>
          <div>
            <label htmlFor="output-currency">Output Currency: </label>


          </div>
        </form>
        <span>{ this.state.outSymbol + " value: " + this.state.outVal}</span>
      </div>

    );
  }
}
            // <input id="output-currency" type="number" value={this.state.outVal} />

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

ReactDOM.render(<CurrencyConverter
                  currencies={CURRENCIES}
                  />,
                document.getElementById('container'));
