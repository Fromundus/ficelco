import React from 'react'
import { Card, CardContent } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, MoreHorizontal, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import PdfPreview from './custom/PdfPreview';
import { format } from 'date-fns';

const RateCard = ({ item }) => {
    const files = item?.files;
    const isImageFirstItem = files[0]?.mime_type.startsWith("image/");
    
    const notImageFiles = files.filter(item => !item?.mime_type.startsWith("image/"));

    const rates = item?.rows;

    return (
      <Card key={item?.id} className='md:max-w-lg w-full mx-auto'>
        <CardContent className='p-6'>
            <div className='space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-lg font-semibold'>Month of {item?.month}</span>
                  <span className='text-muted-foreground text-sm'>Posted: {format(new Date(item?.created_at), 'PPpp')}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreHorizontal className='size-7 cursor-pointer hover:bg-secondary hover:text-foreground rounded-full p-1' />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <X className='size-7 cursor-pointer hover:bg-secondary hover:text-foreground rounded-full p-1' />
                </div>
              </div>
              <div>
                {isImageFirstItem &&
                  <img src={files[0]?.url} alt="" />
                }
                {notImageFiles?.length > 0 && <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className='font-normal text-sm'>Show Attached Files</AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-2'>
                      {notImageFiles?.map((item) => {
                        return (
                          <PdfPreview key={item.id} file={item} />
                        )
                      })}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>}
              </div>
              <div>
                <Button variant='outline' className='w-full'>
                  <Link className='flex items-center gap-2' to={`${item.id}`}>
                      <Eye /> See More
                  </Link>
                </Button>
              </div>
            </div>
        </CardContent>
      </Card>
    )
}

export default RateCard
