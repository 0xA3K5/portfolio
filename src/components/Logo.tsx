import Link from 'next/link';
import { useState } from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps): JSX.Element {
  const [hover, setHover] = useState(false);

  return (
    <Link href='/' passHref className={className}>
      <a
        className=''
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <h2 className='font-alegreya font-bold duration-200 text-3xl md:text-4xl'>
          <span className='duration-200'>a</span>
          <span
            className={`${
              hover ? 'opacity-100' : '-ml-2 opacity-0'
            } duration-200`}
          >
            li
          </span>
          <span className={`${hover ? '' : '-ml-3 md:-ml-4'} duration-200`}>
            k
          </span>
          <span
            className={`${
              hover ? 'ml-0 opacity-100' : '-ml-8 opacity-0'
            } duration-200`}
          >
            emal
          </span>
        </h2>
      </a>
    </Link>
  );
}
