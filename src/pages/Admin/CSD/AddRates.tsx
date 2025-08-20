import { ChangeEvent, useRef, useState } from "react";
import {
  Card, CardHeader, CardTitle, CardContent, CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover, PopoverTrigger, PopoverContent
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import AdminPage from "@/components/custom/AdminPage";
import InputWithLabel from "@/components/custom/InputWithLabel";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CircleX, Eye, FileUp, Trash, X } from "lucide-react";
import municipalities from "@/data/municipalities";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface RateRow {
  municipalities: string[];
  residential: number | "";
  commercial: number | "";
  publicBldg: number | "";
  streetlight: number | "";
}

export function AddRates() {
  const [loading, setLoading] = useState<boolean>(false);
  const [month, setMonth] = useState(format(new Date(Date.now()), "LLLL"));
  const [year, setYear] = useState<number | "">(Number(format(new Date(Date.now()), "yyyy")));
  const [rows, setRows] = useState<RateRow[]>([]);

  // multiple files upload
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  console.log(rows);

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     const selectedFiles = Array.from(e.target.files);
  //     setFiles((prev) => [...prev, ...selectedFiles]); // append files
  //   }
  // };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);

      // validate: keep only image files
      const validImages = selectedFiles.filter(file =>
        file.type.startsWith("image/")
      );

      if (validImages.length !== selectedFiles.length) {
        toast({
          title: "Only images are allowed!",
        });
      }

      setFiles((prev) => [...prev, ...validImages]);
    }
  };


  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);

    // reset input if no files remain
    if (updated.length === 0 && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const usedMunicipalities = rows.flatMap(r => r.municipalities);

  const addRow = () => {
    if (usedMunicipalities.length >= municipalities.length) return; // prevent extra rows
    setRows([...rows, { municipalities: [], residential: "", commercial: "", publicBldg: "", streetlight: "" }]);
  };

  const updateRow = (index: number, key: keyof RateRow, value: any) => {
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  const toggleMunicipality = (index: number, mun: string) => {
    const updated = [...rows];
    const already = updated[index].municipalities.includes(mun);

    if (already) {
      updated[index].municipalities = updated[index].municipalities.filter(m => m !== mun);
    } else {
      updated[index].municipalities = [...updated[index].municipalities, mun];
    }

    const allSelected = updated.flatMap(r => r.municipalities);

    const cleaned = updated.filter(row => {
      const available = municipalities.filter(m => !allSelected.includes(m) || row.municipalities.includes(m));
      return available.length > 0 || row.municipalities.length > 0;
    });

    setRows(cleaned);
  };

  const removeRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <AdminPage withBackButton={true} title={"Add Monthly Power Rates"} description={"Upload consumer monthly rates."}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* Month & Year */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="month">
                  Month
                </Label>
                <Select onValueChange={(value) => setMonth(value)} value={month}>
                  <SelectTrigger id="month" className="w-full" disabled={loading}>
                    <SelectValue placeholder="Select Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="grid grid-cols-2">
                      {[
                        "January","February","March","April","May","June",
                        "July","August","September","October","November","December"
                      ].map(item => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
              <InputWithLabel
                label="Year"
                id="year"
                type="number"
                placeholder={format(new Date(Date.now()), "yyyy")}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
              />
            </div>

            {/* Dynamic Rows */}
            <div className="space-y-6">
              {rows.map((row, idx) => {
                const rowAvailable = municipalities.filter(
                  m => !usedMunicipalities.includes(m) || row.municipalities.includes(m)
                );

                return (
                  <div key={idx} className="border p-4 rounded-lg flex flex-col gap-4">
                    {/* Multi-select Municipalities */}
                    <div className="flex flex-col gap-3">
                      <Label>Municipalities</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start">
                            <p className="truncate">{row.municipalities.length > 0
                              ? row.municipalities.join(", ")
                              : "Select..."}</p>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-52">
                          <div className="space-y-2">
                            {rowAvailable.map(m => (
                              <div key={m} className="flex items-center space-x-2">
                                <Checkbox
                                  id={`${idx}-${m}`}
                                  checked={row.municipalities.includes(m)}
                                  onCheckedChange={() => toggleMunicipality(idx, m)}
                                />
                                <label htmlFor={`${idx}-${m}`} className="text-sm">{m}</label>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Rates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      <div className="flex flex-col gap-3">
                        <Label>Residential</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={row.residential}
                          onChange={(e) => updateRow(idx, "residential", e.target.value)}
                          placeholder="Residential"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Commercial</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={row.commercial}
                          onChange={(e) => updateRow(idx, "commercial", e.target.value)}
                          placeholder="Commercial"
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Public Bldg.</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={row.publicBldg}
                          onChange={(e) => updateRow(idx, "publicBldg", e.target.value)}
                          placeholder="Public Bldg."
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Streetlight</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={row.streetlight}
                          onChange={(e) => updateRow(idx, "streetlight", e.target.value)}
                          placeholder="Streetlight"
                        />
                      </div>
                    </div>

                    {/* Remove button */}
                    <div className="w-full flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeRow(idx)}
                      >
                        <Trash /> Remove
                      </Button>
                    </div>
                  </div>
                );
              })}

              <Button
                onClick={addRow}
                disabled={usedMunicipalities.length >= municipalities.length}
              >
                + Add Row
              </Button>
            </div>

            {/* Upload Photos */}
            <div className="flex flex-col gap-3">
              <Label>
                Upload Photos
              </Label>
              <Label htmlFor="photos">
                <Card className="bg-background">
                  <CardContent className="p-6">
                    <div className="w-full flex flex-col gap-4 items-center">
                      <FileUp />
                      <span>Click to upload photos.</span>
                    </div>
                  </CardContent>
                </Card>
              </Label>
              <Input
                ref={fileInputRef}
                id="photos"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              {files.length > 0 && (
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {files.map((file, idx) => (
                      <div key={idx} className="relative">
                        <Dialog>
                          <DialogTrigger asChild>
                            <div className="flex flex-col gap-2 items-center border rounded-md">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${idx}`}
                                className="w-full h-40 object-cover rounded-md border"
                              />
                              {/* <p className="text-xs text-center truncate w-full px-4">{file.name}</p> */}
                            </div>
                          </DialogTrigger>
                          <DialogContent aria-describedby="">
                            <DialogTitle>

                            </DialogTitle>
                            <div className="flex justify-center w-full">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${idx}`}
                                className="rounded-md border"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                        <div className="bg-destructive w-fit rounded-full absolute top-2 right-2 p-0.5">
                          <X className="size-5 cursor-pointer" onClick={() => removeFile(idx)}/>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" onClick={clearAllFiles}>
                    <Trash /> Remove All
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="w-full flex justify-end">
            <Button>Upload</Button>
          </CardFooter>
        </Card>
      </div>
    </AdminPage>
  );
}
