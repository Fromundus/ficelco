import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertTriangle, Info, Megaphone } from "lucide-react";
import GuestPage from "@/components/custom/GuestPage";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/api/post";
import { useEffect, useRef } from "react";
import PostCard from "@/components/custom/PostCard";
import { Skeleton } from "@/components/ui/skeleton";

const News = () => {

  const perPage = 10;

  const {
    data: postsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", { perPage }],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { current_page, last_page } = lastPage.pagination;
      return current_page < last_page ? current_page + 1 : undefined;
    },
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  const posts = postsData?.pages.flatMap((page) => page.data) ?? [];
  
  console.log(posts);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <GuestPage>
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">News & Advisories</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with the latest announcements, advisories, and important 
            updates from FICELCO.
          </p>
        </div>

        {/* Urgent Notices */}
        {/* <section className="mb-12">
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-destructive mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Urgent Notices
            </h2>
            <div className="space-y-4">
              {newsItems
                .filter(item => item.urgent)
                .map((item) => (
                  <div key={item.id} className="bg-card rounded-lg p-4 border border-destructive/20">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      {getTypeBadge(item.type, item.urgent)}
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{item.summary}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3 mr-1" />
                      {item.date}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section> */}

        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">Latest Updates</h2>
          <div className='grid grid-cols-1 gap-4'>
            {isLoading ? 
              <>
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </>
              : posts.length > 0 ?
              posts?.map((item) => {
                return (
                  <PostCard key={item.id} post={item} />
                )
              })
              :
              <span>No posts.</span>
            }

            {isFetchingNextPage &&
              <>
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
              </>
            }

          </div>
          <div ref={loadMoreRef} className="flex justify-center items-center py-4">
              {!hasNextPage && !isFetchingNextPage && !isLoading && posts.length > 10 && (
              <span className="text-muted-foreground">No more posts.</span>
              )}
          </div>
        </section>

        {/* Newsletter Signup */}
        {/* <section className="mt-16">
          <Card className="card-electric">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <p className="text-muted-foreground">
                Get the latest news and important announcements delivered to you
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Megaphone className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Text Alerts</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive urgent notifications via SMS
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Updates</h3>
                  <p className="text-sm text-muted-foreground">
                    Weekly digest of news and announcements
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Info className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Website</h3>
                  <p className="text-sm text-muted-foreground">
                    Check our website for the latest updates
                  </p>
                </div>
              </div>
              <Button className="mt-6" size="lg">
                Subscribe to Updates
              </Button>
            </CardContent>
          </Card>
        </section> */}
    </GuestPage>
  );
};

export default News;