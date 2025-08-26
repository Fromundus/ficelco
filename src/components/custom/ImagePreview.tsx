import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Plus, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "../ui/button";
import File from "@/types/File";
import { useNavigate } from "react-router-dom";

type Props = {
    image: File;
    extraCount?: number;
    isLast?: boolean;
    isMaxHeight?: boolean;
}

const ImagePreview = ({ image, isLast, extraCount, isMaxHeight }: Props) => {
    const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {!isMaxHeight ? <div className="h-52 relative" onClick={() => isLast && extraCount > 0 && navigate(`${image.id}`)}>
          <img
            className="rounded-lg w-full h-full border object-cover cursor-pointer"
            loading="lazy"
            src={image?.url}
            alt=""
          />
            {isLast && extraCount > 0 && <div className="absolute cursor-pointer inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white text-2xl">
                    +{extraCount}
                </span>
            </div>}
        </div>
        :
        <div className="border p-4 rounded-lg">
          <img src={image?.url} className="w-full max-h-[80vh] object-contain object" alt="" />
        </div>
        }
      </DialogTrigger>

      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle><div className="max-w-md w-full"><p className="truncate">{image.filename}</p></div></DialogTitle>
        </DialogHeader>

        {/* Zoom wrapper */}
        <TransformWrapper initialScale={1}>
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              {/* Image */}
              <div className="border rounded-lg w-full flex justify-center items-center cursor-grab">
                <TransformComponent wrapperClass="w-full">
                    <img
                    src={image.url}
                    alt={image.filename}
                    className="h-[70vh] w-full object-contain"
                    />
                </TransformComponent>
              </div>

            {/* Controls */}
              <div className="flex gap-2 w-full justify-end">
                <Button
                  onClick={() => resetTransform()}
                  className=""
                  variant="outline"
                >
                  Reset Zoom
                </Button>
                <Button
                  onClick={() => zoomOut()}
                  className=""
                  variant="outline"
                >
                  <ZoomOut />
                </Button>
                <Button
                  onClick={() => zoomIn()}
                  className=""
                  variant="outline"
                >
                  <ZoomIn />
                </Button>
              </div>
            </>
          )}
        </TransformWrapper>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreview;

