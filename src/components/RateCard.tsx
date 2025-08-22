import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Eye, MoreHorizontal, X } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import PdfPreview from './custom/PdfPreview';
import { format } from 'date-fns';
import Modal from './custom/Modal';
import ButtonWithLoading from './custom/ButtonWithLoading';
import { PowerRate } from '@/types/PowerRate';

type Props = {
  refetch?: () => void;
  item: PowerRate;
}

const RateCard = ({ item }: Props) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const files = item?.files;
    const isImageFirstItem = files[0]?.mime_type.startsWith("image/");
    
    const notImageFiles = files.filter(item => !item?.mime_type.startsWith("image/"));

    const rates = item?.rows;

    const handleDelete = () => {

    };

    return (
      <Card key={item?.id} className='md:max-w-lg w-full mx-auto'>
        <CardContent className='p-6'>
            <div className='space-y-4'>
              <div className='flex items-start justify-between'>
                <div className='flex flex-col'>
                  <span className='text-lg font-semibold'>Month of {item?.month}, {item?.year}</span>
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
                  
                  <Modal disabled={loading} title={`Delete Power Rates for ${item?.month}, ${item?.year}`} labelIsNotButton={true} buttonLabel={<X className='size-7 cursor-pointer hover:bg-secondary hover:text-foreground rounded-full p-1' />} buttonClassName="w-10 h-10 bg-destructive text-white hover:bg-destructive/50" open={deleteModal} setOpen={setDeleteModal}>
                    <p>Are you sure you want to delete?</p>
                    <div className="w-full grid grid-cols-2 gap-2">
                      <ButtonWithLoading className="w-full" loading={loading} disabled={loading} onClick={handleDelete}>
                        Yes
                      </ButtonWithLoading>
                      <Button variant="outline" onClick={() => setDeleteModal(false)}>
                        Cancel
                      </Button>
                    </div>
                  </Modal>
                </div>
              </div>
              <div>
                {isImageFirstItem &&
                  <img className='rounded-lg border' src={files[0]?.url} alt="" />
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
