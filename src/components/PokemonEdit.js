import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormProvider from "../components/form/FormProvider";
import FTextField from "../components/form/FTextField";
import { useForm, Controller } from "react-hook-form";
import { InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { editPokemon } from "../features/pokemons/pokemonSlice";
import { pokemonTypes } from "../pokemonTypes";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function PokemonEdit({ pokemon }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const defaultValues = {
    name: pokemon?.name || "",
    url: pokemon?.url || "",
    type1: pokemon?.types[0] || "",
    type2: pokemon?.types[1] || "",
  };

  const dispatch = useDispatch();
  const methods = useForm({ defaultValues });
  const { handleSubmit, control } = methods;

  const onSubmit = async (data) => {
    const { type1, type2, ...rest } = data;
    const types = [type1, type2].filter(Boolean);
    try {
      
      await dispatch(editPokemon({ ...rest, types, id: pokemon?.id}));
      handleClose();
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        fullWidth
        variant="contained"
        sx={{ marginBottom: "10px" }}
      >
        Edit Pokemon
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ textAlign: "center" }}>Edit Pokemon</Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField name="name" placeholder="Name" />
            <FTextField name="url" placeholder="URL" />

            <InputLabel id="type1-label">Type 1</InputLabel>
            <Controller
              name="type1"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="type1-label"
                  id="type1-select"
                  fullWidth
                >
                  <MenuItem value=""></MenuItem>
                  {pokemonTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <InputLabel id="type2-label" sx={{ marginTop: "10px" }}>
              Type 2
            </InputLabel>
            <Controller
              name="type2"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="type2-label"
                  id="type2-select"
                  fullWidth
                >
                  <MenuItem value=""></MenuItem>
                  {pokemonTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: "10px" }}
            >
              Submit
            </Button>
          </FormProvider>
        </Box>
      </Modal>
    </div>
  );
}
