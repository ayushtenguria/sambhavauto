
import Image from 'next/image';
import Link from 'next/link';
import { Tables } from '../lib/supabase/types';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ArrowRight } from 'lucide-react';

type Profile = {
    name: string | null;
    avatar_url: string | null;
} | null;

type BlogPost = Tables<'blog_posts'> & {
  profiles: Profile | Profile[] | null
};

type BlogPostCardProps = {
  post: BlogPost;
};

export function BlogPostCard({ post }: BlogPostCardProps) {
  const profile = Array.isArray(post.profiles) ? post.profiles[0] : post.profiles;
  const authorName = profile?.name || 'Anonymous';
  const authorAvatar = profile?.avatar_url;

  return (
    <Link href={`/blog/${post.slug}`} className="group block overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="relative h-56 w-full">
        <Image
          src={post.featured_image_url || 'https://picsum.photos/seed/3/600/400'}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint="blog post"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src={authorAvatar || undefined} alt={authorName} />
            <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{authorName}</p>
            {post.published_at && (
              <p className="text-xs text-muted-foreground">
                {format(new Date(post.published_at), 'MMMM d, yyyy')}
              </p>
            )}
          </div>
        </div>
        <h3 className="font-headline text-xl font-bold mb-2 h-14 overflow-hidden">{post.title}</h3>
        <p className="text-muted-foreground text-sm h-20 overflow-hidden">
          {post.excerpt || 'No excerpt available.'}
        </p>
        <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium text-primary flex items-center gap-1">
              Read More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
        </div>
      </div>
    </Link>
  );
}
