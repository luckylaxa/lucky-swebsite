import { SignIn } from '@clerk/nextjs';

export const metadata = { title: 'Sign in — United Architects CMS' };

export default function SignInPage() {
  return (
    <div style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', background: '#F7F5F0', padding: 24 }}>
      <SignIn />
    </div>
  );
}
