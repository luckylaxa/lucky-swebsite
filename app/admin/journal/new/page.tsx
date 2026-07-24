import PostEditor from '@/components/admin/PostEditor';

export default function NewPost() {
  return (
    <>
      <div className="admin-head">
        <div>
          <p className="eyebrow-sm">Journal</p>
          <h1>New post</h1>
          <p>Give it a title, write the body, then save as a draft or publish.</p>
        </div>
      </div>
      <PostEditor
        initial={{
          slug: '', title: '', excerpt: '', bodyHtml: '',
          cover_image_id: null, cover_url: null, status: 'draft',
          seo_title: '', seo_description: '', og_image_id: null, og_image_url: null,
        }}
      />
    </>
  );
}
