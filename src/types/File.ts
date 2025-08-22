type File = {
    id: number;
    filename: string;
    mime_type: string;
    size: number;
    fileable_id: number;
    fileable_type: string;
    url: string;
} | null;

export default File;