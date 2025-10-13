import File from "./File";

export type Post = {
  id: number;
  title: string;
  caption: string;
  type: string;
  files: File[];
  created_at: string;
  updated_at: string;
} | null;