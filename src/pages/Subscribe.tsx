import React from 'react';
import { usePiAuth } from '../contexts/PiAuthContext';

const SUBSCRIPTION_PLANS = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 5,
    features: [
      'Unlimited article access',
      'Premium content',
      'No ads',
      'Support independent journalism'
    ]
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 50,
    features: [
      'All Monthly features',
      '2 months free',
      'Early access to special content',
      'Exclusive newsletters'
    ]
  }
];

export default function Subscribe() {
  const { user } = usePiAuth();

  const handleSubscribe = async (planId: string) => {
    if (!user) {
      alert('Please connect your Pi wallet first');
      return;
    }

    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (!plan) return;

    const payment = {
      amount: plan.price,
      memo: `${plan.name} subscription to Pi News`,
      metadata: { planId }
    };

    const callbacks = {
      onReadyForServerApproval: (paymentId: string) => {
        console.log('Ready for server approval:', paymentId);
        // Send to your backend for approval
      },
      onReadyForServerCompletion: (paymentId: string, txid: string) => {
        console.log('Ready for server completion:', paymentId, txid);
        // Send to your backend for completion
      },
      onCancel: (paymentId: string) => {
        console.log('Payment cancelled:', paymentId);
      },
      onError: (error: Error, payment?: any) => {
        console.error('Payment error:', error, payment);
      }
    };

    try {
      await Pi.createPayment(payment, callbacks);
    } catch (err) {
      console.error('Error creating payment:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Subscribe to Pi News</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div key={plan.id} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">{plan.name}</h2>
            <p className="text-3xl font-bold text-purple-600 mb-6">
              {plan.price}π
            </p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.id)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
            >
              Subscribe Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}