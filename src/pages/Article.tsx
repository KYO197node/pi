import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { usePiAuth } from '../contexts/PiAuthContext';

export default function Article() {
  const { id } = useParams();
  const { user } = usePiAuth();

  const handleDonate = async () => {
    if (!user) {
      alert('Please connect your Pi wallet first');
      return;
    }

    const payment = {
      amount: 1, // 1 Pi
      memo: "Donation for article",
      metadata: { articleId: id }
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
    <article className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
      <img 
        src="https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=1200&auto=format&fit=crop"
        alt="Article cover"
        className="w-full h-64 object-cover rounded-lg mb-8"
      />
      
      <h1 className="text-4xl font-bold mb-4">The Future of Pi Network</h1>
      
      <div className="flex items-center text-gray-600 mb-8">
        <span>By John Doe</span>
        <span className="mx-2">•</span>
        <span>March 14, 2024</span>
      </div>

      <div className="prose max-w-none mb-8">
        <p>Article content goes here...</p>
      </div>

      <div className="border-t pt-8">
        <button
          onClick={handleDonate}
          className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
        >
          <Heart className="h-5 w-5" />
          <span>Donate 1π</span>
        </button>
      </div>
    </article>
  );
}