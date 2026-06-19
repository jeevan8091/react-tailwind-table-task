import fetch from 'node-fetch';

async function test() {
  const loginUrl = 'https://mm360.makingmindstechnologies.com/api/auth/admin_signin/';
  const payloads = [
    { email: 'admin@gmail.com', password: 'password' },
    { username: 'admin', password: 'password' },
    { username: 'admin@gmail.com', password: 'password' },
    { email: 'admin', password: 'password' },
    { email: 'admin@gmail.com', password: 'admin' },
    { username: 'admin', password: 'admin' }
  ];

  console.log('--- Testing Login API Payloads ---');
  for (const payload of payloads) {
    try {
      console.log('Sending payload:', JSON.stringify(payload));
      const res = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      console.log('Status:', res.status);
      const text = await res.text();
      console.log('Response:', text);
      console.log('----------------------------------');
    } catch (err) {
      console.error('Error:', err.message);
      console.log('----------------------------------');
    }
  }
}

test();
