'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';



export function Card() {
  const [email, setEmail] = useState('');
  const [username, setUser] = useState('');
  const [password1, setPW1] = useState('');
  const [password2, setPW2] = useState('');

  const [passMatch, setPassMatch] = useState(true);
  const [buttonWorks, setButton] = useState(false);
  const [bigerror, setError] = useState<string | null>(null);

  useEffect(() => {
    setPassMatch(password1 === password2);
    setButton(
      password1 === password2 &&
        password1 != '' &&
        username != '' &&
        email != ''
    );
   
  }, [password1, password2]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          email: email,
          password: password1,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {

      } else {
        const jason = await res.json();
        const message = jason.message;
        setError(message);
      }
    } catch (error: any) {
      setError(error?.message);
    }
    console.log('Register.');
  };
  return (
    <form className="space-y-8 w-full sm:w-80 " onSubmit={onSubmit}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          type="username"
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password1"
          type="password"
          onChange={(e) => setPW1(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="password">Confirm Password</Label>
        <Input
          id="password2"
          type="password"
          onChange={(e) => setPW2(e.target.value)}
        />
      </div>
      {passMatch ? null : (
        <div>
          <Label className="m-3 text-red-500">
            Your passwords do not match.{' '}
          </Label>
        </div>
      )}
      {bigerror != null ? (
        <div>
          <Label className="m-3 text-red-500 text-center">{bigerror}</Label>
        </div>
      ) : null}

      <div className="w-full">
        <Button
          variant="outline"
          className="w-full bg-black text-white"
          disabled={!buttonWorks}
        >
          Register
        </Button>
      </div>
    </form>
  );
};