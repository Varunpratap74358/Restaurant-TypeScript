import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";

export interface FilterOptionsState {
  id:string;
  label:string
}
const filterOptions : FilterOptionsState[] = [
  { id: "1", label: "Veg Pizza" },
  { id: "2", label: "Grilled Cheese Sandwich" },
  { id: "3", label: "French Fries" },
  { id: "4", label: "Veggie Burger" },
  { id: "5", label: "Paneer Wrap" },
  { id: "6", label: "Masala Dosa" },
  { id: "7", label: "Veg Tacos" },
  { id: "8", label: "Spring Rolls" },
  { id: "9", label: "Samosa" },
  { id: "10", label: "Veg Quesadilla" },
  { id: "11", label: "Onion Rings" },
  { id: "12", label: "Churros" },
  { id: "13", label: "Veggie Nuggets" },
  { id: "14", label: "Stuffed Paratha" },
  { id: "15", label: "Pav Bhaji" },
]

const FilterPage = () => {

  const applicationHandler=(value:string)=>{
    // alert(value)
  }
  return (
    <div className="md:w-72">
      <div className="flex items-center justify-between">
        <h1 className="font-medium text-lg">Filter by cuisines</h1>
        <Button variant={'link'}>Reset</Button>
      </div>
      <div className="">
        {
          filterOptions.map((option)=>{
            return(
              <div className="flex items-center space-x-2 my-5" key={option.id}>
                <Checkbox id={option.id} onClick={()=>applicationHandler(option.label)} />
                  <Label htmlFor={option.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed ">{option.label}</Label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default FilterPage
