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
import api from "@/api/axios";
import ButtonWithLoading from "@/components/custom/ButtonWithLoading";
import FileUpload from "@/components/custom/FileUpload";
import { useNavigate } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";

interface RateRow {
  municipalities: string[];
  residential: number | "";
  commercial: number | "";
  public_building: number | "";
  streetlight: number | "";
}

// type Errors = {
//   month: string;
//   year: string;
//   rows: string;
// }

type Errors = Record<string, string>;

export function AddRates() {
  const [loading, setLoading] = useState<boolean>(false);
  const [month, setMonth] = useState(format(new Date(Date.now()), "LLLL"));
  const [year, setYear] = useState<number | "">(Number(format(new Date(Date.now()), "yyyy")));
  const [description, setDescription] = useState("");
  const [rows, setRows] = useState<RateRow[]>([]);

  const [files, setFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Errors>({
      month: "",
      year: "",
      rows: "",
  });

  console.log(rows);

  const usedMunicipalities = rows.flatMap(r => r.municipalities);

  const addRow = () => {
    setErrors(null);
    if (usedMunicipalities.length >= municipalities.length) return; // prevent extra rows
    setRows([...rows, { municipalities: [], residential: "", commercial: "", public_building: "", streetlight: "" }]);
  };

  const updateRow = (index: number, key: keyof RateRow, value: any) => {
    setErrors(null);
    const updated = [...rows];
    updated[index][key] = value;
    setRows(updated);
  };

  const toggleMunicipality = (index: number, mun: string) => {
    setErrors(null);
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

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("month", month);
    formData.append("year", year.toString());
    formData.append("description", description);

    formData.append("rows", JSON.stringify(rows));

    files.forEach((file) => {
      formData.append("files[]", file);
    });

    setLoading(true);
    setErrors(null);

    try {
      const res = await api.post('/api/monthly-rates', formData);
      console.log("Upload success:", res);
      toast({ title: res.data.message || "Uploaded successfully!" });

      setFiles([]);
      setRows([]);
      navigate(-1);
    } catch (error: any) {
      console.error("Upload failed", error);
      // setErrors(error.response.data.errors);
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      }
      toast({ title: error.response.data.message || "Upload Failed", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  // console.log(errors);


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
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="month">
                    Month
                  </Label>
                  <Select onValueChange={(value) => {
                    setErrors((prev) => {
                      return {
                        ...prev,
                        month: "",
                      }
                    });
                    setMonth(value);
                  }} value={month}>
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
                {errors?.month && <span className="text-destructive text-sm">{errors?.month}</span>}
              </div>
              <InputWithLabel
                label="Year"
                id="year"
                type="number"
                placeholder={format(new Date(Date.now()), "yyyy")}
                value={year}
                onChange={(e) => {
                  setErrors((prev) => {
                    return {
                      ...prev,
                      year: "",
                    }
                  });
                  setYear(Number(e.target.value));
                }}
                error={errors?.year}
                disabled={loading}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label>
                Description
              </Label>
              <Textarea onChange={(e) => setDescription(e.target.value)} value={description} />
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
                      {errors?.[`rows.${idx}.municipalities`] && (
                        <span className="text-destructive text-xs">
                          {errors[`rows.${idx}.municipalities`]}
                        </span>
                      )}
                    </div>

                    {/* Rates */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2">
                      <div className="flex flex-col gap-3">
                        <Label>Residential</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={row.residential}
                          onChange={(e) => updateRow(idx, "residential", e.target.value)}
                          placeholder="Residential"
                        />
                        {errors?.[`rows.${idx}.residential`] && (
                          <span className="text-destructive text-xs">
                            {errors[`rows.${idx}.residential`]}
                          </span>
                        )}
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
                        {errors?.[`rows.${idx}.commercial`] && (
                          <span className="text-destructive text-xs">
                            {errors[`rows.${idx}.commercial`]}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-3">
                        <Label>Public Bldg.</Label>
                        <Input
                          type="number"
                          step="0.0001"
                          value={row.public_building}
                          onChange={(e) => updateRow(idx, "public_building", e.target.value)}
                          placeholder="Public Bldg."
                        />
                        {errors?.[`rows.${idx}.public_building`] && (
                          <span className="text-destructive text-xs">
                            {errors[`rows.${idx}.public_building`]}
                          </span>
                        )}
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
                        {errors?.[`rows.${idx}.streetlight`] && (
                          <span className="text-destructive text-xs">
                            {errors[`rows.${idx}.streetlight`]}
                          </span>
                        )}
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

              <div className="flex flex-col gap-2">
                <Button
                  className="w-fit"
                  onClick={addRow}
                  disabled={usedMunicipalities.length >= municipalities.length}
                >
                  + Add Row
                </Button>
                {errors?.rows && <span className="text-destructive text-sm">{errors.rows}</span> }
              </div>

            </div>

            <FileUpload 
              files={files} 
              setFiles={setFiles}
              // accept="application/pdf"
              errors={errors}
              setErrors={setErrors}
            />
          </CardContent>
          <CardFooter className="w-full flex justify-end">
            <ButtonWithLoading 
              onClick={handleSubmit}
              loading={loading}
              disabled={loading}
            >
              Upload
            </ButtonWithLoading>
          </CardFooter>
        </Card>
      </div>
    </AdminPage>
  );
}
