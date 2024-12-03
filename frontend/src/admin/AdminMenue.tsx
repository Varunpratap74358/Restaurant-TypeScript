import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import EditMenue from "@/admin/EditMenue";
import { DialogTitle } from "@radix-ui/react-dialog";
import { MenueFormState, menueSchema } from "@/schema/menuSchema";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurant } from "@/store/useRestaurant";




const AdminMenue = () => {
  const { loading, createMenu } = useMenuStore()
  const { restaurant, getRestaurant } = useRestaurant()
  const [open, setOpen] = useState<boolean>(false);
  const [selectedMenue, setSelectedMenu] = useState<MenueFormState>();
  const [input, setInput] = useState<MenueFormState>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<MenueFormState>>({})


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };


  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = menueSchema.safeParse(input)
    if (!result.success) {
      const fildErrors = result.error.formErrors.fieldErrors;
      // console.log(fildErrors as Partial<MenueFormState>)
      setErrors(fildErrors as Partial<MenueFormState>)
      console.log(errors)
      return;
    }
    setErrors({})
    // console.log(input)
    //api start heare
    try {
      const formData = new FormData()
      formData.append('name', input.name)
      formData.append('description', input.description)
      formData.append('price', input.price.toString())
      if (input.image) {
        formData.append('image', input.image)
      }
      await createMenu(formData)
      setOpen(false)
    } catch (error) {
      console.log(error)
    }
  };

  ;
  const menus = restaurant?.menus

  useEffect(() => {
    const fetchMenu = async()=>{
     await getRestaurant()
    }
    fetchMenu()
  }, [loading])

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex justify-between">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menues
        </h1>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <div className="flex items-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white cursor-pointer">
              <Plus size={25} />
              Add Menue
            </div>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Menue</DialogTitle>
              <DialogDescription>
                Create a menu that will make you restaurant stand out.
              </DialogDescription>
            </DialogHeader>
            <form action="" onSubmit={submitHandler}>
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
                </div>
                {
                  errors && <span className="text-red-600 text-sm">{errors.name}</span>
                }
                <div className="flex flex-col gap-2">
                  <Label>Description</Label>
                  <Input
                    type="text"
                    name="description"
                    value={input.description}
                    onChange={changeHandler}
                    placeholder="Enter menu description"
                  />
                  {
                    errors && <span className="text-red-600 text-sm">{errors.description}</span>
                  }
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Price in Ruppees</Label>
                  <Input
                    type="number"
                    name="price"
                    value={input.price}
                    onChange={changeHandler}
                    placeholder="Enter menu price"
                  />
                  {
                    errors && <span className="text-red-600 text-sm">{errors.price}</span>
                  }
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Upload menue image</Label>
                  <Input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      setInput({
                        ...input,
                        image: e.target.files?.[0] || undefined,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button
                    disabled
                    className="bg-green-500 hover:bg-green-600 w-full"
                  >
                    <Loader2 className="animate-spin" />
                    Adding
                  </Button>
                ) : (
                  <Button className="bg-green-500 hover:bg-green-600 w-full">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* menus */}
      {menus && menus.map((v: any) => (
        <div key={v._id} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={v.image}
              alt="menuimg"
              className="md:h-24 md:w-24 h-16 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-medium text-gray-800">{v.name}</h1>
              <p className="text-sm text-gray-600 mt-1">{v.description}</p>
              <h2 className="text-md mt-2 font-semibold">
                Price: <span className="text-red-400">{v.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(v);
                setEditOpen(true);
              }}
              className="bg-yellow-600 hover:bg-yellow-700 mt-2"
              size={"sm"}
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                setSelectedMenu(v);
                setDeleteOpen(true);
              }}
              className="bg-red-600 hover:bg-red-700 mt-2"
              size={"sm"}
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
      <EditMenue
        selectedMenue={selectedMenue}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
      />
      <DeleteMenu
        deleteOpen={deleteOpen}
        selectedMenue={selectedMenue}
        setDeleteOpen={setDeleteOpen}
      />
    </div>
  );
};

export default AdminMenue;


export const DeleteMenu = ({ deleteOpen, selectedMenue, setDeleteOpen }: { deleteOpen: boolean, selectedMenue: any, setDeleteOpen: any }) => {

  const { loading, deleteMenu } = useMenuStore()
  const handelDelete = async (id: string) => {
    await deleteMenu(id)
    setDeleteOpen(false)
  }

  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-red-500">Delete Menu</DialogTitle>
          <DialogDescription>
            {selectedMenue?.description}
          </DialogDescription>
        </DialogHeader>
        <div>
          <h1 className="text-center font-bold text-xl">{selectedMenue?.name}</h1>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => handelDelete(selectedMenue?._id)} className="w-full bg-red-500 hover:bg-red-700">{loading ? "Deleting..." : `Delete ${selectedMenue?.name}`}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}