'use client';

import { fetchUserAttributes } from 'aws-amplify/auth';
import { useEffect, useState } from 'react';

export default function Welcome() {
  const [username, setUsername] = useState<string>();
  useEffect(() => {
    fetchUserAttributes()
      .then((data) => {
        setUsername(data.name);
        console.log('userAttributes', data);
      })
      .catch((error) => console.log(error));
  }, []);
  return <p>Welcome {username} </p>;
}
