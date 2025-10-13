import api from '@/api/axios'
import AdminPageMain from '@/components/custom/AdminPageMain'
import CustomTabs from '@/components/custom/CustomTabs'
import PdfPreview from '@/components/custom/PdfPreview'
import RateCard from '@/components/RateCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { PowerRate } from '@/types/PowerRate'
import { format } from 'date-fns'
import { Eye, MoreHorizontal, Plus, Search, X } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input'
import Modal from '@/components/custom/Modal'
import FileUpload from '@/components/custom/FileUpload'
import InputWithLabel from '@/components/custom/InputWithLabel'
import { Textarea } from '@/components/ui/textarea'
import ButtonWithLoading from '@/components/custom/ButtonWithLoading'
import { toast } from '@/hooks/use-toast'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import PostCard from '@/components/custom/PostCard'
import { fetchPosts } from '@/api/post'
import { Skeleton } from '@/components/ui/skeleton'

type Error = Record<string, string>;

type FormData = {
  title: string;
  caption: string;
  type: string;
}

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Error>();

  const [data, setData] = useState<FormData>({
    title: "",
    caption: "",
    type: "",
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const queryClient = useQueryClient();

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("caption", data.caption);
    formData.append("type", data.type);

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    setLoading(true);

    try {
      const res = await api.post('/api/posts', formData);
      console.log(res);
      setData({
        title: "",
        caption: "",
        type: "",
      });

      setFiles([]);

      setAddModal(false);
      toast({
        title: res.data.message,
      });

      queryClient.invalidateQueries({ queryKey: ['posts'] });

      setLoading(false);

    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);

      setLoading(false);
    }
  }

  return (
    <AdminPageMain title='Posts' description='Configure and update posts.' topAction={
        <Modal open={addModal} setOpen={setAddModal} title='Create new post' buttonLabel={
          <>
            <Plus /> Add Post
          </>
        }>
          <div className='space-y-4 w-full'>
            <InputWithLabel
              id='title'
              name='title'
              label='Title'
              placeholder='Enter title'
              onChange={handleChange}
              error={errors?.title}
              disabled={loading}
            />
            <div className='flex flex-col gap-3'>
              <Label>
                Caption
              </Label>
              <Textarea id='caption' name='caption' onChange={(e) => {
                setData((prev) => {
                  return {
                    ...prev,
                    caption: e.target.value,
                  }
                })
              }} value={data.caption}  />
              {errors?.caption && <span className='text-destructive text-xs'>{errors?.caption}</span>}
            </div>

            <div className='flex flex-col gap-3'>
              <Label>
                Type
              </Label>
              <Select onValueChange={(value) => {
                setErrors((prev) => {
                  return {
                    ...prev,
                    type: "",
                  }
                });
                setData((prev) => {
                  return {
                    ...prev,
                    type: value
                  }
                })
              }} value={data.type}>
                <SelectTrigger id="type" className="w-full" disabled={loading}>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='power-rate'>Power Rate</SelectItem>
                  <SelectItem value='advisory'>Advisory</SelectItem>
                  <SelectItem value='announcement'>Announcement</SelectItem>
                  <SelectItem value='job-post'>Job Post</SelectItem>
                </SelectContent>
              </Select>
              {errors?.type && <span className='text-destructive text-xs'>{errors?.type}</span>}
            </div>

            <FileUpload 
              files={files} 
              setFiles={setFiles}
              // accept="application/pdf"
              errors={errors}
              setErrors={setErrors}
            />

            <div className='w-full flex'>
              <ButtonWithLoading
                className='w-full flex'
                onClick={handleSubmit}
                loading={loading}
                disabled={loading}
              >
                Upload
              </ButtonWithLoading>
            </div>
          </div>
        </Modal>
    }>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col w-full lg:justify-between lg:flex-row gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {isLoading ? 
            <>
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-48 w-full" />
            </>
            : posts.length > 0 ?
            posts?.map((item) => {
              return (
                <PostCard post={item} />
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
    </AdminPageMain>
  )
}

export default Posts
