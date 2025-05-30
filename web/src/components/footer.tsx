import { Logo } from '@/components/icons';
export default function Footer() {
  return (
    <footer className='container mx-auto max-w-7xl py-24 px-12'>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <span className='text-center'>
          <Logo />
        </span>
        <p className='mt-4 text-center'>AgentFarm, Osk</p>
      </div>
    </footer>
  );
}
