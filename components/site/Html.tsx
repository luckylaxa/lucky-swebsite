import type { ElementType } from 'react';

// Renders admin-authored copy that may contain inline <em>/<strong>. Content
// comes from the CMS (trusted authors), so limited inline HTML is intentional.
export default function Html({
  as: Tag = 'span',
  html,
  className,
  ...rest
}: {
  as?: ElementType;
  html: string;
  className?: string;
  [key: string]: unknown;
}) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
