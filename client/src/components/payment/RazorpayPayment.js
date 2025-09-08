import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { 
  Payment, 
  Security 
} from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';

const RazorpayPayment = ({ fundId, fundTitle, onPaymentSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (!donorName || !donorEmail) {
      toast.error('Please fill in your details');
      return;
    }

    try {
      setLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error('Failed to load payment gateway');
        return;
      }

      // Create order
      const orderResponse = await axios.post('http://localhost:5000/user/createorder', {
        useramount: amount,
        id: fundId
      });

      if (!orderResponse.data.flag) {
        toast.error('Failed to create payment order');
        return;
      }

      const { id: orderId } = orderResponse.data;

      // Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'rzp_test_qFggyDGcfAObXr',
        amount: parseFloat(amount) * 100, // Amount in paise
        currency: 'INR',
        name: 'AapdaRakshak',
        description: `Donation for ${fundTitle}`,
        order_id: orderId,
        prefill: {
          name: donorName,
          email: donorEmail,
        },
        theme: {
          color: '#667eea'
        },
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post('http://localhost:5000/user/verifypayment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Thank you for your donation.');
              if (onPaymentSuccess) {
                onPaymentSuccess(verifyResponse.data);
              }
              // Reset form
              setAmount('');
              setDonorName('');
              setDonorEmail('');
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed');
          }
        },
        modal: {
          ondismiss: function() {
            toast.info('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card elevation={3} sx={{ maxWidth: 400, margin: 'auto' }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Payment sx={{ mr: 1, color: 'primary.main' }} />
          <Typography variant="h6" component="h2">
            Make a Donation
          </Typography>
        </Box>

        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Your Name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            margin="normal"
            required
          />
          
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Donation Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            required
            inputProps={{ min: 1, step: 1 }}
          />

          <Box display="flex" alignItems="center" mt={1} mb={2}>
            <Security sx={{ mr: 1, fontSize: 16, color: 'success.main' }} />
            <Typography variant="caption" color="textSecondary">
              Secure payment powered by Razorpay
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={handlePayment}
            disabled={loading}
            sx={{ mt: 2, py: 1.5 }}
            startIcon={loading ? <CircularProgress size={20} /> : <Payment />}
          >
            {loading ? 'Processing...' : `Donate ₹${amount || '0'}`}
          </Button>
        </Box>

        <Typography variant="caption" display="block" textAlign="center" mt={2} color="textSecondary">
          Your donation helps us provide emergency relief and disaster preparedness
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RazorpayPayment;
