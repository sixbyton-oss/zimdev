import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/db/supabase';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('No session ID found in URL.');
      return;
    }

    const verify = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('verify_stripe_payment', {
          body: { sessionId },
        });
        if (error) {
          const msg = await error?.context?.text?.();
          throw new Error(msg || error.message);
        }
        if (data?.data?.verified) {
          setStatus('success');
          setMessage('Thank you for your donation! Your support helps keep Byton TV free for everyone.');
        } else {
          setStatus('error');
          setMessage(data?.data?.status === 'unpaid'
            ? 'Payment is still pending. Please wait a moment and refresh.'
            : 'Payment verification failed. Please contact support if you were charged.'
          );
        }
      } catch (err) {
        setStatus('error');
        setMessage(err instanceof Error ? err.message : 'Verification failed');
      }
    };

    verify();
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fade-in">
      {status === 'loading' && (
        <>
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-base text-muted-foreground">{message}</p>
        </>
      )}

      {status === 'success' && (
        <>
          <CheckCircle className="h-16 w-16 text-emerald-500 mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Donation Successful!</h1>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-6">{message}</p>
          <Link to="/">
            <Button className="bg-primary text-primary-foreground">
              Back to Home
            </Button>
          </Link>
        </>
      )}

      {status === 'error' && (
        <>
          <XCircle className="h-16 w-16 text-destructive mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Payment Issue</h1>
          <p className="text-sm text-muted-foreground text-center max-w-md mb-6">{message}</p>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default PaymentSuccess;
