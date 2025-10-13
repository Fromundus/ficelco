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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input'
import Modal from '@/components/custom/Modal'
import FileUpload from '@/components/custom/FileUpload'
import InputWithLabel from '@/components/custom/InputWithLabel'
import { Textarea } from '@/components/ui/textarea'
import ButtonWithLoading from '@/components/custom/ButtonWithLoading'

type Error = Record<string, string>;

type FormData = {
  title: string;
  description: string;
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
    description: "",
    type: "",
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("type", data.type);

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    try {
      const res = await api.post('/api/posts', formData);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AdminPageMain title='Posts' description='Configure and update posts.' topAction={
        <Modal open={addModal} setOpen={setAddModal} title='Create new post' buttonLabel={"Add Post"}>
          <div className='space-y-4 w-full'>
            <InputWithLabel
              id='title'
              name='title'
              label='Title'
              placeholder='Enter title'
            />
            <div className='space-y-3'>
              <Label>
                Caption
              </Label>
              <Textarea />
              {errors?.caption && <span className='text-destructive text-sm'>{errors?.caption}</span>}
            </div>

            <div className='space-y-3'>
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
              {errors?.type && <span className='text-destructive text-sm'>{errors?.type}</span>}
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
          <CardContent className="p-6">
            <div className="flex flex-col w-full lg:justify-between lg:flex-row gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>
    </AdminPageMain>
  )
}

export default Posts
