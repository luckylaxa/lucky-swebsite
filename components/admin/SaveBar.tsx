'use client';

export type SaveState = 'idle' | 'saving' | 'saved' | 'error';

export default function SaveBar({
  state,
  error,
  children,
}: {
  state: SaveState;
  error?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="savebar">
      {children}
      <span className={`status${state === 'saved' ? ' ok' : ''}${state === 'error' ? ' err' : ''}`}>
        {state === 'saving' && 'Saving…'}
        {state === 'saved' && 'Saved ✓'}
        {state === 'error' && (error || 'Something went wrong')}
      </span>
    </div>
  );
}
