import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenueFormState, menueSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const EditMenue = ({ selectedMenue, editOpen, setEditOpen }: { selectedMenue?: any, editOpen: boolean, setEditOpen: Dispatch<SetStateAction<boolean>> }) => {
  const { loading, editMenu } = useMenuStore();
  const [input, setInput] = useState<MenueFormState>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [errors, setErrors] = useState<Partial<MenueFormState>>({});
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, image: file });
      setPreviewImage(URL.createObjectURL(file)); // Create a preview URL for the image
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menueSchema.safeParse(input);
    if (!result.success) {
      const filedErrors = result.error.formErrors.fieldErrors;
      setErrors(filedErrors as Partial<MenueFormState>);
      return;
    }
    setErrors({});
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("price", input.price.toString());
      formData.append("description", input.description);
      if (input.image) {
        formData.append("image", input.image);
      }

      await editMenu(formData, selectedMenue?._id);
    } catch (error) {
      console.log(error);
    } finally {
      setEditOpen(false);
    }
  };

  useEffect(() => {
    if (selectedMenue) {
      setInput({
        name: selectedMenue.name || "",
        description: selectedMenue.description || "",
        price: selectedMenue.price || 0,
        image: undefined, 
      });
      setPreviewImage(selectedMenue.image || null); // Use existing image URL for preview
    }
  }, [selectedMenue]);

  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menue</DialogTitle>
          <DialogDescription>
            Update your menu to keep your offerings fresh and exciting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeHandler}
                placeholder="Enter menu name"
              />
              {errors && <span className="text-sm text-red-500">{errors.name}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeHandler}
                placeholder="Enter menu description"
              />
              {errors && <span className="text-sm text-red-500">{errors.description}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Price in Rupees</Label>
              <Input
                type="number"
                name="price"
                value={input.price}
                onChange={changeHandler}
                placeholder="Enter menu price"
              />
              {errors && <span className="text-sm text-red-500">{errors.price}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <Label>Upload menu image (optional)</Label>
              {previewImage && (
                <div className="mt-2 flex justify-center w-full">
                  <img src={previewImage} alt="Preview" className="w-full h-32 object-cover rounded" />
                </div>
              )}
              <Input type="file" name="image" onChange={handleImageChange} />
            </div>
          </div>
          <DialogFooter className="mt-5">
            {loading ? (
              <Button disabled className="bg-green-500 hover:bg-green-600 w-full">
                <Loader2 className="animate-spin" />
                Updating
              </Button>
            ) : (
              <Button className="bg-green-500 hover:bg-green-600 w-full">Submit</Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMenue;
