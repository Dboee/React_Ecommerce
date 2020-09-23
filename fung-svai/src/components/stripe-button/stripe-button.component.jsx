import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey =
      "pk_test_51HUVVnKufdaGikmVaxCNYmXyngaXYj6uVqxnNrdUpCzJOKkntUGume6LjLIHf9QQNNwmebaNbUa1GE6JCzBzQzAg00kII74XIa";
    
    const onToken = token => {
        console.log(token)
        alert('Payment Successful!')
    }

      return (
        <StripeCheckout
          label="Pay Now"
          name="Fung Svai"
          billingAddress
          shippingAddress
          image="https://svgshare.com/i/CUz.svg"
          description={`Your total is $${price}`}
          amount={priceForStripe}
          panelLabel='Pay Now'
          token={onToken}
          stripeKey={publishableKey}
        />
      );
};

export default StripeCheckoutButton;