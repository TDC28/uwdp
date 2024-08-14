'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const Card = () => {
  const searchParams = useSearchParams();
  const loginError = searchParams.get('error') ? 'bing bong' : '';
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [email, setEmail] = useState('');
  const [password, setPW] = useState('');
  const [buttonWorks, setButton] = useState(false);

  useEffect(() => {
    setButton(password != '' && email != '');
  }, [password, email]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
  };
  return (
    <form className="space-y-8 w-full sm:w-80 " onSubmit={onSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="content-start">
        <div className="flex mb-2">
          <Label htmlFor="password">Password</Label>
          <Label className="text-indigo-500 text-right flex-1 hover:underline">
            <Link href="/createResetPassword"> Forgot Password ?</Link>
          </Label>
        </div>
        <Input
          id="password"
          type="password"
          onChange={(e) => setPW(e.target.value)}
        />
      </div>
      {loginError != '' ? (
        <div>
          <Label className="m-3 text-red-500">
            {' '}
            Invalid login information{' '}
          </Label>
        </div>
      ) : null}
      <div className="w-full">
        <Button
          variant="outline"
          className="w-full bg-black text-white"
          disabled={!buttonWorks}
        >
          Login
        </Button>
      </div>
    </form>
  );
};