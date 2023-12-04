import { useState } from "react";
import axios from "axios";
import { HuePicker } from "react-color";
import {Form, FormGroup, Label, Input, Button} from 'reactstrap'

function NewTag({addNewTag}) {
  const [theme, setTheme] = useState("#000");
  const [name, setName] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    if (name !== "") {
      const response = await axios.post(
        "http://localhost:3045/v1/api/admin/newtag",
        { name: name, theme: theme }
      );
      // console.log(response.data);
      addNewTag(response.data.data)
      setName("");
      setTheme("#000");
    }
  };
  const handleThemeChange = (color) => {
    setTheme(color.hex);
  };
  return (
    <Form className="mb-3">
      <FormGroup>
      <Label>Name</Label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      </FormGroup>
      <FormGroup>
      <HuePicker color={theme} onChangeComplete={handleThemeChange} />
      </FormGroup>
      <Button variant="primary" type="button" onClick={submit}>Sumit</Button>
    </Form>
  );
}

export default NewTag;
