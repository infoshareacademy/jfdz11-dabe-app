import React, { useState, useEffect } from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export default function CategoriesSelect({ expense, setExpense }) {
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <FormControl variant="outlined">
      <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
        Category
      </InputLabel>
      <Select
        native
        value={expense.category}
        onChange={event =>
          setExpense({ ...expense, category: event.target.value })
        }
        input={
          <OutlinedInput
            name="Category"
            labelWidth={labelWidth}
            id="outlined-age-native-simple"
          />
        }
      >
        <option value="Unassigned" />
        <option value="Food">Food</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Car">Car</option>
        <option value="House">House</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="HealthAndBeauty">Health and beauty</option>
      </Select>
    </FormControl>
  );
}
