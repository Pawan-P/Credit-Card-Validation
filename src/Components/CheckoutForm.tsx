import React, { Component } from 'react';
import { getCVVLength, getCardNetwork, validateCVV, validateCreditCardNumber } from '../Utilities/helper';
import { Button, createStyles, FormControl, Grid, MenuItem, Snackbar, TextField, Theme, withStyles } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const useStyles = createStyles((theme: Theme) => ({
  textField: {
    width: "100%",
    "& .MuiInputLabel-animated": {
      fontSize: "20px",
      fontWeight: "bold"
    },
    "& .MuiInput-marginDense, .MuiInputBase-root": {
      marginTop: theme.spacing(4)
    },
    paddingRight: theme.spacing(4)
  },
  validateBtn: {
    display: "flex",
  },
}));

interface IProps {
  classes: any
}

interface IState {
  creditCardNumber: string;
  isValid: any;
  cardType: string;
  expirationDate: string;
  cvv: string;
  isCVVValid: any;
  paymentMethod: string;
  showToast: boolean;
  orderToast: boolean;
}

const paymentMethods = [
  { option: 'Credit Card', value: "1" },
  { option: 'Razorpay', value: "2" },
  { option: 'Debit Card', value: "3" },
  { option: 'UPI', value: "4" },
  { option: 'Easy Credit', value: "5" }
];

class CheckoutForm extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      creditCardNumber: '',
      isValid: null,
      cardType: '',
      expirationDate: '',
      cvv: '',
      isCVVValid: null,
      paymentMethod: paymentMethods[0]?.value,
      showToast: false,
      orderToast: false,
    };
  }

  handleCreditCardChange = (event: any) => {
    const { value } = event.target;
    if(!value || value === ''){
      this.setState({cardType:'', isValid: false, creditCardNumber: value})
    }else{
      this.setState({ creditCardNumber: value, isValid: true, cardType: getCardNetwork(value) });
    }
  };

  handleValidateCreditCard = () => {
    const isValidCard = validateCreditCardNumber(this.state.creditCardNumber);
    this.setState({ isValid: isValidCard, showToast: true });
  };

  handleExpirationChange = (event: any) => {
    const { value } = event.target;
    this.setState({ expirationDate: value});
  };

  handleCVVChange = (event: any) => {
    const { value } = event.target;
    this.setState({ cvv: value, isCVVValid: validateCVV(value, this.state.creditCardNumber) });
  };

  handlePaymentMethodChange = (event: any) => {
    const value = event.target.value;
    // if(value?.paymentMethod !== '1'){
    //   Toast.error("Payment mode unavailable!")
    // }
    this.setState({ paymentMethod: value?.paymentMethod, showToast: false });
  };

  handlePlaceOrder = () => {
    //implementation for validate and proceed via api call from here
    if(
      this.state.creditCardNumber !== '' && this.state.isValid &&
      this.state.expirationDate !== '' &&
      this.state.cvv !== '' && this.state.isCVVValid
    ){
      this.setState({ orderToast: true }, this.resetState);
    }
  };

  resetState = () => {
    this.setState({
      creditCardNumber: '',
      isValid: null,
      cardType: '',
      expirationDate: '',
      cvv: '',
      isCVVValid: null,
      paymentMethod: paymentMethods[0]?.value,
      showToast: false,
    })
  }

  handleCloseToast = () => {
    this.setState({ showToast: false, orderToast: false });
  };

  render() {
    const {
      creditCardNumber,
      cardType,
      expirationDate,
      cvv,
      isCVVValid,
      paymentMethod,
      isValid,
      showToast,
      orderToast
    } = this.state;

    const classes = this.props?.classes;
    const currentYear = new Date().getFullYear();
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');

    return (
      <Grid container style={{ maxWidth: 400, margin: 'auto', padding: 20, rowGap: '20px' }}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>          
          <h2 style={{textAlign: "center"}}>Preorder for PS6</h2>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <FormControl fullWidth>
            <TextField
              value={paymentMethod} select label="Payment Method"
              onChange={this.handlePaymentMethodChange}
              className={classes.textField}
            >
              {paymentMethods.map((option, index) => (
                <MenuItem
                  key={index}
                  value={option.value}
                  onClick={(e) => this.setState({ paymentMethod: option.value })}
                  disabled={option.value !== '1'}
                >
                  {option.option}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        {paymentMethod === '1' && (
          <Grid container style={{rowGap: '20px'}}>
            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
              <TextField
                label='Credit Card Number'
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: 16 }}
                onChange={this.handleCreditCardChange}
                className={classes.textField}
                value={creditCardNumber}
                error={isValid&&(!isValid || cardType==='Unknown')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2} xl={2} className={classes.validateBtn}>
              <Button onClick={this.handleValidateCreditCard}>Validate</Button>
            </Grid>

            <Snackbar open={isValid && showToast} autoHideDuration={1500} onClose={this.handleCloseToast}>
              <Alert severity="success">
                Valid Input
              </Alert>
            </Snackbar>
            <Snackbar open={isValid!= null && !isValid && showToast} autoHideDuration={1500} onClose={this.handleCloseToast}>
              <Alert severity="error">
                Invalid Input
              </Alert>
            </Snackbar>

            {cardType && <div>Card Type: {cardType}</div>}

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                fullWidth
                id="expirationDate"
                label="Expiration Date"
                type="month"
                value={expirationDate}
                className={classes.textField}
                onChange={this.handleExpirationChange}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{min: `${currentYear}-${currentMonth}`}}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>              
              <TextField
                label='CVV'
                InputLabelProps={{ shrink: true }}
                inputProps={{ maxLength: getCVVLength(creditCardNumber) }}
                onChange={this.handleCVVChange}
                className={classes.textField}
                value={cvv} error={isCVVValid&&!isCVVValid}
              />
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Button
            variant="contained" color="primary" fullWidth onClick={this.handlePlaceOrder} style={{ marginTop: 20 }}
          >
            Place Order
          </Button>
        </Grid>
        <Snackbar open={orderToast} autoHideDuration={1500} onClose={this.handleCloseToast}>
          <Alert severity="success">
            Order Recieved
          </Alert>
        </Snackbar>

      </Grid>
    );
  }
}

// export default CreditCardForm;
export default withStyles(useStyles)(CheckoutForm);


function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
