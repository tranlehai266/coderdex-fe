import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import FormProvider from "../components/form/FormProvider";
import FTextField from "../components/form/FTextField";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { editPokemon } from "../features/pokemons/pokemonSlice";

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
    description : pokemon?.description
  };

  const dispatch = useDispatch();
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    dispatch(editPokemon({ ...data, id: pokemon.id }));
    handleClose();
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
          <Typography sx={{ textAlign: "center" }}>Edit Post</Typography>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <FTextField name="name" placeholder="Name" />
            <FTextField name="url" placeholder="URL" />
            <FTextField name="description" placeholder="description" />
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
