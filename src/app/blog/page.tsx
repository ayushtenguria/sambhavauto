
import { createClient } from '../../lib/supabase/server';
import { BlogPostCard } from '../../components/blog-post-card';
import { cookies } from 'next/headers';

export default async function BlogPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*, profiles(name, avatar_url)')
    .is('published_at', 'not.null')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error.message);
    // You might want to show an error message to the user
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-headline">From the AutoFix Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Your source for the latest automotive news, tips, and tricks.
          </p>
        </div>

        {posts && posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No posts yet!</h2>
            <p className="mt-2 text-muted-foreground">
              Check back later for new articles. If you are the admin, you might need to check your Supabase Row Level Security policies.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
